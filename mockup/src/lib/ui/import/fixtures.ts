import type { ImportItem, ImportResponse } from './model';
type Batch = { items: ImportItem[] } & Omit<ImportResponse,'dry_run'>;
export const importFixtures: {preview: Batch; allNew: Batch; errors: Batch} = {
  "preview": {
    "items": [
      {
        "id": "yn_0001",
        "origin": "yoin",
        "lang": "en",
        "chunk": "run out of",
        "sentence": "We're about to run out of coffee filters again.",
        "meaning_zh": "用完、耗盡",
        "meaning_target": "to use all of something",
        "example": "We're about to run out of coffee filters again.",
        "source": {
          "platform": "youtube",
          "source_id": "yo-4101",
          "source_title": "Small Kitchen, Big City",
          "start_sec": 252,
          "jump_url": "https://www.youtube.com/watch?v=yo-4101&t=252"
        },
        "created_at": "2026-11-02T01:11:00+08:00"
      },
      {
        "id": "yn_0002",
        "origin": "yoin",
        "lang": "en",
        "chunk": "call it a day",
        "sentence": "It's past midnight. Let's call it a day.",
        "meaning_zh": "今天就到這裡、收工",
        "meaning_target": "to stop working for now",
        "example": "It's past midnight. Let's call it a day.",
        "source": {
          "platform": "hbomax",
          "source_id": "hb-4102",
          "source_title": "The Last Lantern",
          "start_sec": 1865,
          "episode": "S1 E2",
          "jump_url": "https://play.max.com/video/watch/hb-4102?t=1865"
        },
        "created_at": "2026-11-01T02:12:00+08:00"
      },
      {
        "id": "yn_0003",
        "origin": "yoin",
        "lang": "ja",
        "chunk": "気がする",
        "sentence": "今日は、あの人に会える気がする。",
        "meaning_zh": "覺得；有……的感覺",
        "meaning_target": "はっきりとはわからないが、そうだと感じる",
        "example": "今日は、あの人に会える気がする。",
        "source": {
          "platform": "netflix",
          "source_id": "ne-4103",
          "source_title": "雨の待合室",
          "start_sec": 198,
          "episode": "第 1 集",
          "jump_url": "https://www.netflix.com/watch/ne-4103?t=198"
        },
        "created_at": "2026-11-02T03:13:00+08:00",
        "reading": "きがする"
      },
      {
        "id": "yn_0004",
        "origin": "yoin",
        "lang": "en",
        "chunk": "on the fence",
        "sentence": "I'm still on the fence about taking the job.",
        "meaning_zh": "猶豫不決、還沒決定",
        "meaning_target": "not yet decided",
        "example": "I'm still on the fence about taking the job.",
        "source": {
          "platform": "netflix",
          "source_id": "ne-4104",
          "source_title": "Harbor Lights",
          "start_sec": 767,
          "episode": "S1 E4",
          "jump_url": "https://www.netflix.com/watch/ne-4104?t=767"
        },
        "created_at": "2026-11-01T04:14:00+08:00"
      },
      {
        "id": "yn_0005",
        "origin": "yoin",
        "lang": "en",
        "chunk": "get the hang of",
        "sentence": "You'll get the hang of the knife work by Friday.",
        "meaning_zh": "慢慢上手、抓到訣竅",
        "meaning_target": "to learn how to do something",
        "example": "You'll get the hang of the knife work by Friday.",
        "source": {
          "platform": "youtube",
          "source_id": "yo-4105",
          "source_title": "Small Kitchen, Big City",
          "start_sec": 570,
          "jump_url": "https://www.youtube.com/watch?v=yo-4105&t=570"
        },
        "created_at": "2026-11-02T05:15:00+08:00"
      },
      {
        "id": "yn_0006",
        "origin": "yoin",
        "lang": "ja",
        "chunk": "腑に落ちる",
        "sentence": "彼の説明は、どうも腑に落ちない。",
        "meaning_zh": "終於想通、能接受",
        "meaning_target": "納得できる",
        "example": "彼の説明は、どうも腑に落ちない。",
        "source": {
          "platform": "netflix",
          "source_id": "ne-4106",
          "source_title": "雨の待合室",
          "start_sec": 1570,
          "episode": "第 3 集",
          "jump_url": "https://www.netflix.com/watch/ne-4106?t=1570"
        },
        "created_at": "2026-11-01T06:10:00+08:00",
        "reading": "ふにおちる"
      },
      {
        "id": "yn_0007",
        "origin": "yoin",
        "lang": "en",
        "chunk": "cut corners",
        "sentence": "We never cut corners on the lamp oil.",
        "meaning_zh": "偷工減料、走捷徑",
        "meaning_target": "to do something badly to save time",
        "example": "We never cut corners on the lamp oil.",
        "source": {
          "platform": "hbomax",
          "source_id": "hb-4107",
          "source_title": "The Last Lantern",
          "start_sec": 496,
          "episode": "S1 E3",
          "jump_url": "https://play.max.com/video/watch/hb-4107?t=496"
        },
        "created_at": "2026-11-02T07:11:00+08:00"
      },
      {
        "id": "yn_0008",
        "origin": "yoin",
        "lang": "en",
        "chunk": "call it a day",
        "sentence": "It's past midnight. Let's call it a day.",
        "meaning_zh": "今天就到這裡、收工",
        "meaning_target": "to stop working for now",
        "example": "It's past midnight. Let's call it a day.",
        "source": {
          "platform": "hbomax",
          "source_id": "hb-4108",
          "source_title": "The Last Lantern",
          "start_sec": 1865,
          "episode": "S1 E2",
          "jump_url": "https://play.max.com/video/watch/hb-4108?t=1865"
        },
        "created_at": "2026-11-01T08:12:00+08:00"
      },
      {
        "id": "yn_0009",
        "origin": "yoin",
        "lang": "en",
        "chunk": "under the weather",
        "sentence": "Mara is a bit under the weather, so I took her shift.",
        "meaning_zh": "身體不太舒服",
        "meaning_target": "slightly ill",
        "example": "Mara is a bit under the weather, so I took her shift.",
        "source": {
          "platform": "netflix",
          "source_id": "ne-4109",
          "source_title": "Harbor Lights",
          "start_sec": 1360,
          "episode": "S1 E5",
          "jump_url": "https://www.netflix.com/watch/ne-4109?t=1360"
        },
        "created_at": "2026-11-02T00:13:00+08:00"
      },
      {
        "id": "yn_0010",
        "origin": "yoin",
        "lang": "ja",
        "chunk": "様子を見る",
        "sentence": "熱が下がるまで、少し様子を見よう。",
        "meaning_zh": "先觀察看看",
        "meaning_target": "しばらく状況を見守る",
        "example": "熱が下がるまで、少し様子を見よう。",
        "source": {
          "platform": "youtube",
          "source_id": "yo-4110",
          "source_title": "京都の台所から",
          "start_sec": 455,
          "jump_url": "https://www.youtube.com/watch?v=yo-4110&t=455"
        },
        "created_at": "2026-11-01T01:14:00+08:00",
        "reading": "ようすをみる"
      },
      {
        "id": "yn_0011",
        "origin": "yoin",
        "lang": "en",
        "chunk": "a long shot",
        "sentence": "It's a long shot, but the ferry might still be running.",
        "meaning_zh": "機會渺茫的嘗試",
        "meaning_target": "something unlikely to succeed",
        "example": "It's a long shot, but the ferry might still be running.",
        "source": {
          "platform": "hbomax",
          "source_id": "hb-4111",
          "source_title": "The Last Lantern",
          "start_sec": 2698,
          "episode": "S1 E2",
          "jump_url": "https://play.max.com/video/watch/hb-4111?t=2698"
        },
        "created_at": "2026-11-02T02:15:00+08:00"
      },
      {
        "id": "yn_0012",
        "origin": "yoin",
        "lang": "en",
        "chunk": "play it by ear",
        "sentence": "No plan for Sunday. We'll play it by ear.",
        "meaning_zh": "見機行事、到時再說",
        "meaning_target": "to decide as things happen",
        "example": "No plan for Sunday. We'll play it by ear.",
        "source": {
          "platform": "youtube",
          "source_id": "yo-4112",
          "source_title": "Weekend in Lisbon",
          "start_sec": 141,
          "jump_url": "https://www.youtube.com/watch?v=yo-4112&t=141"
        },
        "created_at": "2026-11-01T03:10:00+08:00"
      },
      {
        "id": "yn_0013",
        "origin": "yoin",
        "lang": "ja",
        "chunk": "仕方がない",
        "sentence": "終電を逃したなら、仕方がない。",
        "meaning_zh": "沒辦法、只好這樣",
        "meaning_target": "どうすることもできない",
        "example": "終電を逃したなら、仕方がない。",
        "source": {
          "platform": "netflix",
          "source_id": "ne-4113",
          "source_title": "雨の待合室",
          "start_sec": 1124,
          "episode": "第 2 集",
          "jump_url": "https://www.netflix.com/watch/ne-4113?t=1124"
        },
        "created_at": "2026-11-02T04:11:00+08:00",
        "reading": "しかたがない"
      },
      {
        "id": "yn_0014",
        "origin": "yoin",
        "lang": "en",
        "chunk": "out of the blue",
        "sentence": "You called me out of the blue on a Tuesday night.",
        "meaning_zh": "突然、毫無預警",
        "meaning_target": "unexpectedly",
        "example": "You called me out of the blue on a Tuesday night.",
        "source": {
          "platform": "lrclib",
          "source_id": "lr-4114",
          "source_title": "Paper Moon Avenue",
          "start_sec": 48
        },
        "created_at": "2026-11-01T05:12:00+08:00"
      },
      {
        "id": "yn_0015",
        "origin": "yoin",
        "lang": "ja",
        "chunk": "目が離せない",
        "sentence": "この子猫からは目が離せない。",
        "meaning_zh": "讓人目不轉睛",
        "meaning_target": "注意をそらすことができない",
        "example": "この子猫からは目が離せない。",
        "source": {
          "platform": "youtube",
          "source_id": "yo-4115",
          "source_title": "東京さんぽ日記",
          "start_sec": 347,
          "jump_url": "https://www.youtube.com/watch?v=yo-4115&t=347"
        },
        "created_at": "2026-11-02T06:13:00+08:00",
        "reading": "めがはなせない"
      },
      {
        "id": "yn_0016",
        "origin": "yoin",
        "lang": "en",
        "chunk": "back to square one",
        "sentence": "The harbour permit fell through, so we are back to square one.",
        "meaning_zh": "從頭來過",
        "meaning_target": "back to the start",
        "example": "The harbour permit fell through, so we are back to square one.",
        "source": {
          "platform": "netflix",
          "source_id": "ne-4116",
          "source_title": "Harbor Lights",
          "start_sec": 2232,
          "episode": "S1 E6",
          "jump_url": "https://www.netflix.com/watch/ne-4116?t=2232"
        },
        "created_at": "2026-11-01T07:14:00+08:00"
      },
      {
        "id": "yn_0017",
        "origin": "yoin",
        "lang": "en",
        "chunk": "bite the bullet",
        "sentence": "I finally bit the bullet and called the landlord.",
        "meaning_zh": "",
        "meaning_target": "to accept something unpleasant",
        "example": "I finally bit the bullet and called the landlord.",
        "source": {
          "platform": "youtube",
          "source_id": "yo-4117",
          "source_title": "Night Shift Diaries",
          "start_sec": 662,
          "jump_url": "https://www.youtube.com/watch?v=yo-4117&t=662"
        },
        "created_at": "2026-11-02T08:15:00+08:00"
      },
      {
        "id": "yn_0018",
        "origin": "yoin",
        "lang": "en",
        "chunk": "take a rain check",
        "sentence": "Can I take a rain check on dinner? The storm's coming in.",
        "meaning_zh": "改天再約",
        "meaning_target": "to accept an offer for a later time",
        "example": "Can I take a rain check on dinner? The storm's coming in.",
        "source": {
          "platform": "hbomax",
          "source_id": "hb-4118",
          "source_title": "The Last Lantern",
          "start_sec": 933,
          "episode": "S1 E4",
          "jump_url": "https://play.max.com/video/watch/hb-4118?t=933"
        },
        "created_at": "2026-11-01T00:10:00+08:00"
      },
      {
        "id": "yn_0019",
        "origin": "yoin",
        "lang": "ja",
        "chunk": "案の定",
        "sentence": "案の定、バスは遅れて来た。",
        "meaning_zh": "果然、不出所料",
        "meaning_target": "思っていたとおり",
        "example": "案の定、バスは遅れて来た。",
        "source": {
          "platform": "netflix",
          "source_id": "ne-4119",
          "source_title": "雨の待合室",
          "start_sec": 1912,
          "episode": "第 3 集",
          "jump_url": "https://www.netflix.com/watch/ne-4119?t=1912"
        },
        "created_at": "2026-11-02T01:11:00+08:00",
        "reading": "あんのじょう"
      },
      {
        "id": "yn_0020",
        "origin": "yoin",
        "lang": "en",
        "chunk": "the last straw",
        "sentence": "Losing the boat keys was the last straw.",
        "meaning_zh": "壓垮駱駝的最後一根稻草",
        "meaning_target": "the final problem that makes you give up",
        "example": "Losing the boat keys was the last straw.",
        "source": {
          "platform": "netflix",
          "source_id": "ne-4120",
          "source_title": "Harbor Lights",
          "start_sec": 2409,
          "episode": "S1 E6",
          "jump_url": "https://www.netflix.com/watch/ne-4120?t=2409"
        },
        "created_at": "2026-11-01T02:12:00+08:00"
      },
      {
        "id": "yn_0021",
        "origin": "yoin",
        "lang": "ja",
        "chunk": "お言葉に甘えて",
        "sentence": "では、お言葉に甘えて。",
        "meaning_zh": "那我就不客氣了",
        "meaning_target": "相手の好意を受け入れて",
        "example": "では、お言葉に甘えて。",
        "source": {
          "platform": "youtube",
          "source_id": "yo-4121",
          "source_title": "京都の台所から",
          "start_sec": 903,
          "jump_url": "https://www.youtube.com/watch?v=yo-4121&t=903"
        },
        "created_at": "2026-11-02T03:13:00+08:00",
        "reading": "おことばにあまえて"
      },
      {
        "id": "yn_0022",
        "origin": "yoin",
        "lang": "en",
        "chunk": "by the skin of my teeth",
        "sentence": "I made the last train by the skin of my teeth.",
        "meaning_zh": "驚險地、差一點就沒",
        "meaning_target": "only just",
        "example": "I made the last train by the skin of my teeth.",
        "source": {
          "platform": "youtube",
          "source_id": "yo-4122",
          "source_title": "Night Shift Diaries",
          "start_sec": 414,
          "jump_url": "https://www.youtube.com/watch?v=yo-4122&t=414"
        },
        "created_at": "2026-11-01T04:14:00+08:00"
      },
      {
        "id": "yn_0023",
        "origin": "yoin",
        "lang": "ja",
        "chunk": "手が届く",
        "sentence": "あと少しで、手が届きそうな朝。",
        "meaning_zh": "搆得著；負擔得起",
        "meaning_target": "自分の力で得られる範囲にある",
        "example": "あと少しで、手が届きそうな朝。",
        "source": {
          "platform": "lrclib",
          "source_id": "lr-4123",
          "source_title": "夜明けのバス停",
          "start_sec": 72
        },
        "created_at": "2026-11-02T05:15:00+08:00",
        "reading": "てがとどく"
      },
      {
        "id": "yn_0024",
        "origin": "yoin",
        "lang": "en",
        "chunk": "hold your horses",
        "sentence": "Hold your horses. The lantern still needs a wick.",
        "meaning_zh": "等一下、別急",
        "meaning_target": "wait, be patient",
        "example": "Hold your horses. The lantern still needs a wick.",
        "source": {
          "platform": "hbomax",
          "source_id": "hb-4124",
          "source_title": "The Last Lantern",
          "start_sec": 207,
          "episode": "S1 E1",
          "jump_url": "https://play.max.com/video/watch/hb-4124?t=207"
        },
        "created_at": "2026-11-01T06:10:00+08:00"
      }
    ],
    "results": [
      {
        "index": 0,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 1,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 2,
        "status": "duplicate",
        "deck": "Yoin::日本語",
        "note_id": "1730412001"
      },
      {
        "index": 3,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 4,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 5,
        "status": "would_create",
        "deck": "Yoin::日本語"
      },
      {
        "index": 6,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 7,
        "status": "would_duplicate",
        "deck": "Yoin::English",
        "first_index": 1
      },
      {
        "index": 8,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 9,
        "status": "would_create",
        "deck": "Yoin::日本語"
      },
      {
        "index": 10,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 11,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 12,
        "status": "duplicate",
        "deck": "Yoin::日本語",
        "note_id": "1730412044"
      },
      {
        "index": 13,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 14,
        "status": "would_create",
        "deck": "Yoin::日本語"
      },
      {
        "index": 15,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 16,
        "status": "error",
        "deck": "Yoin::English",
        "error": "missing, oversized, or invalid text field",
        "error_code": "text_missing",
        "error_field": "meaning_zh"
      },
      {
        "index": 17,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 18,
        "status": "would_create",
        "deck": "Yoin::日本語"
      },
      {
        "index": 19,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 20,
        "status": "would_create",
        "deck": "Yoin::日本語"
      },
      {
        "index": 21,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 22,
        "status": "would_create",
        "deck": "Yoin::日本語"
      },
      {
        "index": 23,
        "status": "would_create",
        "deck": "Yoin::English"
      }
    ],
    "decks": [
      {
        "name": "Yoin::English",
        "exists": false,
        "would_create": true
      },
      {
        "name": "Yoin::日本語",
        "exists": true,
        "would_create": false
      }
    ]
  },
  "allNew": {
    "items": [
      {
        "id": "yn_0025",
        "origin": "yoin",
        "lang": "en",
        "chunk": "break the ice",
        "sentence": "He told the fish joke to break the ice.",
        "meaning_zh": "打破沉默、緩和氣氛",
        "meaning_target": "to make people feel relaxed",
        "example": "He told the fish joke to break the ice.",
        "source": {
          "platform": "netflix",
          "source_id": "ne-4125",
          "source_title": "Harbor Lights",
          "start_sec": 318,
          "episode": "S1 E1",
          "jump_url": "https://www.netflix.com/watch/ne-4125?t=318"
        },
        "created_at": "2026-11-02T07:11:00+08:00"
      },
      {
        "id": "yn_0026",
        "origin": "yoin",
        "lang": "ja",
        "chunk": "息が詰まる",
        "sentence": "この部屋は静かすぎて息が詰まる。",
        "meaning_zh": "喘不過氣、令人窒息",
        "meaning_target": "緊張して苦しく感じる",
        "example": "この部屋は静かすぎて息が詰まる。",
        "source": {
          "platform": "netflix",
          "source_id": "ne-4126",
          "source_title": "雨の待合室",
          "start_sec": 655,
          "episode": "第 4 集",
          "jump_url": "https://www.netflix.com/watch/ne-4126?t=655"
        },
        "created_at": "2026-11-01T08:12:00+08:00",
        "reading": "いきがつまる"
      },
      {
        "id": "yn_0027",
        "origin": "yoin",
        "lang": "en",
        "chunk": "sleep on it",
        "sentence": "Don't answer now. Sleep on it.",
        "meaning_zh": "想一晚再決定",
        "meaning_target": "to decide tomorrow",
        "example": "Don't answer now. Sleep on it.",
        "source": {
          "platform": "hbomax",
          "source_id": "hb-4127",
          "source_title": "The Last Lantern",
          "start_sec": 1544,
          "episode": "S1 E5",
          "jump_url": "https://play.max.com/video/watch/hb-4127?t=1544"
        },
        "created_at": "2026-11-02T00:13:00+08:00"
      },
      {
        "id": "yn_0028",
        "origin": "yoin",
        "lang": "en",
        "chunk": "wrap up",
        "sentence": "Let's wrap up before the tide turns.",
        "meaning_zh": "收尾、結束",
        "meaning_target": "to finish",
        "example": "Let's wrap up before the tide turns.",
        "source": {
          "platform": "netflix",
          "source_id": "ne-4128",
          "source_title": "Harbor Lights",
          "start_sec": 2871,
          "episode": "S1 E2",
          "jump_url": "https://www.netflix.com/watch/ne-4128?t=2871"
        },
        "created_at": "2026-11-01T01:14:00+08:00"
      },
      {
        "id": "yn_0029",
        "origin": "yoin",
        "lang": "ja",
        "chunk": "気をつけて",
        "sentence": "雨だから、気をつけて帰ってね。",
        "meaning_zh": "小心、路上保重",
        "meaning_target": "注意して",
        "example": "雨だから、気をつけて帰ってね。",
        "source": {
          "platform": "netflix",
          "source_id": "ne-4129",
          "source_title": "雨の待合室",
          "start_sec": 1402,
          "episode": "第 1 集",
          "jump_url": "https://www.netflix.com/watch/ne-4129?t=1402"
        },
        "created_at": "2026-11-02T02:15:00+08:00",
        "reading": "きをつけて"
      },
      {
        "id": "yn_0030",
        "origin": "yoin",
        "lang": "en",
        "chunk": "on the fence",
        "sentence": "I'm still on the fence about taking the job.",
        "meaning_zh": "猶豫不決、還沒決定",
        "meaning_target": "not yet decided",
        "example": "I'm still on the fence about taking the job.",
        "source": {
          "platform": "netflix",
          "source_id": "ne-4130",
          "source_title": "Harbor Lights",
          "start_sec": 767,
          "episode": "S1 E4",
          "jump_url": "https://www.netflix.com/watch/ne-4130?t=767"
        },
        "created_at": "2026-11-01T03:10:00+08:00"
      },
      {
        "id": "yn_0031",
        "origin": "yoin",
        "lang": "en",
        "chunk": "a long shot",
        "sentence": "It's a long shot, but the ferry might still be running.",
        "meaning_zh": "機會渺茫的嘗試",
        "meaning_target": "something unlikely to succeed",
        "example": "It's a long shot, but the ferry might still be running.",
        "source": {
          "platform": "hbomax",
          "source_id": "hb-4131",
          "source_title": "The Last Lantern",
          "start_sec": 2698,
          "episode": "S1 E2",
          "jump_url": "https://play.max.com/video/watch/hb-4131?t=2698"
        },
        "created_at": "2026-11-02T04:11:00+08:00"
      },
      {
        "id": "yn_0032",
        "origin": "yoin",
        "lang": "ja",
        "chunk": "案の定",
        "sentence": "案の定、バスは遅れて来た。",
        "meaning_zh": "果然、不出所料",
        "meaning_target": "思っていたとおり",
        "example": "案の定、バスは遅れて来た。",
        "source": {
          "platform": "netflix",
          "source_id": "ne-4132",
          "source_title": "雨の待合室",
          "start_sec": 1912,
          "episode": "第 3 集",
          "jump_url": "https://www.netflix.com/watch/ne-4132?t=1912"
        },
        "created_at": "2026-11-01T05:12:00+08:00",
        "reading": "あんのじょう"
      },
      {
        "id": "yn_0033",
        "origin": "yoin",
        "lang": "en",
        "chunk": "take a rain check",
        "sentence": "Can I take a rain check on dinner? The storm's coming in.",
        "meaning_zh": "改天再約",
        "meaning_target": "to accept an offer for a later time",
        "example": "Can I take a rain check on dinner? The storm's coming in.",
        "source": {
          "platform": "hbomax",
          "source_id": "hb-4133",
          "source_title": "The Last Lantern",
          "start_sec": 933,
          "episode": "S1 E4",
          "jump_url": "https://play.max.com/video/watch/hb-4133?t=933"
        },
        "created_at": "2026-11-02T06:13:00+08:00"
      },
      {
        "id": "yn_0034",
        "origin": "yoin",
        "lang": "en",
        "chunk": "play it by ear",
        "sentence": "No plan for Sunday. We'll play it by ear.",
        "meaning_zh": "見機行事、到時再說",
        "meaning_target": "to decide as things happen",
        "example": "No plan for Sunday. We'll play it by ear.",
        "source": {
          "platform": "youtube",
          "source_id": "yo-4134",
          "source_title": "Weekend in Lisbon",
          "start_sec": 141,
          "jump_url": "https://www.youtube.com/watch?v=yo-4134&t=141"
        },
        "created_at": "2026-11-01T07:14:00+08:00"
      },
      {
        "id": "yn_0035",
        "origin": "yoin",
        "lang": "ja",
        "chunk": "お言葉に甘えて",
        "sentence": "では、お言葉に甘えて。",
        "meaning_zh": "那我就不客氣了",
        "meaning_target": "相手の好意を受け入れて",
        "example": "では、お言葉に甘えて。",
        "source": {
          "platform": "youtube",
          "source_id": "yo-4135",
          "source_title": "京都の台所から",
          "start_sec": 903,
          "jump_url": "https://www.youtube.com/watch?v=yo-4135&t=903"
        },
        "created_at": "2026-11-02T08:15:00+08:00",
        "reading": "おことばにあまえて"
      },
      {
        "id": "yn_0036",
        "origin": "yoin",
        "lang": "en",
        "chunk": "back to square one",
        "sentence": "The harbour permit fell through, so we are back to square one.",
        "meaning_zh": "從頭來過",
        "meaning_target": "back to the start",
        "example": "The harbour permit fell through, so we are back to square one.",
        "source": {
          "platform": "netflix",
          "source_id": "ne-4136",
          "source_title": "Harbor Lights",
          "start_sec": 2232,
          "episode": "S1 E6",
          "jump_url": "https://www.netflix.com/watch/ne-4136?t=2232"
        },
        "created_at": "2026-11-01T00:10:00+08:00"
      }
    ],
    "results": [
      {
        "index": 0,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 1,
        "status": "would_create",
        "deck": "Yoin::日本語"
      },
      {
        "index": 2,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 3,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 4,
        "status": "would_create",
        "deck": "Yoin::日本語"
      },
      {
        "index": 5,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 6,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 7,
        "status": "would_create",
        "deck": "Yoin::日本語"
      },
      {
        "index": 8,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 9,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 10,
        "status": "would_create",
        "deck": "Yoin::日本語"
      },
      {
        "index": 11,
        "status": "would_create",
        "deck": "Yoin::English"
      }
    ],
    "decks": [
      {
        "name": "Yoin::English",
        "exists": true,
        "would_create": false
      },
      {
        "name": "Yoin::日本語",
        "exists": false,
        "would_create": true
      }
    ]
  },
  "errors": {
    "items": [
      {
        "id": "yn_0037",
        "origin": "yoin",
        "lang": "en",
        "chunk": "run out of",
        "sentence": "We're about to run out of coffee filters again.",
        "meaning_zh": "用完、耗盡",
        "meaning_target": "to use all of something",
        "example": "We're about to run out of coffee filters again.",
        "source": {
          "platform": "youtube",
          "source_id": "yo-4137",
          "source_title": "Small Kitchen, Big City",
          "start_sec": 252,
          "jump_url": "https://www.youtube.com/watch?v=yo-4137&t=252"
        },
        "created_at": "2026-11-02T01:11:00+08:00"
      },
      {
        "id": "yn_0038",
        "origin": "yoin",
        "lang": "ja",
        "chunk": "腑に落ちる",
        "sentence": "彼の説明は、どうも腑に落ちない。",
        "meaning_zh": "終於想通、能接受",
        "meaning_target": "納得できる",
        "example": "彼の説明は、どうも腑に落ちない。",
        "source": {
          "platform": "netflix",
          "source_id": "ne-4138",
          "source_title": "雨の待合室",
          "start_sec": 1570,
          "episode": "第 3 集",
          "jump_url": "https://www.netflix.com/watch/ne-4138?t=1570"
        },
        "created_at": "2026-11-01T02:12:00+08:00",
        "reading": "ふにおちる"
      },
      {
        "id": "yn_0039",
        "origin": "yoin",
        "lang": "en",
        "chunk": "get the hang of",
        "sentence": "You'll get the hang of the knife work by Friday.",
        "meaning_zh": "慢慢上手、抓到訣竅",
        "meaning_target": "to learn how to do something",
        "example": "You'll get the hang of the knife work by Friday.",
        "source": {
          "platform": "youtube",
          "source_id": "yo-4139",
          "source_title": "Small Kitchen, Big City",
          "start_sec": 570,
          "jump_url": "https://www.youtube.com/watch?v=yo-4139&t=570"
        },
        "created_at": "2026-11-02T03:13:00+08:00"
      },
      {
        "id": "yn_0040",
        "origin": "yoin",
        "lang": "en",
        "chunk": "cut corners",
        "sentence": "We never cut corners on the lamp oil.",
        "meaning_zh": "偷工減料、走捷徑",
        "meaning_target": "to do something badly to save time",
        "example": "We never cut corners on the lamp oil.",
        "source": {
          "platform": "hbomax",
          "source_id": "hb-4140",
          "source_title": "The Last Lantern",
          "start_sec": 496,
          "episode": "S1 E3",
          "jump_url": "https://play.max.com/video/watch/hb-4140?t=496"
        },
        "created_at": "yesterday"
      },
      {
        "id": "yn_0041",
        "origin": "yoin",
        "lang": "ja",
        "chunk": "様子を見る",
        "sentence": "熱が下がるまで、少し様子を見よう。",
        "meaning_zh": "先觀察看看",
        "meaning_target": "しばらく状況を見守る",
        "example": "熱が下がるまで、少し様子を見よう。",
        "source": {
          "platform": "youtube",
          "source_id": "yo-4141",
          "source_title": "京都の台所から",
          "start_sec": 455,
          "jump_url": "https://www.youtube.com/watch?v=yo-4141&t=455"
        },
        "created_at": "2026-11-02T05:15:00+08:00",
        "reading": "ようすをみる"
      },
      {
        "id": "yn_0042",
        "origin": "yoin",
        "lang": "en",
        "chunk": "under the weather",
        "sentence": "Mara is a bit under the weather, so I took her shift.",
        "meaning_zh": "身體不太舒服",
        "meaning_target": "slightly ill",
        "example": "Mara is a bit under the weather, so I took her shift.",
        "source": {
          "platform": "netflix",
          "source_id": "ne-4142",
          "source_title": "Harbor Lights",
          "start_sec": 1360,
          "episode": "S1 E5",
          "jump_url": "https://www.netflix.com/watch/ne-4142?t=1360"
        },
        "created_at": "2026-11-01T06:10:00+08:00"
      },
      {
        "id": "yn_0043",
        "origin": "yoin",
        "lang": "ja",
        "chunk": "目が離せない",
        "sentence": "この子猫からは目が離せない。",
        "meaning_zh": "讓人目不轉睛",
        "meaning_target": "注意をそらすことができない",
        "example": "この子猫からは目が離せない。",
        "source": {
          "platform": "youtube",
          "source_id": "yo-4143",
          "source_title": "東京さんぽ日記",
          "start_sec": 347,
          "jump_url": "https://www.youtube.com/watch?v=yo-4143&t=347"
        },
        "created_at": "2026-11-02T07:11:00+08:00",
        "reading": "めがはなせない"
      },
      {
        "id": "yn_0044",
        "origin": "yoin",
        "lang": "en",
        "chunk": "a long shot",
        "sentence": "It's a long shot, but the ferry might still be running.",
        "meaning_zh": "機會渺茫的嘗試",
        "meaning_target": "something unlikely to succeed",
        "example": "It's a long shot, but the ferry might still be running.",
        "source": {
          "platform": "hbomax",
          "source_id": "hb-4144",
          "source_title": "The Last Lantern",
          "start_sec": 2698,
          "episode": "S1 E2",
          "jump_url": "https://play.max.com/video/watch/hb-4144?t=2698"
        },
        "created_at": "2026-11-01T08:12:00+08:00"
      },
      {
        "id": "yn_0045",
        "origin": "yoin",
        "lang": "en",
        "chunk": "out of the blue",
        "sentence": "You called me out of the blue on a Tuesday night.",
        "meaning_zh": "突然、毫無預警",
        "meaning_target": "unexpectedly",
        "example": "You called me out of the blue on a Tuesday night.",
        "source": {
          "platform": "lrclib",
          "source_id": "lr-7",
          "source_title": "Paper Moon Avenue",
          "jump_url": "http://lrclib.example/7"
        },
        "created_at": "2026-11-02T00:13:00+08:00"
      },
      {
        "id": "yn_0046",
        "origin": "yoin",
        "lang": "en",
        "chunk": "back to square one",
        "sentence": "The harbour permit fell through, so we are back to square one.",
        "meaning_zh": "從頭來過",
        "meaning_target": "back to the start",
        "example": "The harbour permit fell through, so we are back to square one.",
        "source": {
          "platform": "netflix",
          "source_id": "ne-4146",
          "source_title": "Harbor Lights",
          "start_sec": 2232,
          "episode": "S1 E6",
          "jump_url": "https://www.netflix.com/watch/ne-4146?t=2232"
        },
        "created_at": "2026-11-01T01:14:00+08:00"
      },
      {
        "id": "yn_0047",
        "origin": "yoin",
        "lang": "ja",
        "chunk": "手が届く",
        "sentence": "あと少しで、手が届きそうな朝。",
        "meaning_zh": "搆得著；負擔得起",
        "meaning_target": "自分の力で得られる範囲にある",
        "example": "あと少しで、手が届きそうな朝。",
        "source": {
          "platform": "lrclib",
          "source_id": "lr-4147",
          "source_title": "夜明けのバス停",
          "start_sec": 72
        },
        "created_at": "2026-11-02T02:15:00+08:00",
        "reading": "てがとどく"
      },
      {
        "id": "yn_0048",
        "origin": "yoin",
        "lang": "en",
        "chunk": "the last straw",
        "sentence": "Losing the boat keys was the last straw.",
        "meaning_zh": "壓垮駱駝的最後一根稻草",
        "meaning_target": "the final problem that makes you give up",
        "example": "Losing the boat keys was the last straw.",
        "source": {
          "platform": "netflix",
          "source_id": "ne-4148",
          "source_title": "Harbor Lights",
          "start_sec": 2409,
          "episode": "S1 E6",
          "jump_url": "https://www.netflix.com/watch/ne-4148?t=2409"
        },
        "created_at": "2026-11-01T03:10:00+08:00"
      },
      {
        "id": "yn_0049",
        "origin": "yoin",
        "lang": "en",
        "chunk": "bite the bullet",
        "sentence": "I finally bit the bullet and called the landlord.",
        "meaning_zh": "",
        "meaning_target": "to accept something unpleasant",
        "example": "I finally bit the bullet and called the landlord.",
        "source": {
          "platform": "youtube",
          "source_id": "yo-4149",
          "source_title": "Night Shift Diaries",
          "start_sec": 662,
          "jump_url": "https://www.youtube.com/watch?v=yo-4149&t=662"
        },
        "created_at": "2026-11-02T04:11:00+08:00"
      },
      {
        "id": "yn_0050",
        "origin": "yoin",
        "lang": "en",
        "chunk": "hold your horses",
        "sentence": "Hold your horses. The lantern still needs a wick.",
        "meaning_zh": "等一下、別急",
        "meaning_target": "wait, be patient",
        "example": "Hold your horses. The lantern still needs a wick.",
        "source": {
          "platform": "hbomax",
          "source_id": "hb-4150",
          "source_title": "The Last Lantern",
          "start_sec": 207,
          "episode": "S1 E1",
          "jump_url": "https://play.max.com/video/watch/hb-4150?t=207"
        },
        "created_at": "2026-11-01T05:12:00+08:00"
      },
      {
        "id": "yn_0051",
        "origin": "yoin",
        "lang": "ja",
        "chunk": "息が詰まる",
        "sentence": "この部屋は静かすぎて息が詰まる。",
        "meaning_zh": "喘不過氣、令人窒息",
        "meaning_target": "緊張して苦しく感じる",
        "example": "この部屋は静かすぎて息が詰まる。",
        "source": {
          "platform": "netflix",
          "source_id": "ne-4151",
          "source_title": "雨の待合室",
          "start_sec": 655,
          "episode": "第 4 集",
          "jump_url": "https://www.netflix.com/watch/ne-4151?t=655"
        },
        "created_at": "2026-11-02T06:13:00+08:00",
        "reading": "いきがつまる"
      }
    ],
    "results": [
      {
        "index": 0,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 1,
        "status": "would_create",
        "deck": "Yoin::日本語"
      },
      {
        "index": 2,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 3,
        "status": "error",
        "deck": "Yoin::English",
        "error": "invalid item shape",
        "error_code": "invalid_shape"
      },
      {
        "index": 4,
        "status": "would_create",
        "deck": "Yoin::日本語"
      },
      {
        "index": 5,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 6,
        "status": "would_create",
        "deck": "Yoin::日本語"
      },
      {
        "index": 7,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 8,
        "status": "error",
        "deck": "Yoin::English",
        "error": "invalid source or unapproved HTTPS link",
        "error_code": "unapproved_url",
        "error_field": "source.jump_url"
      },
      {
        "index": 9,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 10,
        "status": "would_create",
        "deck": "Yoin::日本語"
      },
      {
        "index": 11,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 12,
        "status": "error",
        "deck": "Yoin::English",
        "error": "missing, oversized, or invalid text field",
        "error_code": "text_missing",
        "error_field": "meaning_zh"
      },
      {
        "index": 13,
        "status": "would_create",
        "deck": "Yoin::English"
      },
      {
        "index": 14,
        "status": "would_create",
        "deck": "Yoin::日本語"
      }
    ],
    "decks": [
      {
        "name": "Yoin::English",
        "exists": true,
        "would_create": false
      },
      {
        "name": "Yoin::日本語",
        "exists": true,
        "would_create": false
      }
    ]
  }
};
export const overLimit: ImportItem[] = [{"id":"yn_0001","origin":"yoin","lang":"en","chunk":"run out of","sentence":"We're about to run out of coffee filters again.","meaning_zh":"用完、耗盡","meaning_target":"to use all of something","example":"We're about to run out of coffee filters again.","source":{"platform":"youtube","source_id":"yo-4101","source_title":"Small Kitchen, Big City","start_sec":252,"jump_url":"https://www.youtube.com/watch?v=yo-4101&t=252"},"created_at":"2026-11-02T01:11:00+08:00"},{"id":"yn_0002","origin":"yoin","lang":"en","chunk":"call it a day","sentence":"It's past midnight. Let's call it a day.","meaning_zh":"今天就到這裡、收工","meaning_target":"to stop working for now","example":"It's past midnight. Let's call it a day.","source":{"platform":"hbomax","source_id":"hb-4102","source_title":"The Last Lantern","start_sec":1865,"episode":"S1 E2","jump_url":"https://play.max.com/video/watch/hb-4102?t=1865"},"created_at":"2026-11-01T02:12:00+08:00"},{"id":"yn_0003","origin":"yoin","lang":"en","chunk":"on the fence","sentence":"I'm still on the fence about taking the job.","meaning_zh":"猶豫不決、還沒決定","meaning_target":"not yet decided","example":"I'm still on the fence about taking the job.","source":{"platform":"netflix","source_id":"ne-4103","source_title":"Harbor Lights","start_sec":767,"episode":"S1 E4","jump_url":"https://www.netflix.com/watch/ne-4103?t=767"},"created_at":"2026-11-02T03:13:00+08:00"},{"id":"yn_0004","origin":"yoin","lang":"en","chunk":"get the hang of","sentence":"You'll get the hang of the knife work by Friday.","meaning_zh":"慢慢上手、抓到訣竅","meaning_target":"to learn how to do something","example":"You'll get the hang of the knife work by Friday.","source":{"platform":"youtube","source_id":"yo-4104","source_title":"Small Kitchen, Big City","start_sec":570,"jump_url":"https://www.youtube.com/watch?v=yo-4104&t=570"},"created_at":"2026-11-01T04:14:00+08:00"},{"id":"yn_0005","origin":"yoin","lang":"en","chunk":"cut corners","sentence":"We never cut corners on the lamp oil.","meaning_zh":"偷工減料、走捷徑","meaning_target":"to do something badly to save time","example":"We never cut corners on the lamp oil.","source":{"platform":"hbomax","source_id":"hb-4105","source_title":"The Last Lantern","start_sec":496,"episode":"S1 E3","jump_url":"https://play.max.com/video/watch/hb-4105?t=496"},"created_at":"2026-11-02T05:15:00+08:00"},{"id":"yn_0006","origin":"yoin","lang":"en","chunk":"under the weather","sentence":"Mara is a bit under the weather, so I took her shift.","meaning_zh":"身體不太舒服","meaning_target":"slightly ill","example":"Mara is a bit under the weather, so I took her shift.","source":{"platform":"netflix","source_id":"ne-4106","source_title":"Harbor Lights","start_sec":1360,"episode":"S1 E5","jump_url":"https://www.netflix.com/watch/ne-4106?t=1360"},"created_at":"2026-11-01T06:10:00+08:00"},{"id":"yn_0007","origin":"yoin","lang":"en","chunk":"a long shot","sentence":"It's a long shot, but the ferry might still be running.","meaning_zh":"機會渺茫的嘗試","meaning_target":"something unlikely to succeed","example":"It's a long shot, but the ferry might still be running.","source":{"platform":"hbomax","source_id":"hb-4107","source_title":"The Last Lantern","start_sec":2698,"episode":"S1 E2","jump_url":"https://play.max.com/video/watch/hb-4107?t=2698"},"created_at":"2026-11-02T07:11:00+08:00"},{"id":"yn_0008","origin":"yoin","lang":"en","chunk":"play it by ear","sentence":"No plan for Sunday. We'll play it by ear.","meaning_zh":"見機行事、到時再說","meaning_target":"to decide as things happen","example":"No plan for Sunday. We'll play it by ear.","source":{"platform":"youtube","source_id":"yo-4108","source_title":"Weekend in Lisbon","start_sec":141,"jump_url":"https://www.youtube.com/watch?v=yo-4108&t=141"},"created_at":"2026-11-01T08:12:00+08:00"},{"id":"yn_0009","origin":"yoin","lang":"en","chunk":"out of the blue","sentence":"You called me out of the blue on a Tuesday night.","meaning_zh":"突然、毫無預警","meaning_target":"unexpectedly","example":"You called me out of the blue on a Tuesday night.","source":{"platform":"lrclib","source_id":"lr-4109","source_title":"Paper Moon Avenue","start_sec":48},"created_at":"2026-11-02T00:13:00+08:00"},{"id":"yn_0010","origin":"yoin","lang":"en","chunk":"back to square one","sentence":"The harbour permit fell through, so we are back to square one.","meaning_zh":"從頭來過","meaning_target":"back to the start","example":"The harbour permit fell through, so we are back to square one.","source":{"platform":"netflix","source_id":"ne-4110","source_title":"Harbor Lights","start_sec":2232,"episode":"S1 E6","jump_url":"https://www.netflix.com/watch/ne-4110?t=2232"},"created_at":"2026-11-01T01:14:00+08:00"},{"id":"yn_0011","origin":"yoin","lang":"en","chunk":"take a rain check","sentence":"Can I take a rain check on dinner? The storm's coming in.","meaning_zh":"改天再約","meaning_target":"to accept an offer for a later time","example":"Can I take a rain check on dinner? The storm's coming in.","source":{"platform":"hbomax","source_id":"hb-4111","source_title":"The Last Lantern","start_sec":933,"episode":"S1 E4","jump_url":"https://play.max.com/video/watch/hb-4111?t=933"},"created_at":"2026-11-02T02:15:00+08:00"},{"id":"yn_0012","origin":"yoin","lang":"en","chunk":"the last straw","sentence":"Losing the boat keys was the last straw.","meaning_zh":"壓垮駱駝的最後一根稻草","meaning_target":"the final problem that makes you give up","example":"Losing the boat keys was the last straw.","source":{"platform":"netflix","source_id":"ne-4112","source_title":"Harbor Lights","start_sec":2409,"episode":"S1 E6","jump_url":"https://www.netflix.com/watch/ne-4112?t=2409"},"created_at":"2026-11-01T03:10:00+08:00"},{"id":"yn_0013","origin":"yoin","lang":"en","chunk":"by the skin of my teeth","sentence":"I made the last train by the skin of my teeth.","meaning_zh":"驚險地、差一點就沒","meaning_target":"only just","example":"I made the last train by the skin of my teeth.","source":{"platform":"youtube","source_id":"yo-4113","source_title":"Night Shift Diaries","start_sec":414,"jump_url":"https://www.youtube.com/watch?v=yo-4113&t=414"},"created_at":"2026-11-02T04:11:00+08:00"},{"id":"yn_0014","origin":"yoin","lang":"en","chunk":"hold your horses","sentence":"Hold your horses. The lantern still needs a wick.","meaning_zh":"等一下、別急","meaning_target":"wait, be patient","example":"Hold your horses. The lantern still needs a wick.","source":{"platform":"hbomax","source_id":"hb-4114","source_title":"The Last Lantern","start_sec":207,"episode":"S1 E1","jump_url":"https://play.max.com/video/watch/hb-4114?t=207"},"created_at":"2026-11-01T05:12:00+08:00"},{"id":"yn_0015","origin":"yoin","lang":"en","chunk":"break the ice","sentence":"He told the fish joke to break the ice.","meaning_zh":"打破沉默、緩和氣氛","meaning_target":"to make people feel relaxed","example":"He told the fish joke to break the ice.","source":{"platform":"netflix","source_id":"ne-4115","source_title":"Harbor Lights","start_sec":318,"episode":"S1 E1","jump_url":"https://www.netflix.com/watch/ne-4115?t=318"},"created_at":"2026-11-02T06:13:00+08:00"},{"id":"yn_0016","origin":"yoin","lang":"en","chunk":"sleep on it","sentence":"Don't answer now. Sleep on it.","meaning_zh":"想一晚再決定","meaning_target":"to decide tomorrow","example":"Don't answer now. Sleep on it.","source":{"platform":"hbomax","source_id":"hb-4116","source_title":"The Last Lantern","start_sec":1544,"episode":"S1 E5","jump_url":"https://play.max.com/video/watch/hb-4116?t=1544"},"created_at":"2026-11-01T07:14:00+08:00"},{"id":"yn_0017","origin":"yoin","lang":"en","chunk":"wrap up","sentence":"Let's wrap up before the tide turns.","meaning_zh":"收尾、結束","meaning_target":"to finish","example":"Let's wrap up before the tide turns.","source":{"platform":"netflix","source_id":"ne-4117","source_title":"Harbor Lights","start_sec":2871,"episode":"S1 E2","jump_url":"https://www.netflix.com/watch/ne-4117?t=2871"},"created_at":"2026-11-02T08:15:00+08:00"},{"id":"yn_0018","origin":"yoin","lang":"ja","chunk":"気がする","sentence":"今日は、あの人に会える気がする。","meaning_zh":"覺得；有……的感覺","meaning_target":"はっきりとはわからないが、そうだと感じる","example":"今日は、あの人に会える気がする。","source":{"platform":"netflix","source_id":"ne-4118","source_title":"雨の待合室","start_sec":198,"episode":"第 1 集","jump_url":"https://www.netflix.com/watch/ne-4118?t=198"},"created_at":"2026-11-01T00:10:00+08:00","reading":"きがする"},{"id":"yn_0019","origin":"yoin","lang":"ja","chunk":"仕方がない","sentence":"終電を逃したなら、仕方がない。","meaning_zh":"沒辦法、只好這樣","meaning_target":"どうすることもできない","example":"終電を逃したなら、仕方がない。","source":{"platform":"netflix","source_id":"ne-4119","source_title":"雨の待合室","start_sec":1124,"episode":"第 2 集","jump_url":"https://www.netflix.com/watch/ne-4119?t=1124"},"created_at":"2026-11-02T01:11:00+08:00","reading":"しかたがない"},{"id":"yn_0020","origin":"yoin","lang":"ja","chunk":"腑に落ちる","sentence":"彼の説明は、どうも腑に落ちない。","meaning_zh":"終於想通、能接受","meaning_target":"納得できる","example":"彼の説明は、どうも腑に落ちない。","source":{"platform":"netflix","source_id":"ne-4120","source_title":"雨の待合室","start_sec":1570,"episode":"第 3 集","jump_url":"https://www.netflix.com/watch/ne-4120?t=1570"},"created_at":"2026-11-01T02:12:00+08:00","reading":"ふにおちる"},{"id":"yn_0021","origin":"yoin","lang":"ja","chunk":"様子を見る","sentence":"熱が下がるまで、少し様子を見よう。","meaning_zh":"先觀察看看","meaning_target":"しばらく状況を見守る","example":"熱が下がるまで、少し様子を見よう。","source":{"platform":"youtube","source_id":"yo-4121","source_title":"京都の台所から","start_sec":455,"jump_url":"https://www.youtube.com/watch?v=yo-4121&t=455"},"created_at":"2026-11-02T03:13:00+08:00","reading":"ようすをみる"},{"id":"yn_0022","origin":"yoin","lang":"ja","chunk":"目が離せない","sentence":"この子猫からは目が離せない。","meaning_zh":"讓人目不轉睛","meaning_target":"注意をそらすことができない","example":"この子猫からは目が離せない。","source":{"platform":"youtube","source_id":"yo-4122","source_title":"東京さんぽ日記","start_sec":347,"jump_url":"https://www.youtube.com/watch?v=yo-4122&t=347"},"created_at":"2026-11-01T04:14:00+08:00","reading":"めがはなせない"},{"id":"yn_0023","origin":"yoin","lang":"ja","chunk":"案の定","sentence":"案の定、バスは遅れて来た。","meaning_zh":"果然、不出所料","meaning_target":"思っていたとおり","example":"案の定、バスは遅れて来た。","source":{"platform":"netflix","source_id":"ne-4123","source_title":"雨の待合室","start_sec":1912,"episode":"第 3 集","jump_url":"https://www.netflix.com/watch/ne-4123?t=1912"},"created_at":"2026-11-02T05:15:00+08:00","reading":"あんのじょう"},{"id":"yn_0024","origin":"yoin","lang":"ja","chunk":"お言葉に甘えて","sentence":"では、お言葉に甘えて。","meaning_zh":"那我就不客氣了","meaning_target":"相手の好意を受け入れて","example":"では、お言葉に甘えて。","source":{"platform":"youtube","source_id":"yo-4124","source_title":"京都の台所から","start_sec":903,"jump_url":"https://www.youtube.com/watch?v=yo-4124&t=903"},"created_at":"2026-11-01T06:10:00+08:00","reading":"おことばにあまえて"},{"id":"yn_0025","origin":"yoin","lang":"ja","chunk":"手が届く","sentence":"あと少しで、手が届きそうな朝。","meaning_zh":"搆得著；負擔得起","meaning_target":"自分の力で得られる範囲にある","example":"あと少しで、手が届きそうな朝。","source":{"platform":"lrclib","source_id":"lr-4125","source_title":"夜明けのバス停","start_sec":72},"created_at":"2026-11-02T07:11:00+08:00","reading":"てがとどく"},{"id":"yn_0026","origin":"yoin","lang":"ja","chunk":"息が詰まる","sentence":"この部屋は静かすぎて息が詰まる。","meaning_zh":"喘不過氣、令人窒息","meaning_target":"緊張して苦しく感じる","example":"この部屋は静かすぎて息が詰まる。","source":{"platform":"netflix","source_id":"ne-4126","source_title":"雨の待合室","start_sec":655,"episode":"第 4 集","jump_url":"https://www.netflix.com/watch/ne-4126?t=655"},"created_at":"2026-11-01T08:12:00+08:00","reading":"いきがつまる"},{"id":"yn_0027","origin":"yoin","lang":"ja","chunk":"気をつけて","sentence":"雨だから、気をつけて帰ってね。","meaning_zh":"小心、路上保重","meaning_target":"注意して","example":"雨だから、気をつけて帰ってね。","source":{"platform":"netflix","source_id":"ne-4127","source_title":"雨の待合室","start_sec":1402,"episode":"第 1 集","jump_url":"https://www.netflix.com/watch/ne-4127?t=1402"},"created_at":"2026-11-02T00:13:00+08:00","reading":"きをつけて"},{"id":"yn_0028","origin":"yoin","lang":"en","chunk":"run out of","sentence":"We're about to run out of coffee filters again.","meaning_zh":"用完、耗盡","meaning_target":"to use all of something","example":"We're about to run out of coffee filters again.","source":{"platform":"youtube","source_id":"yo-4128","source_title":"Small Kitchen, Big City","start_sec":252,"jump_url":"https://www.youtube.com/watch?v=yo-4128&t=252"},"created_at":"2026-11-01T01:14:00+08:00"},{"id":"yn_0029","origin":"yoin","lang":"en","chunk":"call it a day","sentence":"It's past midnight. Let's call it a day.","meaning_zh":"今天就到這裡、收工","meaning_target":"to stop working for now","example":"It's past midnight. Let's call it a day.","source":{"platform":"hbomax","source_id":"hb-4129","source_title":"The Last Lantern","start_sec":1865,"episode":"S1 E2","jump_url":"https://play.max.com/video/watch/hb-4129?t=1865"},"created_at":"2026-11-02T02:15:00+08:00"},{"id":"yn_0030","origin":"yoin","lang":"en","chunk":"on the fence","sentence":"I'm still on the fence about taking the job.","meaning_zh":"猶豫不決、還沒決定","meaning_target":"not yet decided","example":"I'm still on the fence about taking the job.","source":{"platform":"netflix","source_id":"ne-4130","source_title":"Harbor Lights","start_sec":767,"episode":"S1 E4","jump_url":"https://www.netflix.com/watch/ne-4130?t=767"},"created_at":"2026-11-01T03:10:00+08:00"},{"id":"yn_0031","origin":"yoin","lang":"en","chunk":"get the hang of","sentence":"You'll get the hang of the knife work by Friday.","meaning_zh":"慢慢上手、抓到訣竅","meaning_target":"to learn how to do something","example":"You'll get the hang of the knife work by Friday.","source":{"platform":"youtube","source_id":"yo-4131","source_title":"Small Kitchen, Big City","start_sec":570,"jump_url":"https://www.youtube.com/watch?v=yo-4131&t=570"},"created_at":"2026-11-02T04:11:00+08:00"},{"id":"yn_0032","origin":"yoin","lang":"en","chunk":"cut corners","sentence":"We never cut corners on the lamp oil.","meaning_zh":"偷工減料、走捷徑","meaning_target":"to do something badly to save time","example":"We never cut corners on the lamp oil.","source":{"platform":"hbomax","source_id":"hb-4132","source_title":"The Last Lantern","start_sec":496,"episode":"S1 E3","jump_url":"https://play.max.com/video/watch/hb-4132?t=496"},"created_at":"2026-11-01T05:12:00+08:00"},{"id":"yn_0033","origin":"yoin","lang":"en","chunk":"under the weather","sentence":"Mara is a bit under the weather, so I took her shift.","meaning_zh":"身體不太舒服","meaning_target":"slightly ill","example":"Mara is a bit under the weather, so I took her shift.","source":{"platform":"netflix","source_id":"ne-4133","source_title":"Harbor Lights","start_sec":1360,"episode":"S1 E5","jump_url":"https://www.netflix.com/watch/ne-4133?t=1360"},"created_at":"2026-11-02T06:13:00+08:00"},{"id":"yn_0034","origin":"yoin","lang":"en","chunk":"a long shot","sentence":"It's a long shot, but the ferry might still be running.","meaning_zh":"機會渺茫的嘗試","meaning_target":"something unlikely to succeed","example":"It's a long shot, but the ferry might still be running.","source":{"platform":"hbomax","source_id":"hb-4134","source_title":"The Last Lantern","start_sec":2698,"episode":"S1 E2","jump_url":"https://play.max.com/video/watch/hb-4134?t=2698"},"created_at":"2026-11-01T07:14:00+08:00"},{"id":"yn_0035","origin":"yoin","lang":"en","chunk":"play it by ear","sentence":"No plan for Sunday. We'll play it by ear.","meaning_zh":"見機行事、到時再說","meaning_target":"to decide as things happen","example":"No plan for Sunday. We'll play it by ear.","source":{"platform":"youtube","source_id":"yo-4135","source_title":"Weekend in Lisbon","start_sec":141,"jump_url":"https://www.youtube.com/watch?v=yo-4135&t=141"},"created_at":"2026-11-02T08:15:00+08:00"},{"id":"yn_0036","origin":"yoin","lang":"en","chunk":"out of the blue","sentence":"You called me out of the blue on a Tuesday night.","meaning_zh":"突然、毫無預警","meaning_target":"unexpectedly","example":"You called me out of the blue on a Tuesday night.","source":{"platform":"lrclib","source_id":"lr-4136","source_title":"Paper Moon Avenue","start_sec":48},"created_at":"2026-11-01T00:10:00+08:00"},{"id":"yn_0037","origin":"yoin","lang":"en","chunk":"back to square one","sentence":"The harbour permit fell through, so we are back to square one.","meaning_zh":"從頭來過","meaning_target":"back to the start","example":"The harbour permit fell through, so we are back to square one.","source":{"platform":"netflix","source_id":"ne-4137","source_title":"Harbor Lights","start_sec":2232,"episode":"S1 E6","jump_url":"https://www.netflix.com/watch/ne-4137?t=2232"},"created_at":"2026-11-02T01:11:00+08:00"},{"id":"yn_0038","origin":"yoin","lang":"en","chunk":"take a rain check","sentence":"Can I take a rain check on dinner? The storm's coming in.","meaning_zh":"改天再約","meaning_target":"to accept an offer for a later time","example":"Can I take a rain check on dinner? The storm's coming in.","source":{"platform":"hbomax","source_id":"hb-4138","source_title":"The Last Lantern","start_sec":933,"episode":"S1 E4","jump_url":"https://play.max.com/video/watch/hb-4138?t=933"},"created_at":"2026-11-01T02:12:00+08:00"},{"id":"yn_0039","origin":"yoin","lang":"en","chunk":"the last straw","sentence":"Losing the boat keys was the last straw.","meaning_zh":"壓垮駱駝的最後一根稻草","meaning_target":"the final problem that makes you give up","example":"Losing the boat keys was the last straw.","source":{"platform":"netflix","source_id":"ne-4139","source_title":"Harbor Lights","start_sec":2409,"episode":"S1 E6","jump_url":"https://www.netflix.com/watch/ne-4139?t=2409"},"created_at":"2026-11-02T03:13:00+08:00"},{"id":"yn_0040","origin":"yoin","lang":"en","chunk":"by the skin of my teeth","sentence":"I made the last train by the skin of my teeth.","meaning_zh":"驚險地、差一點就沒","meaning_target":"only just","example":"I made the last train by the skin of my teeth.","source":{"platform":"youtube","source_id":"yo-4140","source_title":"Night Shift Diaries","start_sec":414,"jump_url":"https://www.youtube.com/watch?v=yo-4140&t=414"},"created_at":"2026-11-01T04:14:00+08:00"},{"id":"yn_0041","origin":"yoin","lang":"en","chunk":"hold your horses","sentence":"Hold your horses. The lantern still needs a wick.","meaning_zh":"等一下、別急","meaning_target":"wait, be patient","example":"Hold your horses. The lantern still needs a wick.","source":{"platform":"hbomax","source_id":"hb-4141","source_title":"The Last Lantern","start_sec":207,"episode":"S1 E1","jump_url":"https://play.max.com/video/watch/hb-4141?t=207"},"created_at":"2026-11-02T05:15:00+08:00"},{"id":"yn_0042","origin":"yoin","lang":"en","chunk":"break the ice","sentence":"He told the fish joke to break the ice.","meaning_zh":"打破沉默、緩和氣氛","meaning_target":"to make people feel relaxed","example":"He told the fish joke to break the ice.","source":{"platform":"netflix","source_id":"ne-4142","source_title":"Harbor Lights","start_sec":318,"episode":"S1 E1","jump_url":"https://www.netflix.com/watch/ne-4142?t=318"},"created_at":"2026-11-01T06:10:00+08:00"},{"id":"yn_0043","origin":"yoin","lang":"en","chunk":"sleep on it","sentence":"Don't answer now. Sleep on it.","meaning_zh":"想一晚再決定","meaning_target":"to decide tomorrow","example":"Don't answer now. Sleep on it.","source":{"platform":"hbomax","source_id":"hb-4143","source_title":"The Last Lantern","start_sec":1544,"episode":"S1 E5","jump_url":"https://play.max.com/video/watch/hb-4143?t=1544"},"created_at":"2026-11-02T07:11:00+08:00"},{"id":"yn_0044","origin":"yoin","lang":"en","chunk":"wrap up","sentence":"Let's wrap up before the tide turns.","meaning_zh":"收尾、結束","meaning_target":"to finish","example":"Let's wrap up before the tide turns.","source":{"platform":"netflix","source_id":"ne-4144","source_title":"Harbor Lights","start_sec":2871,"episode":"S1 E2","jump_url":"https://www.netflix.com/watch/ne-4144?t=2871"},"created_at":"2026-11-01T08:12:00+08:00"},{"id":"yn_0045","origin":"yoin","lang":"ja","chunk":"気がする","sentence":"今日は、あの人に会える気がする。","meaning_zh":"覺得；有……的感覺","meaning_target":"はっきりとはわからないが、そうだと感じる","example":"今日は、あの人に会える気がする。","source":{"platform":"netflix","source_id":"ne-4145","source_title":"雨の待合室","start_sec":198,"episode":"第 1 集","jump_url":"https://www.netflix.com/watch/ne-4145?t=198"},"created_at":"2026-11-02T00:13:00+08:00","reading":"きがする"},{"id":"yn_0046","origin":"yoin","lang":"ja","chunk":"仕方がない","sentence":"終電を逃したなら、仕方がない。","meaning_zh":"沒辦法、只好這樣","meaning_target":"どうすることもできない","example":"終電を逃したなら、仕方がない。","source":{"platform":"netflix","source_id":"ne-4146","source_title":"雨の待合室","start_sec":1124,"episode":"第 2 集","jump_url":"https://www.netflix.com/watch/ne-4146?t=1124"},"created_at":"2026-11-01T01:14:00+08:00","reading":"しかたがない"},{"id":"yn_0047","origin":"yoin","lang":"ja","chunk":"腑に落ちる","sentence":"彼の説明は、どうも腑に落ちない。","meaning_zh":"終於想通、能接受","meaning_target":"納得できる","example":"彼の説明は、どうも腑に落ちない。","source":{"platform":"netflix","source_id":"ne-4147","source_title":"雨の待合室","start_sec":1570,"episode":"第 3 集","jump_url":"https://www.netflix.com/watch/ne-4147?t=1570"},"created_at":"2026-11-02T02:15:00+08:00","reading":"ふにおちる"},{"id":"yn_0048","origin":"yoin","lang":"ja","chunk":"様子を見る","sentence":"熱が下がるまで、少し様子を見よう。","meaning_zh":"先觀察看看","meaning_target":"しばらく状況を見守る","example":"熱が下がるまで、少し様子を見よう。","source":{"platform":"youtube","source_id":"yo-4148","source_title":"京都の台所から","start_sec":455,"jump_url":"https://www.youtube.com/watch?v=yo-4148&t=455"},"created_at":"2026-11-01T03:10:00+08:00","reading":"ようすをみる"},{"id":"yn_0049","origin":"yoin","lang":"ja","chunk":"目が離せない","sentence":"この子猫からは目が離せない。","meaning_zh":"讓人目不轉睛","meaning_target":"注意をそらすことができない","example":"この子猫からは目が離せない。","source":{"platform":"youtube","source_id":"yo-4149","source_title":"東京さんぽ日記","start_sec":347,"jump_url":"https://www.youtube.com/watch?v=yo-4149&t=347"},"created_at":"2026-11-02T04:11:00+08:00","reading":"めがはなせない"},{"id":"yn_0050","origin":"yoin","lang":"ja","chunk":"案の定","sentence":"案の定、バスは遅れて来た。","meaning_zh":"果然、不出所料","meaning_target":"思っていたとおり","example":"案の定、バスは遅れて来た。","source":{"platform":"netflix","source_id":"ne-4150","source_title":"雨の待合室","start_sec":1912,"episode":"第 3 集","jump_url":"https://www.netflix.com/watch/ne-4150?t=1912"},"created_at":"2026-11-01T05:12:00+08:00","reading":"あんのじょう"},{"id":"yn_0051","origin":"yoin","lang":"ja","chunk":"お言葉に甘えて","sentence":"では、お言葉に甘えて。","meaning_zh":"那我就不客氣了","meaning_target":"相手の好意を受け入れて","example":"では、お言葉に甘えて。","source":{"platform":"youtube","source_id":"yo-4151","source_title":"京都の台所から","start_sec":903,"jump_url":"https://www.youtube.com/watch?v=yo-4151&t=903"},"created_at":"2026-11-02T06:13:00+08:00","reading":"おことばにあまえて"},{"id":"yn_0052","origin":"yoin","lang":"ja","chunk":"手が届く","sentence":"あと少しで、手が届きそうな朝。","meaning_zh":"搆得著；負擔得起","meaning_target":"自分の力で得られる範囲にある","example":"あと少しで、手が届きそうな朝。","source":{"platform":"lrclib","source_id":"lr-4152","source_title":"夜明けのバス停","start_sec":72},"created_at":"2026-11-01T07:14:00+08:00","reading":"てがとどく"},{"id":"yn_0053","origin":"yoin","lang":"ja","chunk":"息が詰まる","sentence":"この部屋は静かすぎて息が詰まる。","meaning_zh":"喘不過氣、令人窒息","meaning_target":"緊張して苦しく感じる","example":"この部屋は静かすぎて息が詰まる。","source":{"platform":"netflix","source_id":"ne-4153","source_title":"雨の待合室","start_sec":655,"episode":"第 4 集","jump_url":"https://www.netflix.com/watch/ne-4153?t=655"},"created_at":"2026-11-02T08:15:00+08:00","reading":"いきがつまる"},{"id":"yn_0054","origin":"yoin","lang":"ja","chunk":"気をつけて","sentence":"雨だから、気をつけて帰ってね。","meaning_zh":"小心、路上保重","meaning_target":"注意して","example":"雨だから、気をつけて帰ってね。","source":{"platform":"netflix","source_id":"ne-4154","source_title":"雨の待合室","start_sec":1402,"episode":"第 1 集","jump_url":"https://www.netflix.com/watch/ne-4154?t=1402"},"created_at":"2026-11-01T00:10:00+08:00","reading":"きをつけて"},{"id":"yn_0055","origin":"yoin","lang":"en","chunk":"run out of","sentence":"We're about to run out of coffee filters again.","meaning_zh":"用完、耗盡","meaning_target":"to use all of something","example":"We're about to run out of coffee filters again.","source":{"platform":"youtube","source_id":"yo-4155","source_title":"Small Kitchen, Big City","start_sec":252,"jump_url":"https://www.youtube.com/watch?v=yo-4155&t=252"},"created_at":"2026-11-02T01:11:00+08:00"},{"id":"yn_0056","origin":"yoin","lang":"en","chunk":"call it a day","sentence":"It's past midnight. Let's call it a day.","meaning_zh":"今天就到這裡、收工","meaning_target":"to stop working for now","example":"It's past midnight. Let's call it a day.","source":{"platform":"hbomax","source_id":"hb-4156","source_title":"The Last Lantern","start_sec":1865,"episode":"S1 E2","jump_url":"https://play.max.com/video/watch/hb-4156?t=1865"},"created_at":"2026-11-01T02:12:00+08:00"},{"id":"yn_0057","origin":"yoin","lang":"en","chunk":"on the fence","sentence":"I'm still on the fence about taking the job.","meaning_zh":"猶豫不決、還沒決定","meaning_target":"not yet decided","example":"I'm still on the fence about taking the job.","source":{"platform":"netflix","source_id":"ne-4157","source_title":"Harbor Lights","start_sec":767,"episode":"S1 E4","jump_url":"https://www.netflix.com/watch/ne-4157?t=767"},"created_at":"2026-11-02T03:13:00+08:00"},{"id":"yn_0058","origin":"yoin","lang":"en","chunk":"get the hang of","sentence":"You'll get the hang of the knife work by Friday.","meaning_zh":"慢慢上手、抓到訣竅","meaning_target":"to learn how to do something","example":"You'll get the hang of the knife work by Friday.","source":{"platform":"youtube","source_id":"yo-4158","source_title":"Small Kitchen, Big City","start_sec":570,"jump_url":"https://www.youtube.com/watch?v=yo-4158&t=570"},"created_at":"2026-11-01T04:14:00+08:00"},{"id":"yn_0059","origin":"yoin","lang":"en","chunk":"cut corners","sentence":"We never cut corners on the lamp oil.","meaning_zh":"偷工減料、走捷徑","meaning_target":"to do something badly to save time","example":"We never cut corners on the lamp oil.","source":{"platform":"hbomax","source_id":"hb-4159","source_title":"The Last Lantern","start_sec":496,"episode":"S1 E3","jump_url":"https://play.max.com/video/watch/hb-4159?t=496"},"created_at":"2026-11-02T05:15:00+08:00"},{"id":"yn_0060","origin":"yoin","lang":"en","chunk":"under the weather","sentence":"Mara is a bit under the weather, so I took her shift.","meaning_zh":"身體不太舒服","meaning_target":"slightly ill","example":"Mara is a bit under the weather, so I took her shift.","source":{"platform":"netflix","source_id":"ne-4160","source_title":"Harbor Lights","start_sec":1360,"episode":"S1 E5","jump_url":"https://www.netflix.com/watch/ne-4160?t=1360"},"created_at":"2026-11-01T06:10:00+08:00"},{"id":"yn_0061","origin":"yoin","lang":"en","chunk":"a long shot","sentence":"It's a long shot, but the ferry might still be running.","meaning_zh":"機會渺茫的嘗試","meaning_target":"something unlikely to succeed","example":"It's a long shot, but the ferry might still be running.","source":{"platform":"hbomax","source_id":"hb-4161","source_title":"The Last Lantern","start_sec":2698,"episode":"S1 E2","jump_url":"https://play.max.com/video/watch/hb-4161?t=2698"},"created_at":"2026-11-02T07:11:00+08:00"},{"id":"yn_0062","origin":"yoin","lang":"en","chunk":"play it by ear","sentence":"No plan for Sunday. We'll play it by ear.","meaning_zh":"見機行事、到時再說","meaning_target":"to decide as things happen","example":"No plan for Sunday. We'll play it by ear.","source":{"platform":"youtube","source_id":"yo-4162","source_title":"Weekend in Lisbon","start_sec":141,"jump_url":"https://www.youtube.com/watch?v=yo-4162&t=141"},"created_at":"2026-11-01T08:12:00+08:00"},{"id":"yn_0063","origin":"yoin","lang":"en","chunk":"out of the blue","sentence":"You called me out of the blue on a Tuesday night.","meaning_zh":"突然、毫無預警","meaning_target":"unexpectedly","example":"You called me out of the blue on a Tuesday night.","source":{"platform":"lrclib","source_id":"lr-4163","source_title":"Paper Moon Avenue","start_sec":48},"created_at":"2026-11-02T00:13:00+08:00"},{"id":"yn_0064","origin":"yoin","lang":"en","chunk":"back to square one","sentence":"The harbour permit fell through, so we are back to square one.","meaning_zh":"從頭來過","meaning_target":"back to the start","example":"The harbour permit fell through, so we are back to square one.","source":{"platform":"netflix","source_id":"ne-4164","source_title":"Harbor Lights","start_sec":2232,"episode":"S1 E6","jump_url":"https://www.netflix.com/watch/ne-4164?t=2232"},"created_at":"2026-11-01T01:14:00+08:00"},{"id":"yn_0065","origin":"yoin","lang":"en","chunk":"take a rain check","sentence":"Can I take a rain check on dinner? The storm's coming in.","meaning_zh":"改天再約","meaning_target":"to accept an offer for a later time","example":"Can I take a rain check on dinner? The storm's coming in.","source":{"platform":"hbomax","source_id":"hb-4165","source_title":"The Last Lantern","start_sec":933,"episode":"S1 E4","jump_url":"https://play.max.com/video/watch/hb-4165?t=933"},"created_at":"2026-11-02T02:15:00+08:00"},{"id":"yn_0066","origin":"yoin","lang":"en","chunk":"the last straw","sentence":"Losing the boat keys was the last straw.","meaning_zh":"壓垮駱駝的最後一根稻草","meaning_target":"the final problem that makes you give up","example":"Losing the boat keys was the last straw.","source":{"platform":"netflix","source_id":"ne-4166","source_title":"Harbor Lights","start_sec":2409,"episode":"S1 E6","jump_url":"https://www.netflix.com/watch/ne-4166?t=2409"},"created_at":"2026-11-01T03:10:00+08:00"},{"id":"yn_0067","origin":"yoin","lang":"en","chunk":"by the skin of my teeth","sentence":"I made the last train by the skin of my teeth.","meaning_zh":"驚險地、差一點就沒","meaning_target":"only just","example":"I made the last train by the skin of my teeth.","source":{"platform":"youtube","source_id":"yo-4167","source_title":"Night Shift Diaries","start_sec":414,"jump_url":"https://www.youtube.com/watch?v=yo-4167&t=414"},"created_at":"2026-11-02T04:11:00+08:00"},{"id":"yn_0068","origin":"yoin","lang":"en","chunk":"hold your horses","sentence":"Hold your horses. The lantern still needs a wick.","meaning_zh":"等一下、別急","meaning_target":"wait, be patient","example":"Hold your horses. The lantern still needs a wick.","source":{"platform":"hbomax","source_id":"hb-4168","source_title":"The Last Lantern","start_sec":207,"episode":"S1 E1","jump_url":"https://play.max.com/video/watch/hb-4168?t=207"},"created_at":"2026-11-01T05:12:00+08:00"},{"id":"yn_0069","origin":"yoin","lang":"en","chunk":"break the ice","sentence":"He told the fish joke to break the ice.","meaning_zh":"打破沉默、緩和氣氛","meaning_target":"to make people feel relaxed","example":"He told the fish joke to break the ice.","source":{"platform":"netflix","source_id":"ne-4169","source_title":"Harbor Lights","start_sec":318,"episode":"S1 E1","jump_url":"https://www.netflix.com/watch/ne-4169?t=318"},"created_at":"2026-11-02T06:13:00+08:00"},{"id":"yn_0070","origin":"yoin","lang":"en","chunk":"sleep on it","sentence":"Don't answer now. Sleep on it.","meaning_zh":"想一晚再決定","meaning_target":"to decide tomorrow","example":"Don't answer now. Sleep on it.","source":{"platform":"hbomax","source_id":"hb-4170","source_title":"The Last Lantern","start_sec":1544,"episode":"S1 E5","jump_url":"https://play.max.com/video/watch/hb-4170?t=1544"},"created_at":"2026-11-01T07:14:00+08:00"},{"id":"yn_0071","origin":"yoin","lang":"en","chunk":"wrap up","sentence":"Let's wrap up before the tide turns.","meaning_zh":"收尾、結束","meaning_target":"to finish","example":"Let's wrap up before the tide turns.","source":{"platform":"netflix","source_id":"ne-4171","source_title":"Harbor Lights","start_sec":2871,"episode":"S1 E2","jump_url":"https://www.netflix.com/watch/ne-4171?t=2871"},"created_at":"2026-11-02T08:15:00+08:00"},{"id":"yn_0072","origin":"yoin","lang":"ja","chunk":"気がする","sentence":"今日は、あの人に会える気がする。","meaning_zh":"覺得；有……的感覺","meaning_target":"はっきりとはわからないが、そうだと感じる","example":"今日は、あの人に会える気がする。","source":{"platform":"netflix","source_id":"ne-4172","source_title":"雨の待合室","start_sec":198,"episode":"第 1 集","jump_url":"https://www.netflix.com/watch/ne-4172?t=198"},"created_at":"2026-11-01T00:10:00+08:00","reading":"きがする"},{"id":"yn_0073","origin":"yoin","lang":"ja","chunk":"仕方がない","sentence":"終電を逃したなら、仕方がない。","meaning_zh":"沒辦法、只好這樣","meaning_target":"どうすることもできない","example":"終電を逃したなら、仕方がない。","source":{"platform":"netflix","source_id":"ne-4173","source_title":"雨の待合室","start_sec":1124,"episode":"第 2 集","jump_url":"https://www.netflix.com/watch/ne-4173?t=1124"},"created_at":"2026-11-02T01:11:00+08:00","reading":"しかたがない"},{"id":"yn_0074","origin":"yoin","lang":"ja","chunk":"腑に落ちる","sentence":"彼の説明は、どうも腑に落ちない。","meaning_zh":"終於想通、能接受","meaning_target":"納得できる","example":"彼の説明は、どうも腑に落ちない。","source":{"platform":"netflix","source_id":"ne-4174","source_title":"雨の待合室","start_sec":1570,"episode":"第 3 集","jump_url":"https://www.netflix.com/watch/ne-4174?t=1570"},"created_at":"2026-11-01T02:12:00+08:00","reading":"ふにおちる"},{"id":"yn_0075","origin":"yoin","lang":"ja","chunk":"様子を見る","sentence":"熱が下がるまで、少し様子を見よう。","meaning_zh":"先觀察看看","meaning_target":"しばらく状況を見守る","example":"熱が下がるまで、少し様子を見よう。","source":{"platform":"youtube","source_id":"yo-4175","source_title":"京都の台所から","start_sec":455,"jump_url":"https://www.youtube.com/watch?v=yo-4175&t=455"},"created_at":"2026-11-02T03:13:00+08:00","reading":"ようすをみる"},{"id":"yn_0076","origin":"yoin","lang":"ja","chunk":"目が離せない","sentence":"この子猫からは目が離せない。","meaning_zh":"讓人目不轉睛","meaning_target":"注意をそらすことができない","example":"この子猫からは目が離せない。","source":{"platform":"youtube","source_id":"yo-4176","source_title":"東京さんぽ日記","start_sec":347,"jump_url":"https://www.youtube.com/watch?v=yo-4176&t=347"},"created_at":"2026-11-01T04:14:00+08:00","reading":"めがはなせない"},{"id":"yn_0077","origin":"yoin","lang":"ja","chunk":"案の定","sentence":"案の定、バスは遅れて来た。","meaning_zh":"果然、不出所料","meaning_target":"思っていたとおり","example":"案の定、バスは遅れて来た。","source":{"platform":"netflix","source_id":"ne-4177","source_title":"雨の待合室","start_sec":1912,"episode":"第 3 集","jump_url":"https://www.netflix.com/watch/ne-4177?t=1912"},"created_at":"2026-11-02T05:15:00+08:00","reading":"あんのじょう"},{"id":"yn_0078","origin":"yoin","lang":"ja","chunk":"お言葉に甘えて","sentence":"では、お言葉に甘えて。","meaning_zh":"那我就不客氣了","meaning_target":"相手の好意を受け入れて","example":"では、お言葉に甘えて。","source":{"platform":"youtube","source_id":"yo-4178","source_title":"京都の台所から","start_sec":903,"jump_url":"https://www.youtube.com/watch?v=yo-4178&t=903"},"created_at":"2026-11-01T06:10:00+08:00","reading":"おことばにあまえて"},{"id":"yn_0079","origin":"yoin","lang":"ja","chunk":"手が届く","sentence":"あと少しで、手が届きそうな朝。","meaning_zh":"搆得著；負擔得起","meaning_target":"自分の力で得られる範囲にある","example":"あと少しで、手が届きそうな朝。","source":{"platform":"lrclib","source_id":"lr-4179","source_title":"夜明けのバス停","start_sec":72},"created_at":"2026-11-02T07:11:00+08:00","reading":"てがとどく"},{"id":"yn_0080","origin":"yoin","lang":"ja","chunk":"息が詰まる","sentence":"この部屋は静かすぎて息が詰まる。","meaning_zh":"喘不過氣、令人窒息","meaning_target":"緊張して苦しく感じる","example":"この部屋は静かすぎて息が詰まる。","source":{"platform":"netflix","source_id":"ne-4180","source_title":"雨の待合室","start_sec":655,"episode":"第 4 集","jump_url":"https://www.netflix.com/watch/ne-4180?t=655"},"created_at":"2026-11-01T08:12:00+08:00","reading":"いきがつまる"},{"id":"yn_0081","origin":"yoin","lang":"ja","chunk":"気をつけて","sentence":"雨だから、気をつけて帰ってね。","meaning_zh":"小心、路上保重","meaning_target":"注意して","example":"雨だから、気をつけて帰ってね。","source":{"platform":"netflix","source_id":"ne-4181","source_title":"雨の待合室","start_sec":1402,"episode":"第 1 集","jump_url":"https://www.netflix.com/watch/ne-4181?t=1402"},"created_at":"2026-11-02T00:13:00+08:00","reading":"きをつけて"},{"id":"yn_0082","origin":"yoin","lang":"en","chunk":"run out of","sentence":"We're about to run out of coffee filters again.","meaning_zh":"用完、耗盡","meaning_target":"to use all of something","example":"We're about to run out of coffee filters again.","source":{"platform":"youtube","source_id":"yo-4182","source_title":"Small Kitchen, Big City","start_sec":252,"jump_url":"https://www.youtube.com/watch?v=yo-4182&t=252"},"created_at":"2026-11-01T01:14:00+08:00"},{"id":"yn_0083","origin":"yoin","lang":"en","chunk":"call it a day","sentence":"It's past midnight. Let's call it a day.","meaning_zh":"今天就到這裡、收工","meaning_target":"to stop working for now","example":"It's past midnight. Let's call it a day.","source":{"platform":"hbomax","source_id":"hb-4183","source_title":"The Last Lantern","start_sec":1865,"episode":"S1 E2","jump_url":"https://play.max.com/video/watch/hb-4183?t=1865"},"created_at":"2026-11-02T02:15:00+08:00"},{"id":"yn_0084","origin":"yoin","lang":"en","chunk":"on the fence","sentence":"I'm still on the fence about taking the job.","meaning_zh":"猶豫不決、還沒決定","meaning_target":"not yet decided","example":"I'm still on the fence about taking the job.","source":{"platform":"netflix","source_id":"ne-4184","source_title":"Harbor Lights","start_sec":767,"episode":"S1 E4","jump_url":"https://www.netflix.com/watch/ne-4184?t=767"},"created_at":"2026-11-01T03:10:00+08:00"},{"id":"yn_0085","origin":"yoin","lang":"en","chunk":"get the hang of","sentence":"You'll get the hang of the knife work by Friday.","meaning_zh":"慢慢上手、抓到訣竅","meaning_target":"to learn how to do something","example":"You'll get the hang of the knife work by Friday.","source":{"platform":"youtube","source_id":"yo-4185","source_title":"Small Kitchen, Big City","start_sec":570,"jump_url":"https://www.youtube.com/watch?v=yo-4185&t=570"},"created_at":"2026-11-02T04:11:00+08:00"},{"id":"yn_0086","origin":"yoin","lang":"en","chunk":"cut corners","sentence":"We never cut corners on the lamp oil.","meaning_zh":"偷工減料、走捷徑","meaning_target":"to do something badly to save time","example":"We never cut corners on the lamp oil.","source":{"platform":"hbomax","source_id":"hb-4186","source_title":"The Last Lantern","start_sec":496,"episode":"S1 E3","jump_url":"https://play.max.com/video/watch/hb-4186?t=496"},"created_at":"2026-11-01T05:12:00+08:00"},{"id":"yn_0087","origin":"yoin","lang":"en","chunk":"under the weather","sentence":"Mara is a bit under the weather, so I took her shift.","meaning_zh":"身體不太舒服","meaning_target":"slightly ill","example":"Mara is a bit under the weather, so I took her shift.","source":{"platform":"netflix","source_id":"ne-4187","source_title":"Harbor Lights","start_sec":1360,"episode":"S1 E5","jump_url":"https://www.netflix.com/watch/ne-4187?t=1360"},"created_at":"2026-11-02T06:13:00+08:00"},{"id":"yn_0088","origin":"yoin","lang":"en","chunk":"a long shot","sentence":"It's a long shot, but the ferry might still be running.","meaning_zh":"機會渺茫的嘗試","meaning_target":"something unlikely to succeed","example":"It's a long shot, but the ferry might still be running.","source":{"platform":"hbomax","source_id":"hb-4188","source_title":"The Last Lantern","start_sec":2698,"episode":"S1 E2","jump_url":"https://play.max.com/video/watch/hb-4188?t=2698"},"created_at":"2026-11-01T07:14:00+08:00"},{"id":"yn_0089","origin":"yoin","lang":"en","chunk":"play it by ear","sentence":"No plan for Sunday. We'll play it by ear.","meaning_zh":"見機行事、到時再說","meaning_target":"to decide as things happen","example":"No plan for Sunday. We'll play it by ear.","source":{"platform":"youtube","source_id":"yo-4189","source_title":"Weekend in Lisbon","start_sec":141,"jump_url":"https://www.youtube.com/watch?v=yo-4189&t=141"},"created_at":"2026-11-02T08:15:00+08:00"},{"id":"yn_0090","origin":"yoin","lang":"en","chunk":"out of the blue","sentence":"You called me out of the blue on a Tuesday night.","meaning_zh":"突然、毫無預警","meaning_target":"unexpectedly","example":"You called me out of the blue on a Tuesday night.","source":{"platform":"lrclib","source_id":"lr-4190","source_title":"Paper Moon Avenue","start_sec":48},"created_at":"2026-11-01T00:10:00+08:00"},{"id":"yn_0091","origin":"yoin","lang":"en","chunk":"back to square one","sentence":"The harbour permit fell through, so we are back to square one.","meaning_zh":"從頭來過","meaning_target":"back to the start","example":"The harbour permit fell through, so we are back to square one.","source":{"platform":"netflix","source_id":"ne-4191","source_title":"Harbor Lights","start_sec":2232,"episode":"S1 E6","jump_url":"https://www.netflix.com/watch/ne-4191?t=2232"},"created_at":"2026-11-02T01:11:00+08:00"},{"id":"yn_0092","origin":"yoin","lang":"en","chunk":"take a rain check","sentence":"Can I take a rain check on dinner? The storm's coming in.","meaning_zh":"改天再約","meaning_target":"to accept an offer for a later time","example":"Can I take a rain check on dinner? The storm's coming in.","source":{"platform":"hbomax","source_id":"hb-4192","source_title":"The Last Lantern","start_sec":933,"episode":"S1 E4","jump_url":"https://play.max.com/video/watch/hb-4192?t=933"},"created_at":"2026-11-01T02:12:00+08:00"},{"id":"yn_0093","origin":"yoin","lang":"en","chunk":"the last straw","sentence":"Losing the boat keys was the last straw.","meaning_zh":"壓垮駱駝的最後一根稻草","meaning_target":"the final problem that makes you give up","example":"Losing the boat keys was the last straw.","source":{"platform":"netflix","source_id":"ne-4193","source_title":"Harbor Lights","start_sec":2409,"episode":"S1 E6","jump_url":"https://www.netflix.com/watch/ne-4193?t=2409"},"created_at":"2026-11-02T03:13:00+08:00"},{"id":"yn_0094","origin":"yoin","lang":"en","chunk":"by the skin of my teeth","sentence":"I made the last train by the skin of my teeth.","meaning_zh":"驚險地、差一點就沒","meaning_target":"only just","example":"I made the last train by the skin of my teeth.","source":{"platform":"youtube","source_id":"yo-4194","source_title":"Night Shift Diaries","start_sec":414,"jump_url":"https://www.youtube.com/watch?v=yo-4194&t=414"},"created_at":"2026-11-01T04:14:00+08:00"},{"id":"yn_0095","origin":"yoin","lang":"en","chunk":"hold your horses","sentence":"Hold your horses. The lantern still needs a wick.","meaning_zh":"等一下、別急","meaning_target":"wait, be patient","example":"Hold your horses. The lantern still needs a wick.","source":{"platform":"hbomax","source_id":"hb-4195","source_title":"The Last Lantern","start_sec":207,"episode":"S1 E1","jump_url":"https://play.max.com/video/watch/hb-4195?t=207"},"created_at":"2026-11-02T05:15:00+08:00"},{"id":"yn_0096","origin":"yoin","lang":"en","chunk":"break the ice","sentence":"He told the fish joke to break the ice.","meaning_zh":"打破沉默、緩和氣氛","meaning_target":"to make people feel relaxed","example":"He told the fish joke to break the ice.","source":{"platform":"netflix","source_id":"ne-4196","source_title":"Harbor Lights","start_sec":318,"episode":"S1 E1","jump_url":"https://www.netflix.com/watch/ne-4196?t=318"},"created_at":"2026-11-01T06:10:00+08:00"},{"id":"yn_0097","origin":"yoin","lang":"en","chunk":"sleep on it","sentence":"Don't answer now. Sleep on it.","meaning_zh":"想一晚再決定","meaning_target":"to decide tomorrow","example":"Don't answer now. Sleep on it.","source":{"platform":"hbomax","source_id":"hb-4197","source_title":"The Last Lantern","start_sec":1544,"episode":"S1 E5","jump_url":"https://play.max.com/video/watch/hb-4197?t=1544"},"created_at":"2026-11-02T07:11:00+08:00"},{"id":"yn_0098","origin":"yoin","lang":"en","chunk":"wrap up","sentence":"Let's wrap up before the tide turns.","meaning_zh":"收尾、結束","meaning_target":"to finish","example":"Let's wrap up before the tide turns.","source":{"platform":"netflix","source_id":"ne-4198","source_title":"Harbor Lights","start_sec":2871,"episode":"S1 E2","jump_url":"https://www.netflix.com/watch/ne-4198?t=2871"},"created_at":"2026-11-01T08:12:00+08:00"},{"id":"yn_0099","origin":"yoin","lang":"ja","chunk":"気がする","sentence":"今日は、あの人に会える気がする。","meaning_zh":"覺得；有……的感覺","meaning_target":"はっきりとはわからないが、そうだと感じる","example":"今日は、あの人に会える気がする。","source":{"platform":"netflix","source_id":"ne-4199","source_title":"雨の待合室","start_sec":198,"episode":"第 1 集","jump_url":"https://www.netflix.com/watch/ne-4199?t=198"},"created_at":"2026-11-02T00:13:00+08:00","reading":"きがする"},{"id":"yn_0100","origin":"yoin","lang":"ja","chunk":"仕方がない","sentence":"終電を逃したなら、仕方がない。","meaning_zh":"沒辦法、只好這樣","meaning_target":"どうすることもできない","example":"終電を逃したなら、仕方がない。","source":{"platform":"netflix","source_id":"ne-4200","source_title":"雨の待合室","start_sec":1124,"episode":"第 2 集","jump_url":"https://www.netflix.com/watch/ne-4200?t=1124"},"created_at":"2026-11-01T01:14:00+08:00","reading":"しかたがない"},{"id":"yn_0101","origin":"yoin","lang":"ja","chunk":"腑に落ちる","sentence":"彼の説明は、どうも腑に落ちない。","meaning_zh":"終於想通、能接受","meaning_target":"納得できる","example":"彼の説明は、どうも腑に落ちない。","source":{"platform":"netflix","source_id":"ne-4201","source_title":"雨の待合室","start_sec":1570,"episode":"第 3 集","jump_url":"https://www.netflix.com/watch/ne-4201?t=1570"},"created_at":"2026-11-02T02:15:00+08:00","reading":"ふにおちる"},{"id":"yn_0102","origin":"yoin","lang":"ja","chunk":"様子を見る","sentence":"熱が下がるまで、少し様子を見よう。","meaning_zh":"先觀察看看","meaning_target":"しばらく状況を見守る","example":"熱が下がるまで、少し様子を見よう。","source":{"platform":"youtube","source_id":"yo-4202","source_title":"京都の台所から","start_sec":455,"jump_url":"https://www.youtube.com/watch?v=yo-4202&t=455"},"created_at":"2026-11-01T03:10:00+08:00","reading":"ようすをみる"},{"id":"yn_0103","origin":"yoin","lang":"ja","chunk":"目が離せない","sentence":"この子猫からは目が離せない。","meaning_zh":"讓人目不轉睛","meaning_target":"注意をそらすことができない","example":"この子猫からは目が離せない。","source":{"platform":"youtube","source_id":"yo-4203","source_title":"東京さんぽ日記","start_sec":347,"jump_url":"https://www.youtube.com/watch?v=yo-4203&t=347"},"created_at":"2026-11-02T04:11:00+08:00","reading":"めがはなせない"},{"id":"yn_0104","origin":"yoin","lang":"ja","chunk":"案の定","sentence":"案の定、バスは遅れて来た。","meaning_zh":"果然、不出所料","meaning_target":"思っていたとおり","example":"案の定、バスは遅れて来た。","source":{"platform":"netflix","source_id":"ne-4204","source_title":"雨の待合室","start_sec":1912,"episode":"第 3 集","jump_url":"https://www.netflix.com/watch/ne-4204?t=1912"},"created_at":"2026-11-01T05:12:00+08:00","reading":"あんのじょう"},{"id":"yn_0105","origin":"yoin","lang":"ja","chunk":"お言葉に甘えて","sentence":"では、お言葉に甘えて。","meaning_zh":"那我就不客氣了","meaning_target":"相手の好意を受け入れて","example":"では、お言葉に甘えて。","source":{"platform":"youtube","source_id":"yo-4205","source_title":"京都の台所から","start_sec":903,"jump_url":"https://www.youtube.com/watch?v=yo-4205&t=903"},"created_at":"2026-11-02T06:13:00+08:00","reading":"おことばにあまえて"},{"id":"yn_0106","origin":"yoin","lang":"ja","chunk":"手が届く","sentence":"あと少しで、手が届きそうな朝。","meaning_zh":"搆得著；負擔得起","meaning_target":"自分の力で得られる範囲にある","example":"あと少しで、手が届きそうな朝。","source":{"platform":"lrclib","source_id":"lr-4206","source_title":"夜明けのバス停","start_sec":72},"created_at":"2026-11-01T07:14:00+08:00","reading":"てがとどく"},{"id":"yn_0107","origin":"yoin","lang":"ja","chunk":"息が詰まる","sentence":"この部屋は静かすぎて息が詰まる。","meaning_zh":"喘不過氣、令人窒息","meaning_target":"緊張して苦しく感じる","example":"この部屋は静かすぎて息が詰まる。","source":{"platform":"netflix","source_id":"ne-4207","source_title":"雨の待合室","start_sec":655,"episode":"第 4 集","jump_url":"https://www.netflix.com/watch/ne-4207?t=655"},"created_at":"2026-11-02T08:15:00+08:00","reading":"いきがつまる"},{"id":"yn_0108","origin":"yoin","lang":"ja","chunk":"気をつけて","sentence":"雨だから、気をつけて帰ってね。","meaning_zh":"小心、路上保重","meaning_target":"注意して","example":"雨だから、気をつけて帰ってね。","source":{"platform":"netflix","source_id":"ne-4208","source_title":"雨の待合室","start_sec":1402,"episode":"第 1 集","jump_url":"https://www.netflix.com/watch/ne-4208?t=1402"},"created_at":"2026-11-01T00:10:00+08:00","reading":"きをつけて"},{"id":"yn_0109","origin":"yoin","lang":"en","chunk":"run out of","sentence":"We're about to run out of coffee filters again.","meaning_zh":"用完、耗盡","meaning_target":"to use all of something","example":"We're about to run out of coffee filters again.","source":{"platform":"youtube","source_id":"yo-4209","source_title":"Small Kitchen, Big City","start_sec":252,"jump_url":"https://www.youtube.com/watch?v=yo-4209&t=252"},"created_at":"2026-11-02T01:11:00+08:00"},{"id":"yn_0110","origin":"yoin","lang":"en","chunk":"call it a day","sentence":"It's past midnight. Let's call it a day.","meaning_zh":"今天就到這裡、收工","meaning_target":"to stop working for now","example":"It's past midnight. Let's call it a day.","source":{"platform":"hbomax","source_id":"hb-4210","source_title":"The Last Lantern","start_sec":1865,"episode":"S1 E2","jump_url":"https://play.max.com/video/watch/hb-4210?t=1865"},"created_at":"2026-11-01T02:12:00+08:00"},{"id":"yn_0111","origin":"yoin","lang":"en","chunk":"on the fence","sentence":"I'm still on the fence about taking the job.","meaning_zh":"猶豫不決、還沒決定","meaning_target":"not yet decided","example":"I'm still on the fence about taking the job.","source":{"platform":"netflix","source_id":"ne-4211","source_title":"Harbor Lights","start_sec":767,"episode":"S1 E4","jump_url":"https://www.netflix.com/watch/ne-4211?t=767"},"created_at":"2026-11-02T03:13:00+08:00"},{"id":"yn_0112","origin":"yoin","lang":"en","chunk":"get the hang of","sentence":"You'll get the hang of the knife work by Friday.","meaning_zh":"慢慢上手、抓到訣竅","meaning_target":"to learn how to do something","example":"You'll get the hang of the knife work by Friday.","source":{"platform":"youtube","source_id":"yo-4212","source_title":"Small Kitchen, Big City","start_sec":570,"jump_url":"https://www.youtube.com/watch?v=yo-4212&t=570"},"created_at":"2026-11-01T04:14:00+08:00"},{"id":"yn_0113","origin":"yoin","lang":"en","chunk":"cut corners","sentence":"We never cut corners on the lamp oil.","meaning_zh":"偷工減料、走捷徑","meaning_target":"to do something badly to save time","example":"We never cut corners on the lamp oil.","source":{"platform":"hbomax","source_id":"hb-4213","source_title":"The Last Lantern","start_sec":496,"episode":"S1 E3","jump_url":"https://play.max.com/video/watch/hb-4213?t=496"},"created_at":"2026-11-02T05:15:00+08:00"},{"id":"yn_0114","origin":"yoin","lang":"en","chunk":"under the weather","sentence":"Mara is a bit under the weather, so I took her shift.","meaning_zh":"身體不太舒服","meaning_target":"slightly ill","example":"Mara is a bit under the weather, so I took her shift.","source":{"platform":"netflix","source_id":"ne-4214","source_title":"Harbor Lights","start_sec":1360,"episode":"S1 E5","jump_url":"https://www.netflix.com/watch/ne-4214?t=1360"},"created_at":"2026-11-01T06:10:00+08:00"},{"id":"yn_0115","origin":"yoin","lang":"en","chunk":"a long shot","sentence":"It's a long shot, but the ferry might still be running.","meaning_zh":"機會渺茫的嘗試","meaning_target":"something unlikely to succeed","example":"It's a long shot, but the ferry might still be running.","source":{"platform":"hbomax","source_id":"hb-4215","source_title":"The Last Lantern","start_sec":2698,"episode":"S1 E2","jump_url":"https://play.max.com/video/watch/hb-4215?t=2698"},"created_at":"2026-11-02T07:11:00+08:00"},{"id":"yn_0116","origin":"yoin","lang":"en","chunk":"play it by ear","sentence":"No plan for Sunday. We'll play it by ear.","meaning_zh":"見機行事、到時再說","meaning_target":"to decide as things happen","example":"No plan for Sunday. We'll play it by ear.","source":{"platform":"youtube","source_id":"yo-4216","source_title":"Weekend in Lisbon","start_sec":141,"jump_url":"https://www.youtube.com/watch?v=yo-4216&t=141"},"created_at":"2026-11-01T08:12:00+08:00"},{"id":"yn_0117","origin":"yoin","lang":"en","chunk":"out of the blue","sentence":"You called me out of the blue on a Tuesday night.","meaning_zh":"突然、毫無預警","meaning_target":"unexpectedly","example":"You called me out of the blue on a Tuesday night.","source":{"platform":"lrclib","source_id":"lr-4217","source_title":"Paper Moon Avenue","start_sec":48},"created_at":"2026-11-02T00:13:00+08:00"},{"id":"yn_0118","origin":"yoin","lang":"en","chunk":"back to square one","sentence":"The harbour permit fell through, so we are back to square one.","meaning_zh":"從頭來過","meaning_target":"back to the start","example":"The harbour permit fell through, so we are back to square one.","source":{"platform":"netflix","source_id":"ne-4218","source_title":"Harbor Lights","start_sec":2232,"episode":"S1 E6","jump_url":"https://www.netflix.com/watch/ne-4218?t=2232"},"created_at":"2026-11-01T01:14:00+08:00"},{"id":"yn_0119","origin":"yoin","lang":"en","chunk":"take a rain check","sentence":"Can I take a rain check on dinner? The storm's coming in.","meaning_zh":"改天再約","meaning_target":"to accept an offer for a later time","example":"Can I take a rain check on dinner? The storm's coming in.","source":{"platform":"hbomax","source_id":"hb-4219","source_title":"The Last Lantern","start_sec":933,"episode":"S1 E4","jump_url":"https://play.max.com/video/watch/hb-4219?t=933"},"created_at":"2026-11-02T02:15:00+08:00"},{"id":"yn_0120","origin":"yoin","lang":"en","chunk":"the last straw","sentence":"Losing the boat keys was the last straw.","meaning_zh":"壓垮駱駝的最後一根稻草","meaning_target":"the final problem that makes you give up","example":"Losing the boat keys was the last straw.","source":{"platform":"netflix","source_id":"ne-4220","source_title":"Harbor Lights","start_sec":2409,"episode":"S1 E6","jump_url":"https://www.netflix.com/watch/ne-4220?t=2409"},"created_at":"2026-11-01T03:10:00+08:00"},{"id":"yn_0121","origin":"yoin","lang":"en","chunk":"by the skin of my teeth","sentence":"I made the last train by the skin of my teeth.","meaning_zh":"驚險地、差一點就沒","meaning_target":"only just","example":"I made the last train by the skin of my teeth.","source":{"platform":"youtube","source_id":"yo-4221","source_title":"Night Shift Diaries","start_sec":414,"jump_url":"https://www.youtube.com/watch?v=yo-4221&t=414"},"created_at":"2026-11-02T04:11:00+08:00"},{"id":"yn_0122","origin":"yoin","lang":"en","chunk":"hold your horses","sentence":"Hold your horses. The lantern still needs a wick.","meaning_zh":"等一下、別急","meaning_target":"wait, be patient","example":"Hold your horses. The lantern still needs a wick.","source":{"platform":"hbomax","source_id":"hb-4222","source_title":"The Last Lantern","start_sec":207,"episode":"S1 E1","jump_url":"https://play.max.com/video/watch/hb-4222?t=207"},"created_at":"2026-11-01T05:12:00+08:00"},{"id":"yn_0123","origin":"yoin","lang":"en","chunk":"break the ice","sentence":"He told the fish joke to break the ice.","meaning_zh":"打破沉默、緩和氣氛","meaning_target":"to make people feel relaxed","example":"He told the fish joke to break the ice.","source":{"platform":"netflix","source_id":"ne-4223","source_title":"Harbor Lights","start_sec":318,"episode":"S1 E1","jump_url":"https://www.netflix.com/watch/ne-4223?t=318"},"created_at":"2026-11-02T06:13:00+08:00"},{"id":"yn_0124","origin":"yoin","lang":"en","chunk":"sleep on it","sentence":"Don't answer now. Sleep on it.","meaning_zh":"想一晚再決定","meaning_target":"to decide tomorrow","example":"Don't answer now. Sleep on it.","source":{"platform":"hbomax","source_id":"hb-4224","source_title":"The Last Lantern","start_sec":1544,"episode":"S1 E5","jump_url":"https://play.max.com/video/watch/hb-4224?t=1544"},"created_at":"2026-11-01T07:14:00+08:00"},{"id":"yn_0125","origin":"yoin","lang":"en","chunk":"wrap up","sentence":"Let's wrap up before the tide turns.","meaning_zh":"收尾、結束","meaning_target":"to finish","example":"Let's wrap up before the tide turns.","source":{"platform":"netflix","source_id":"ne-4225","source_title":"Harbor Lights","start_sec":2871,"episode":"S1 E2","jump_url":"https://www.netflix.com/watch/ne-4225?t=2871"},"created_at":"2026-11-02T08:15:00+08:00"},{"id":"yn_0126","origin":"yoin","lang":"ja","chunk":"気がする","sentence":"今日は、あの人に会える気がする。","meaning_zh":"覺得；有……的感覺","meaning_target":"はっきりとはわからないが、そうだと感じる","example":"今日は、あの人に会える気がする。","source":{"platform":"netflix","source_id":"ne-4226","source_title":"雨の待合室","start_sec":198,"episode":"第 1 集","jump_url":"https://www.netflix.com/watch/ne-4226?t=198"},"created_at":"2026-11-01T00:10:00+08:00","reading":"きがする"},{"id":"yn_0127","origin":"yoin","lang":"ja","chunk":"仕方がない","sentence":"終電を逃したなら、仕方がない。","meaning_zh":"沒辦法、只好這樣","meaning_target":"どうすることもできない","example":"終電を逃したなら、仕方がない。","source":{"platform":"netflix","source_id":"ne-4227","source_title":"雨の待合室","start_sec":1124,"episode":"第 2 集","jump_url":"https://www.netflix.com/watch/ne-4227?t=1124"},"created_at":"2026-11-02T01:11:00+08:00","reading":"しかたがない"},{"id":"yn_0128","origin":"yoin","lang":"ja","chunk":"腑に落ちる","sentence":"彼の説明は、どうも腑に落ちない。","meaning_zh":"終於想通、能接受","meaning_target":"納得できる","example":"彼の説明は、どうも腑に落ちない。","source":{"platform":"netflix","source_id":"ne-4228","source_title":"雨の待合室","start_sec":1570,"episode":"第 3 集","jump_url":"https://www.netflix.com/watch/ne-4228?t=1570"},"created_at":"2026-11-01T02:12:00+08:00","reading":"ふにおちる"},{"id":"yn_0129","origin":"yoin","lang":"ja","chunk":"様子を見る","sentence":"熱が下がるまで、少し様子を見よう。","meaning_zh":"先觀察看看","meaning_target":"しばらく状況を見守る","example":"熱が下がるまで、少し様子を見よう。","source":{"platform":"youtube","source_id":"yo-4229","source_title":"京都の台所から","start_sec":455,"jump_url":"https://www.youtube.com/watch?v=yo-4229&t=455"},"created_at":"2026-11-02T03:13:00+08:00","reading":"ようすをみる"},{"id":"yn_0130","origin":"yoin","lang":"ja","chunk":"目が離せない","sentence":"この子猫からは目が離せない。","meaning_zh":"讓人目不轉睛","meaning_target":"注意をそらすことができない","example":"この子猫からは目が離せない。","source":{"platform":"youtube","source_id":"yo-4230","source_title":"東京さんぽ日記","start_sec":347,"jump_url":"https://www.youtube.com/watch?v=yo-4230&t=347"},"created_at":"2026-11-01T04:14:00+08:00","reading":"めがはなせない"},{"id":"yn_0131","origin":"yoin","lang":"ja","chunk":"案の定","sentence":"案の定、バスは遅れて来た。","meaning_zh":"果然、不出所料","meaning_target":"思っていたとおり","example":"案の定、バスは遅れて来た。","source":{"platform":"netflix","source_id":"ne-4231","source_title":"雨の待合室","start_sec":1912,"episode":"第 3 集","jump_url":"https://www.netflix.com/watch/ne-4231?t=1912"},"created_at":"2026-11-02T05:15:00+08:00","reading":"あんのじょう"},{"id":"yn_0132","origin":"yoin","lang":"ja","chunk":"お言葉に甘えて","sentence":"では、お言葉に甘えて。","meaning_zh":"那我就不客氣了","meaning_target":"相手の好意を受け入れて","example":"では、お言葉に甘えて。","source":{"platform":"youtube","source_id":"yo-4232","source_title":"京都の台所から","start_sec":903,"jump_url":"https://www.youtube.com/watch?v=yo-4232&t=903"},"created_at":"2026-11-01T06:10:00+08:00","reading":"おことばにあまえて"},{"id":"yn_0133","origin":"yoin","lang":"ja","chunk":"手が届く","sentence":"あと少しで、手が届きそうな朝。","meaning_zh":"搆得著；負擔得起","meaning_target":"自分の力で得られる範囲にある","example":"あと少しで、手が届きそうな朝。","source":{"platform":"lrclib","source_id":"lr-4233","source_title":"夜明けのバス停","start_sec":72},"created_at":"2026-11-02T07:11:00+08:00","reading":"てがとどく"},{"id":"yn_0134","origin":"yoin","lang":"ja","chunk":"息が詰まる","sentence":"この部屋は静かすぎて息が詰まる。","meaning_zh":"喘不過氣、令人窒息","meaning_target":"緊張して苦しく感じる","example":"この部屋は静かすぎて息が詰まる。","source":{"platform":"netflix","source_id":"ne-4234","source_title":"雨の待合室","start_sec":655,"episode":"第 4 集","jump_url":"https://www.netflix.com/watch/ne-4234?t=655"},"created_at":"2026-11-01T08:12:00+08:00","reading":"いきがつまる"},{"id":"yn_0135","origin":"yoin","lang":"ja","chunk":"気をつけて","sentence":"雨だから、気をつけて帰ってね。","meaning_zh":"小心、路上保重","meaning_target":"注意して","example":"雨だから、気をつけて帰ってね。","source":{"platform":"netflix","source_id":"ne-4235","source_title":"雨の待合室","start_sec":1402,"episode":"第 1 集","jump_url":"https://www.netflix.com/watch/ne-4235?t=1402"},"created_at":"2026-11-02T00:13:00+08:00","reading":"きをつけて"},{"id":"yn_0136","origin":"yoin","lang":"en","chunk":"run out of","sentence":"We're about to run out of coffee filters again.","meaning_zh":"用完、耗盡","meaning_target":"to use all of something","example":"We're about to run out of coffee filters again.","source":{"platform":"youtube","source_id":"yo-4236","source_title":"Small Kitchen, Big City","start_sec":252,"jump_url":"https://www.youtube.com/watch?v=yo-4236&t=252"},"created_at":"2026-11-01T01:14:00+08:00"},{"id":"yn_0137","origin":"yoin","lang":"en","chunk":"call it a day","sentence":"It's past midnight. Let's call it a day.","meaning_zh":"今天就到這裡、收工","meaning_target":"to stop working for now","example":"It's past midnight. Let's call it a day.","source":{"platform":"hbomax","source_id":"hb-4237","source_title":"The Last Lantern","start_sec":1865,"episode":"S1 E2","jump_url":"https://play.max.com/video/watch/hb-4237?t=1865"},"created_at":"2026-11-02T02:15:00+08:00"}];
