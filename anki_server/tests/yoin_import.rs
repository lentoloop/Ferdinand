use std::sync::Arc;

use anki::notes::NoteId;
use anki_server::auth::{
    db::AuthDb, middleware::require_auth, session_store::SqliteSessionStore, SESSION_USER_KEY,
};
use anki_server::{api_router, state::ServerState};
use axum::{
    body::Body,
    http::{Request, StatusCode},
    middleware, Router,
};
use http_body_util::BodyExt;
use serde_json::{json, Value};
use tower::ServiceExt;
use tower_sessions::Session;

struct TestApp {
    _dir: tempfile::TempDir,
    state: ServerState,
    router: Router,
}

impl TestApp {
    fn new() -> Self {
        let dir = tempfile::tempdir().unwrap();
        let auth = AuthDb::open(dir.path().join("auth.db")).unwrap();
        let state = ServerState::new(auth, dir.path().join("users"));
        let router = api_router()
            .route_layer(middleware::from_fn(require_auth))
            .with_state(state.clone());
        Self {
            _dir: dir,
            state,
            router,
        }
    }

    async fn send(
        &self,
        user: Option<&str>,
        origin: Option<&str>,
        body: &str,
    ) -> (StatusCode, Value) {
        let session = Session::new(
            None,
            Arc::new(SqliteSessionStore::new(&self.state.auth)),
            None,
        );
        if let Some(user) = user {
            session.insert(SESSION_USER_KEY, user).await.unwrap();
        }
        let mut builder = Request::builder()
            .method("POST")
            .uri("/api/import/yoin")
            .header("host", "ferdinand.example")
            .header("content-type", "application/json");
        if let Some(origin) = origin {
            builder = builder.header("origin", origin);
        }
        let mut request = builder.body(Body::from(body.to_owned())).unwrap();
        request.extensions_mut().insert(session);
        let response = self.router.clone().oneshot(request).await.unwrap();
        let status = response.status();
        let bytes = response.into_body().collect().await.unwrap().to_bytes();
        (status, serde_json::from_slice(&bytes).unwrap())
    }

    async fn import(&self, user: &str, items: Vec<Value>, dry_run: bool) -> Value {
        let (status, body) = self
            .send(
                Some(user),
                Some("https://ferdinand.example"),
                &json!({"items": items, "dry_run": dry_run}).to_string(),
            )
            .await;
        assert_eq!(status, StatusCode::OK, "{body}");
        body
    }
}

fn item(id: char) -> Value {
    json!({
        "id": id.to_string().repeat(64), "origin": "yoin", "lang": "en",
        "chunk": "take off", "sentence": "The plane takes off.",
        "meaning_zh": "起飛", "meaning_target": "leave the ground",
        "example": "A new example.", "created_at": "2026-11-02T07:00:00Z", "status": "pending",
        "source": {"platform": "youtube", "source_id": "video", "source_title": "Title", "episode": "1", "start_sec": 3.5, "jump_url": "https://www.youtube.com/watch?v=video&t=3"}
    })
}

fn note_id(response: &Value) -> NoteId {
    NoteId(
        response["results"][0]["note_id"]
            .as_str()
            .unwrap()
            .parse()
            .unwrap(),
    )
}

#[tokio::test]
async fn session_required_and_accounts_are_isolated() {
    let app = TestApp::new();
    let (status, _) = app
        .send(
            None,
            Some("https://ferdinand.example"),
            &json!({"items": [item('a')]}).to_string(),
        )
        .await;
    assert_eq!(status, StatusCode::UNAUTHORIZED);
    let a = app.import("alice", vec![item('a')], false).await;
    let bob = app.state.app_state_for("bob").await.unwrap();
    assert!(bob
        .col
        .lock()
        .await
        .note_id_by_guid(&format!("yoin:{}", "a".repeat(64)))
        .unwrap()
        .is_none());
    let b = app.import("bob", vec![item('a')], false).await;
    assert_eq!(a["results"][0]["status"], "created");
    assert_eq!(b["results"][0]["status"], "created");
}

#[tokio::test]
async fn concurrent_resend_preserves_edits_and_cards() {
    let app = TestApp::new();
    let (a, b) = tokio::join!(
        app.import("alice", vec![item('a')], false),
        app.import("alice", vec![item('a')], false)
    );
    assert_eq!(a["results"][0]["note_id"], b["results"][0]["note_id"]);
    let statuses = [
        a["results"][0]["status"].as_str().unwrap(),
        b["results"][0]["status"].as_str().unwrap(),
    ];
    assert!(statuses.contains(&"created") && statuses.contains(&"duplicate"));
    let state = app.state.app_state_for("alice").await.unwrap();
    let nid = note_id(&a);
    let (note, cards) = {
        let mut col = state.col.lock().await;
        let mut note = col.storage.get_note(nid).unwrap().unwrap();
        note.set_field(0, "User edit").unwrap();
        col.update_note(&mut note).unwrap();
        let card = col.storage.all_cards_of_note(nid).unwrap().remove(0);
        col.set_due_date(&[card.id()], "17", None).unwrap();
        (
            col.storage.get_note(nid).unwrap().unwrap(),
            col.storage.all_cards_of_note(nid).unwrap(),
        )
    };
    let mut changed = item('a');
    changed["chunk"] = json!("new input");
    let resend = app.import("alice", vec![changed], false).await;
    assert_eq!(resend["results"][0]["status"], "duplicate");
    let col = state.col.lock().await;
    assert_eq!(col.storage.get_note(nid).unwrap().unwrap(), note);
    assert_eq!(col.storage.all_cards_of_note(nid).unwrap(), cards);
    assert_eq!(col.storage.get_all_note_ids().unwrap().len(), 1);
}

#[tokio::test]
async fn partial_failure_and_batch_limit() {
    let app = TestApp::new();
    let mut bad = item('b');
    bad["chunk"] = json!("x".repeat(501));
    let response = app
        .import(
            "alice",
            vec![item('a'), bad, json!({"id": 42}), item('c')],
            false,
        )
        .await;
    assert_eq!(response["results"][0]["status"], "created");
    assert_eq!(response["results"][1]["status"], "error");
    assert_eq!(response["results"][2]["status"], "error");
    assert_eq!(response["results"][3]["status"], "created");
    for items in [vec![item('a'); 101], vec![]] {
        let (status, _) = app
            .send(
                Some("alice"),
                Some("https://ferdinand.example"),
                &json!({"items": items}).to_string(),
            )
            .await;
        assert_eq!(status, StatusCode::BAD_REQUEST);
    }
    assert_eq!(
        app.state
            .app_state_for("alice")
            .await
            .unwrap()
            .col
            .lock()
            .await
            .storage
            .get_all_note_ids()
            .unwrap()
            .len(),
        2
    );
}

#[tokio::test]
async fn origin_and_json_rejected_without_writes() {
    let app = TestApp::new();
    for origin in [
        None,
        Some("null"),
        Some("https://evil.example"),
        Some("http://ferdinand.example"),
        Some("https://ferdinand.example.evil"),
        Some("https://ferdinand.example/path"),
        Some("https://user@ferdinand.example"),
    ] {
        let (status, _) = app
            .send(
                Some("alice"),
                origin,
                &json!({"items": [item('a')]}).to_string(),
            )
            .await;
        assert_eq!(status, StatusCode::FORBIDDEN, "{origin:?}");
    }
    for body in ["{", "[]", "{\"items\": [], \"full_text\": \"secret\"}"] {
        let (status, response) = app
            .send(Some("alice"), Some("https://ferdinand.example"), body)
            .await;
        assert_eq!(status, StatusCode::BAD_REQUEST);
        assert!(!response.to_string().contains("secret"));
    }
    let state = app.state.app_state_for("alice").await.unwrap();
    assert!(state
        .col
        .lock()
        .await
        .storage
        .get_all_note_ids()
        .unwrap()
        .is_empty());
}

#[tokio::test]
async fn missing_field_rejects_entire_batch() {
    let app = TestApp::new();
    let state = app.state.app_state_for("alice").await.unwrap();
    {
        let mut col = state.col.lock().await;
        let mut nt = (*col.get_notetype_by_name("Concept-Deep").unwrap().unwrap()).clone();
        nt.fields
            .iter_mut()
            .find(|f| f.name == "Source")
            .unwrap()
            .name = "Renamed".into();
        col.update_notetype(&mut nt, false).unwrap();
    }
    let (status, _) = app
        .send(
            Some("alice"),
            Some("https://ferdinand.example"),
            &json!({"items": [item('a')]}).to_string(),
        )
        .await;
    assert_eq!(status, StatusCode::BAD_REQUEST);
    assert!(state
        .col
        .lock()
        .await
        .storage
        .get_all_note_ids()
        .unwrap()
        .is_empty());
}

#[tokio::test]
async fn escapes_html_and_urls_and_resolves_fields_by_name() {
    let app = TestApp::new();
    let state = app.state.app_state_for("alice").await.unwrap();
    {
        let mut col = state.col.lock().await;
        let mut nt = (*col.get_notetype_by_name("Concept-Deep").unwrap().unwrap()).clone();
        nt.fields.swap(0, 1);
        col.update_notetype(&mut nt, false).unwrap();
    }
    let mut input = item('a');
    input["chunk"] = json!("<img src=x onerror='bad'> & \"quote\"");
    input["sentence"] = json!("<script>bad</script>");
    input["source"]["source_title"] = json!("<iframe>");
    input["source"]["jump_url"] = json!("https://www.youtube.com/watch?v=x&name=\"bad\"");
    let response = app.import("alice", vec![input], false).await;
    let mut col = state.col.lock().await;
    let note = col.storage.get_note(note_id(&response)).unwrap().unwrap();
    let nt = col.get_notetype(note.notetype_id).unwrap().unwrap();
    let field = |name| &note.fields()[nt.fields.iter().position(|f| f.name == name).unwrap()];
    assert!(field("Front").contains("&lt;img"));
    assert!(field("Front").contains("&#39;bad&#39;"));
    assert!(field("Front").contains("&amp; &quot;quote&quot;"));
    assert!(field("Source").contains("&amp;name=&quot;bad&quot;"));
    assert!(field("Source").contains("&lt;iframe&gt;"));
    assert!(field("Back").contains("起飛"));
    for name in ["Why", "Contrast", "Mnemonic", "Image", "ReverseEnabled"] {
        assert!(field(name).is_empty());
    }
    assert!(note.tags.contains(&"origin::yoin".into()));
    assert!(note.tags.contains(&"lang::en".into()));
    assert_eq!(col.storage.all_cards_of_note(note.id).unwrap().len(), 1);
}

#[tokio::test]
async fn rejects_unapproved_links_and_full_text() {
    let app = TestApp::new();
    for url in [
        "javascript:alert(1)",
        "http://youtube.com/watch",
        "https://youtube.com.evil/watch",
        "https://youtube.com@evil.example/",
        "https://evil.example/",
        "https://youtube.com:444/",
        "https://user@youtube.com/",
    ] {
        let mut input = item('a');
        input["source"]["jump_url"] = json!(url);
        let response = app.import("alice", vec![input], false).await;
        assert_eq!(response["results"][0]["status"], "error", "{url}");
    }
    let mut input = item('a');
    input["full_text"] = json!("not stored");
    assert_eq!(
        app.import("alice", vec![input], false).await["results"][0]["status"],
        "error"
    );
}

#[tokio::test]
async fn dry_run_writes_nothing_and_decks_are_created_by_language() {
    let app = TestApp::new();
    let mut ja = item('b');
    ja["lang"] = json!("ja");
    ja["reading"] = json!("よみ");
    let preview = app
        .import("alice", vec![item('a'), item('a'), ja.clone()], true)
        .await;
    assert_eq!(preview["results"][0]["status"], "would_create");
    assert_eq!(preview["results"][1]["status"], "would_duplicate");
    let state = app.state.app_state_for("alice").await.unwrap();
    {
        let col = state.col.lock().await;
        assert!(col.storage.get_all_note_ids().unwrap().is_empty());
        assert!(col.get_deck_id("Yoin::English").unwrap().is_none());
        assert!(col.get_deck_id("Yoin::日本語").unwrap().is_none());
    }
    let created = app.import("alice", vec![item('a'), ja], false).await;
    for (index, name) in ["Yoin::English", "Yoin::日本語"].into_iter().enumerate() {
        let col = state.col.lock().await;
        let nid = NoteId(
            created["results"][index]["note_id"]
                .as_str()
                .unwrap()
                .parse()
                .unwrap(),
        );
        let cards = col.storage.all_cards_of_note(nid).unwrap();
        assert_eq!(cards[0].deck_id(), col.get_deck_id(name).unwrap().unwrap());
    }
    let preview = app.import("alice", vec![item('a')], true).await;
    assert_eq!(preview["results"][0]["status"], "duplicate");
    assert_eq!(
        preview["results"][0]["note_id"],
        created["results"][0]["note_id"]
    );
    let nid = note_id(&created);
    state.col.lock().await.remove_notes(&[nid]).unwrap();
    assert_eq!(
        app.import("alice", vec![item('a')], false).await["results"][0]["status"],
        "created"
    );
}

#[tokio::test]
async fn accepts_100_items_and_deduplicates_within_batch() {
    let app = TestApp::new();
    let response = app.import("alice", vec![item('a'); 100], false).await;
    assert_eq!(response["results"][0]["status"], "created");
    let first = &response["results"][0]["note_id"];
    for result in response["results"].as_array().unwrap().iter().skip(1) {
        assert_eq!(result["status"], "duplicate");
        assert_eq!(&result["note_id"], first);
    }
}

#[tokio::test]
async fn preview_and_import_both_reject_filtered_destination() {
    use anki::decks::{Deck, DeckKind, NativeDeckName};
    let app = TestApp::new();
    let state = app.state.app_state_for("alice").await.unwrap();
    {
        let mut col = state.col.lock().await;
        let mut deck = Deck::new_normal();
        deck.name = NativeDeckName::from_human_name("Yoin::English");
        deck.kind = DeckKind::Filtered(Default::default());
        col.add_deck(&mut deck).unwrap();
    }
    for dry_run in [true, false] {
        let response = app.import("alice", vec![item('a')], dry_run).await;
        assert_eq!(response["results"][0]["status"], "error");
        assert_eq!(
            response["decks"],
            if dry_run {
                json!([{"name": "Yoin::English", "exists": true, "would_create": false}])
            } else {
                json!([{"name": "Yoin::English", "exists": true, "created": false}])
            }
        );
    }
    assert!(state
        .col
        .lock()
        .await
        .storage
        .get_all_note_ids()
        .unwrap()
        .is_empty());
}

#[tokio::test]
async fn rejects_bad_language_reading_source_and_field_lengths() {
    let app = TestApp::new();
    let mut invalid = Vec::new();
    for (field, value) in [
        ("id", json!("bad")),
        ("origin", json!("other")),
        ("lang", json!("zh")),
        ("sentence", json!("x".repeat(2001))),
        ("meaning_zh", json!("")),
        ("meaning_target", json!("x".repeat(2001))),
        ("example", json!("x".repeat(2001))),
        ("reading", json!("English cannot have reading")),
        ("created_at", json!("x".repeat(65))),
    ] {
        let mut input = item('a');
        input[field] = value;
        invalid.push(input);
    }
    let mut ja = item('a');
    ja["lang"] = json!("ja");
    invalid.push(ja);
    for (field, value) in [
        ("platform", json!("unknown")),
        ("source_id", json!("x".repeat(257))),
        ("source_title", json!("x".repeat(501))),
        ("episode", json!("x".repeat(257))),
        ("start_sec", json!(-1)),
        ("jump_url", json!("x".repeat(2049))),
    ] {
        let mut input = item('a');
        input["source"][field] = value;
        invalid.push(input);
    }
    let response = app.import("alice", invalid, false).await;
    for result in response["results"].as_array().unwrap() {
        assert_eq!(result["status"], "error");
    }
}

#[tokio::test]
async fn resend_after_collection_reopen_is_duplicate() {
    let app = TestApp::new();
    let first = app.import("alice", vec![item('a')], false).await;
    let TestApp {
        _dir,
        state,
        router,
    } = app;
    drop(router);
    drop(state);
    let auth = AuthDb::open(_dir.path().join("auth.db")).unwrap();
    let state = ServerState::new(auth, _dir.path().join("users"));
    let router = api_router()
        .route_layer(middleware::from_fn(require_auth))
        .with_state(state.clone());
    let app = TestApp {
        _dir,
        state,
        router,
    };
    let second = app.import("alice", vec![item('a')], false).await;
    assert_eq!(second["results"][0]["status"], "duplicate");
    assert_eq!(
        second["results"][0]["note_id"],
        first["results"][0]["note_id"]
    );
}

#[tokio::test]
async fn display_fields_are_optional_escaped_and_bounded() {
    let app = TestApp::new();
    for (id, value) in [('a', None), ('b', Some("")), ('c', Some("/<æ>&\"'/"))] {
        let mut input = item(id);
        if let Some(value) = value {
            input["phonetic"] = json!(value);
            input["pos"] = json!(value);
        }
        let response = app.import("alice", vec![input], false).await;
        let state = app.state.app_state_for("alice").await.unwrap();
        let mut col = state.col.lock().await;
        let note = col.storage.get_note(note_id(&response)).unwrap().unwrap();
        let nt = col.get_notetype(note.notetype_id).unwrap().unwrap();
        for name in ["Phonetic", "PartOfSpeech"] {
            let index = nt.fields.iter().position(|f| f.name == name).unwrap();
            assert_eq!(
                note.fields()[index],
                if id == 'c' {
                    "/&lt;æ&gt;&amp;&quot;&#39;/"
                } else {
                    ""
                }
            );
        }
    }
    for name in ["phonetic", "pos"] {
        for value in ["é".repeat(251), "\u{0000}".into(), " ".into()] {
            let mut input = item('d');
            input[name] = json!(value);
            assert_eq!(
                app.import("alice", vec![input], false).await["results"][0]["status"],
                "error"
            );
        }
    }
}

#[tokio::test]
async fn old_notetype_upgrade_preserves_fields_templates_and_scheduling() {
    let app = TestApp::new();
    let state = app.state.app_state_for("alice").await.unwrap();
    {
        let mut col = state.col.lock().await;
        let mut nt = (*col.get_notetype_by_name("Concept-Deep").unwrap().unwrap()).clone();
        nt.fields
            .retain(|f| !matches!(f.name.as_str(), "Phonetic" | "PartOfSpeech"));
        nt.config.css = "custom CSS".into();
        col.update_notetype(&mut nt, false).unwrap();
        let mut note = anki::notes::Note::new(&nt);
        note.set_field(0, "Existing front").unwrap();
        note.set_field(1, "Existing back").unwrap();
        col.add_note(&mut note, anki::decks::DeckId(1)).unwrap();
        let cards = col.storage.all_cards_of_note(note.id).unwrap();
        col.set_due_date(&[cards[0].id()], "17", None).unwrap();
        let cards = col.storage.all_cards_of_note(note.id).unwrap();
        let fields = note.fields().to_vec();
        let old_nt = (*col.get_notetype_by_name("Concept-Deep").unwrap().unwrap()).clone();
        for _ in 0..2 {
            anki_server::seed_notetypes::seed_if_missing(&mut col).unwrap();
        }
        let upgraded = col.get_notetype_by_name("Concept-Deep").unwrap().unwrap();
        assert_eq!(
            &upgraded.fields[..old_nt.fields.len()],
            old_nt.fields.as_slice()
        );
        assert_eq!(upgraded.fields.len(), old_nt.fields.len() + 2);
        assert_eq!(upgraded.templates, old_nt.templates);
        assert_eq!(upgraded.config, old_nt.config);
        let saved = col.storage.get_note(note.id).unwrap().unwrap();
        assert_eq!(&saved.fields()[..fields.len()], fields.as_slice());
        assert!(saved.fields()[fields.len()..].iter().all(String::is_empty));
        assert_eq!(col.storage.all_cards_of_note(note.id).unwrap(), cards);
    }
    assert_eq!(
        app.import("alice", vec![item('a')], false).await["results"][0]["status"],
        "created"
    );
}

#[tokio::test]
async fn recorded_contract_response() {
    let app = TestApp::new();
    let response = app
        .import("alice", vec![item('a'), item('a'), json!({})], true)
        .await;
    let expected: Value =
        serde_json::from_str(include_str!("fixtures/ferdinand-preview.json")).unwrap();
    assert_eq!(response, expected);
}

#[tokio::test]
async fn repeat_pointers_and_deck_snapshots() {
    let app = TestApp::new();
    let mut invalid = item('a');
    invalid["chunk"] = json!("");
    let mut ja = item('b');
    ja["lang"] = json!("ja");
    ja["reading"] = json!("よみ");
    for dry_run in [true, false] {
        let response = app
            .import(
                "demo",
                vec![invalid.clone(), item('a'), item('a'), ja.clone()],
                dry_run,
            )
            .await;
        assert_eq!(response["results"][2]["first_index"], 1);
        for index in [0, 1, 3] {
            assert!(response["results"][index].get("first_index").is_none());
        }
        for (index, name) in ["Yoin::English", "Yoin::日本語"].into_iter().enumerate() {
            let expected = if dry_run {
                json!({"name": name, "exists": false, "would_create": true})
            } else {
                json!({"name": name, "exists": false, "created": true})
            };
            assert_eq!(response["decks"][index], expected);
        }
    }
    for dry_run in [true, false] {
        let response = app
            .import("demo", vec![item('a'), item('a')], dry_run)
            .await;
        for result in response["results"].as_array().unwrap() {
            assert_eq!(result["status"], "duplicate");
            assert!(result.get("first_index").is_none());
        }
        assert_eq!(
            response["decks"],
            if dry_run {
                json!([{"name": "Yoin::English", "exists": true, "would_create": false}])
            } else {
                json!([{"name": "Yoin::English", "exists": true, "created": false}])
            }
        );
        let response = app.import("demo", vec![invalid.clone()], dry_run).await;
        assert_eq!(response["decks"], json!([]));
    }
    // A duplicate can target a missing deck without planning or creating it.
    let mut moved_target = item('a');
    moved_target["lang"] = json!("ja");
    moved_target["reading"] = json!("よみ");
    app.import("other-demo", vec![item('a')], false).await;
    for dry_run in [true, false] {
        let response = app
            .import("other-demo", vec![moved_target.clone()], dry_run)
            .await;
        assert_eq!(
            response["decks"],
            if dry_run {
                json!([{"name": "Yoin::日本語", "exists": false, "would_create": false}])
            } else {
                json!([{"name": "Yoin::日本語", "exists": false, "created": false}])
            }
        );
    }
}

#[tokio::test]
async fn created_deck_is_reported_when_all_notes_fail() {
    let app = TestApp::new();
    let state = app.state.app_state_for("demo").await.unwrap();
    state.col.lock().await.storage.db().execute_batch(
        "CREATE TEMP TRIGGER reject_import BEFORE INSERT ON notes BEGIN SELECT RAISE(FAIL, 'test failure'); END;",
    ).unwrap();
    let response = app.import("demo", vec![item('a'), item('a')], false).await;
    assert_eq!(
        response["decks"],
        json!([
            {"name": "Yoin::English", "exists": false, "created": true}
        ])
    );
    for result in response["results"].as_array().unwrap() {
        assert_eq!(result["error"], "unable to create note");
        assert!(result.get("first_index").is_none());
    }
    {
        let col = state.col.lock().await;
        assert!(col.get_deck_id("Yoin::English").unwrap().is_some());
        assert!(col.storage.get_all_note_ids().unwrap().is_empty());
        col.storage
            .db()
            .execute_batch("DROP TRIGGER reject_import")
            .unwrap();
    }
    state.col.lock().await.storage.db().execute_batch(
        "CREATE TEMP TRIGGER reject_first BEFORE INSERT ON notes WHEN NEW.flds LIKE 'reject%' BEGIN SELECT RAISE(FAIL, 'test failure'); END;",
    ).unwrap();
    let mut failed = item('a');
    failed["chunk"] = json!("reject");
    let response = app
        .import("demo", vec![failed, item('a'), item('a')], false)
        .await;
    assert_eq!(response["results"][0]["status"], "error");
    assert!(response["results"][0].get("first_index").is_none());
    assert_eq!(response["results"][1]["status"], "created");
    assert!(response["results"][1].get("first_index").is_none());
    assert_eq!(response["results"][2]["first_index"], 1);
    assert_eq!(response["decks"][0]["exists"], true);
    assert_eq!(response["decks"][0]["created"], false);
}
