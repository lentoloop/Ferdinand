//! Explicit, session-scoped Yoin batch import. No request content is logged.
use std::collections::HashMap;

use anki::decks::{Deck, DeckKind, NativeDeckName};
use anki::notes::Note;
use axum::extract::rejection::JsonRejection;
use axum::http::{HeaderMap, StatusCode};
use axum::Json;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use url::Url;

use crate::error::{ApiResult, ServerError};
use crate::seed_notetypes::{CONCEPT_DEEP_FIELDS, CONCEPT_DEEP_NAME};
use crate::state::AppState;

#[derive(Deserialize)]
#[serde(deny_unknown_fields)]
pub struct ImportRequest {
    pub items: Vec<Value>,
    #[serde(default)]
    pub dry_run: bool,
}

#[derive(Deserialize)]
#[serde(deny_unknown_fields)]
struct Item {
    id: String,
    origin: String,
    lang: String,
    chunk: String,
    sentence: String,
    reading: Option<String>,
    phonetic: Option<String>,
    pos: Option<String>,
    meaning_zh: String,
    meaning_target: String,
    example: String,
    source: Source,
    created_at: String,
    // Queue metadata is accepted for StagedChunk compatibility, never stored.
    status: Option<String>,
    exported_at: Option<String>,
    remote_id: Option<String>,
}

#[derive(Deserialize)]
#[serde(deny_unknown_fields)]
struct Source {
    platform: String,
    source_id: String,
    source_title: String,
    episode: Option<String>,
    start_sec: Option<f64>,
    jump_url: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct ItemResult {
    pub index: usize,
    pub status: &'static str,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub note_id: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub first_index: Option<usize>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub deck: Option<&'static str>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub error: Option<&'static str>,
}

#[derive(Debug, Serialize)]
pub struct DeckResult {
    pub name: &'static str,
    pub exists: bool,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub would_create: Option<bool>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub created: Option<bool>,
}

#[derive(Debug, Serialize)]
pub struct ImportResponse {
    pub dry_run: bool,
    pub results: Vec<ItemResult>,
    pub decks: Vec<DeckResult>,
}

fn forbidden() -> ServerError {
    let mut error = ServerError::bad_request("same-origin Origin header required");
    error.status = StatusCode::FORBIDDEN;
    error
}

fn validate_origin(headers: &HeaderMap) -> ApiResult<()> {
    // Do not trust Forwarded/X-Forwarded-* supplied by the caller. Production
    // uses HTTPS; plain HTTP is supported only on loopback development hosts.
    let origin = headers
        .get("origin")
        .and_then(|v| v.to_str().ok())
        .ok_or_else(forbidden)?;
    let host = headers
        .get("host")
        .and_then(|v| v.to_str().ok())
        .ok_or_else(forbidden)?;
    if headers.get_all("origin").iter().count() != 1 || headers.get_all("host").iter().count() != 1
    {
        return Err(forbidden());
    }
    let parsed = Url::parse(origin).map_err(|_| forbidden())?;
    let local = matches!(parsed.host_str(), Some("localhost" | "127.0.0.1" | "[::1]"));
    if parsed.origin().ascii_serialization() != origin
        || !(parsed.scheme() == "https" || (local && parsed.scheme() == "http"))
        || origin != format!("{}://{}", parsed.scheme(), host)
    {
        return Err(forbidden());
    }
    Ok(())
}

fn text_valid(value: &str, max: usize) -> bool {
    !value.trim().is_empty()
        && value.len() <= max
        && !value
            .chars()
            .any(|c| c.is_control() && c != '\n' && c != '\t')
}

fn approved_url(platform: &str, value: &str) -> bool {
    let Ok(url) = Url::parse(value) else {
        return false;
    };
    url.scheme() == "https"
        && url.username().is_empty()
        && url.password().is_none()
        && url.port_or_known_default() == Some(443)
        && match platform {
            "youtube" => matches!(
                url.host_str(),
                Some("youtube.com" | "www.youtube.com" | "m.youtube.com" | "youtu.be")
            ),
            "netflix" => matches!(url.host_str(), Some("netflix.com" | "www.netflix.com")),
            // Yoin does not provide jump links for these platforms.
            _ => false,
        }
}

impl Item {
    fn validate(&self) -> Result<(), &'static str> {
        if self.id.len() != 64
            || !self
                .id
                .bytes()
                .all(|b| b.is_ascii_digit() || (b'a'..=b'f').contains(&b))
        {
            return Err("id must be a lowercase SHA-256 hex string");
        }
        if self.origin != "yoin" || !matches!(self.lang.as_str(), "en" | "ja") {
            return Err("invalid origin or language");
        }
        if !text_valid(&self.chunk, 500)
            || [self.phonetic.as_deref(), self.pos.as_deref()]
                .into_iter()
                .flatten()
                .any(|s| !s.is_empty() && !text_valid(s, 500))
            || !text_valid(&self.sentence, 2000)
            || !text_valid(&self.meaning_zh, 2000)
            || !text_valid(&self.meaning_target, 2000)
            || !text_valid(&self.example, 2000)
            || !text_valid(&self.created_at, 64)
            || !text_valid(&self.source.source_id, 256)
            || !text_valid(&self.source.source_title, 500)
            || self.reading.as_ref().is_some_and(|s| !text_valid(s, 500))
            || (self.lang == "ja" && self.reading.is_none())
            || (self.lang == "en" && self.reading.is_some())
            || self
                .source
                .episode
                .as_ref()
                .is_some_and(|s| !text_valid(s, 256))
            || self
                .exported_at
                .as_ref()
                .is_some_and(|s| !text_valid(s, 64))
            || self.remote_id.as_ref().is_some_and(|s| !text_valid(s, 64))
            || self
                .status
                .as_ref()
                .is_some_and(|s| !matches!(s.as_str(), "pending" | "exported"))
        {
            return Err("missing, oversized, or invalid text field");
        }
        if !matches!(
            self.source.platform.as_str(),
            "youtube" | "netflix" | "hbomax" | "lrclib"
        ) || self
            .source
            .start_sec
            .is_some_and(|s| !s.is_finite() || s < 0.0)
            || self
                .source
                .jump_url
                .as_ref()
                .is_some_and(|s| s.len() > 2048 || !approved_url(&self.source.platform, s))
        {
            return Err("invalid source or unapproved HTTPS link");
        }
        Ok(())
    }

    fn deck(&self) -> &'static str {
        if self.lang == "ja" {
            "Yoin::日本語"
        } else {
            "Yoin::English"
        }
    }

    fn fields(&self) -> [String; 6] {
        let front = [&self.chunk, &self.sentence]
            .into_iter()
            .chain(self.reading.iter())
            .map(|s| escape(s))
            .collect::<Vec<_>>()
            .join("<br>");
        let back = format!(
            "{}<br><br>{}",
            escape(&self.meaning_zh),
            escape(&self.meaning_target)
        );
        let mut source = vec![
            escape(&self.source.platform),
            escape(&self.source.source_id),
            escape(&self.source.source_title),
        ];
        if let Some(episode) = &self.source.episode {
            source.push(escape(episode));
        }
        if let Some(start) = self.source.start_sec {
            source.push(format!("{start} s"));
        }
        source.push(escape(&self.created_at));
        if let Some(url) = &self.source.jump_url {
            source.push(format!(
                "<a href=\"{}\" rel=\"noreferrer noopener\">來源</a>",
                escape(url)
            ));
        }
        [
            front,
            back,
            escape(&self.example),
            source.join("<br>"),
            escape(self.phonetic.as_deref().unwrap_or_default()),
            escape(self.pos.as_deref().unwrap_or_default()),
        ]
    }
}

fn escape(value: &str) -> String {
    value
        .replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
        .replace('"', "&quot;")
        .replace('\'', "&#39;")
}

pub async fn import_yoin(
    state: AppState,
    headers: HeaderMap,
    body: Result<Json<ImportRequest>, JsonRejection>,
) -> ApiResult<Json<ImportResponse>> {
    validate_origin(&headers)?;
    // Never expose extractor errors that can contain input fragments.
    let Json(request) = body.map_err(|_| ServerError::bad_request("invalid JSON request"))?;
    if request.items.is_empty() || request.items.len() > 100 {
        return Err(ServerError::bad_request(
            "items must contain 1 to 100 entries",
        ));
    }
    let mut col = state.col.lock().await;
    let nt = col
        .get_notetype_by_name(CONCEPT_DEEP_NAME)?
        .ok_or_else(|| ServerError::bad_request("Concept-Deep notetype required"))?;
    for name in CONCEPT_DEEP_FIELDS {
        if !nt.fields.iter().any(|f| f.name == *name) {
            return Err(ServerError::bad_request(format!(
                "Concept-Deep missing field: {name}"
            )));
        }
    }
    let mut results = Vec::with_capacity(request.items.len());
    let mut first_guids = HashMap::new();
    let mut decks: Vec<DeckResult> = Vec::new();
    for (index, value) in request.items.into_iter().enumerate() {
        let mut result = ItemResult {
            index,
            status: "error",
            note_id: None,
            first_index: None,
            deck: None,
            error: None,
        };
        let item = serde_json::from_value::<Item>(value)
            .map_err(|_| "invalid item shape")
            .and_then(|item| {
                item.validate()?;
                Ok(item)
            });
        let item = match item {
            Ok(item) => item,
            Err(error) => {
                result.error = Some(error);
                results.push(result);
                continue;
            }
        };
        let deck_index = match decks.iter().position(|deck| deck.name == item.deck()) {
            Some(index) => index,
            None => {
                decks.push(DeckResult {
                    name: item.deck(),
                    exists: col.get_deck_id(item.deck())?.is_some(),
                    would_create: request.dry_run.then_some(false),
                    created: (!request.dry_run).then_some(false),
                });
                decks.len() - 1
            }
        };
        let guid = format!("yoin:{}", item.id);
        result.deck = Some(item.deck());
        if let Some(id) = col.note_id_by_guid(&guid)? {
            result.status = "duplicate";
            result.first_index = first_guids.get(&guid).copied();
            result.note_id = Some(id.0.to_string());
        } else if col
            .get_deck_id(item.deck())?
            .map(|id| col.get_deck(id))
            .transpose()?
            .flatten()
            .is_some_and(|deck| matches!(deck.kind, DeckKind::Filtered(_)))
        {
            result.error = Some("cannot import into a filtered deck");
        } else if request.dry_run {
            if let Some(first_index) = first_guids.get(&guid) {
                result.status = "would_duplicate";
                result.first_index = Some(*first_index);
            } else {
                result.status = "would_create";
                first_guids.insert(guid, index);
                decks[deck_index].would_create = Some(!decks[deck_index].exists);
            }
        } else {
            let added = (|| -> ApiResult<String> {
                let did = if let Some(did) = col.get_deck_id(item.deck())? {
                    let deck = col
                        .get_deck(did)?
                        .ok_or_else(|| ServerError::bad_request("deck missing"))?;
                    if matches!(deck.kind, DeckKind::Filtered(_)) {
                        return Err(ServerError::bad_request("filtered deck"));
                    }
                    did
                } else {
                    let mut deck = Deck::new_normal();
                    deck.name = NativeDeckName::from_human_name(item.deck());
                    col.add_deck(&mut deck)?;
                    decks[deck_index].created = Some(true);
                    deck.id
                };
                let mut note = Note::new(&nt);
                note.guid = guid.clone();
                for (name, value) in [
                    "Front",
                    "Back",
                    "Example",
                    "Source",
                    "Phonetic",
                    "PartOfSpeech",
                ]
                .into_iter()
                .zip(item.fields())
                {
                    let index = nt
                        .fields
                        .iter()
                        .position(|f| f.name == name)
                        .expect("validated fields");
                    note.set_field(index, value)?;
                }
                note.tags = vec!["origin::yoin".into(), format!("lang::{}", item.lang)];
                col.add_note(&mut note, did)?;
                Ok(note.id.0.to_string())
            })();
            match added {
                Ok(id) => {
                    first_guids.insert(guid, index);
                    result.status = "created";
                    result.note_id = Some(id);
                }
                Err(_) => result.error = Some("unable to create note"),
            }
        }
        results.push(result);
    }
    Ok(Json(ImportResponse {
        dry_run: request.dry_run,
        results,
        decks,
    }))
}
