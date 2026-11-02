// Ferdinand r1 fixtures. Invented TOEIC-style content; no copied test items.
// Yoin source fields (platform/title/episode/time/jump) are provisional, pending Owen YN3.
const ruby = (t, r) => `<ruby>${t}<rt>${r}</rt></ruby>`;
const kiga = `${ruby('気', 'き')}がする`;

export const fixtures = {
  user: 'demo',
  today: '2026-11-01',
  todayLong: '11 月 1 日，星期日',
  decks: [
    { id: 'l600', name: 'TOEIC::Vocabulary::L600', leaf: 'L600', path: 'TOEIC / Vocabulary', n: 10, l: 2, r: 34, total: 162 },
    { id: 'l730', name: 'TOEIC::Vocabulary::L730', leaf: 'L730', path: 'TOEIC / Vocabulary', n: 10, l: 0, r: 18, total: 143 },
    { id: 'cloze', name: 'TOEIC Cloze', leaf: 'TOEIC Cloze', path: 'Cloze-Deep 填空', n: 5, l: 1, r: 12, total: 100 },
    { id: 'sesame', name: 'Sesame', leaf: 'Sesame', path: 'Concept-Deep', n: 0, l: 0, r: 6, total: 32 },
    { id: 'yoin', name: 'Yoin · 影集語塊', leaf: 'Yoin · 影集語塊', path: '從余韻收集的語塊', n: 3, l: 0, r: 4, total: 18 },
  ],
  totals: { n: 28, l: 3, r: 74, due: 105, minutes: 18 },
  session: { done: 12, total: 42, timer: '04:31' },
  ratings: [['Again', '重來', '1 分', 1], ['Hard', '吃力', '6 分', 2], ['Good', '記得', '1 天', 3], ['Easy', '熟悉', '4 天', 4]],
  cards: {
    allocate: {
      notetype: 'Concept-Deep', deck: 'l600',
      Front: 'allocate', pos: '(v.)', ipa: 'ˈæləkeɪt', Back: '分配、撥給；劃撥',
      Why: 'ad-（朝向）+ locare（放置）— 把資源「放到」指定的位置。',
      Example: 'The finance team will <mark>allocate</mark> an additional budget to the Osaka branch once the quarterly figures are confirmed.',
      Contrast: 'allocate 多指把資金、時間、空間依用途分配出去；assign 多指把任務或職位派給某人。',
      Mnemonic: 'al-LOCATE：先找到位置（locate），再把錢放進每個位置。',
      Source: 'TOEIC vocabulary level 600 — finance',
      Image: { file: 'allocate.jpg', src: '../assets/illus-allocate.jpg' },
      ReverseEnabled: true, due: '11-01', ivl: '9 天', tags: ['finance'],
    },
    tentative: {
      notetype: 'Concept-Deep', deck: 'l730',
      Front: 'tentative', pos: '(adj.)', ipa: 'ˈtɛntətɪv', Back: '暫定的；試探性的',
      Why: '源自拉丁語 tentare（試探、嘗試）— 先試著定下，仍可再改。',
      Example: 'We have a <mark>tentative</mark> agreement with the supplier, but the delivery dates still need approval from the regional manager.',
      Contrast: 'tentative 是「先暫定、之後可能改」；provisional 偏「正式決定前的臨時安排」，常用於合約與名單。',
      Mnemonic: 'tent（帳篷）：先搭帳篷暫住，房子還沒蓋好。',
      Source: 'TOEIC vocabulary level 730 — scheduling',
      Image: null, ReverseEnabled: true, due: '11-03', ivl: '14 天', tags: ['scheduling'],
    },
    itinerary: {
      notetype: 'Concept-Deep', deck: 'l600',
      Front: 'itinerary', pos: '(n.)', ipa: 'aɪˈtɪnəˌrɛri', Back: '行程表；旅行路線',
      Why: '源自拉丁語 iter（路、旅程）— 記下一路要走的地方。',
      Example: 'Please send the revised <mark>itinerary</mark> to all participants before Friday so they can book their hotel rooms.',
      Contrast: 'itinerary 是一趟旅行的路線與時間表；schedule 泛指任何時間安排，不限旅行。',
      Mnemonic: 'I-tine-rary：我（I）把每一站像叉子尖（tine）一樣標在地圖上。',
      Source: 'TOEIC vocabulary level 600 — travel',
      Image: { file: 'itinerary.jpg', src: '../assets/illus-itinerary.jpg' },
      ReverseEnabled: true, due: '11-02', ivl: '21 天', tags: ['travel'],
    },
    submit: {
      notetype: 'Cloze-Deep', deck: 'cloze',
      Text: 'All employees must {{c1::submit}} their expense reports by the last business day of the month.',
      before: 'All employees must ', answer: 'submit', after: ' their expense reports by the last business day of the month.',
      Why: 'submit = sub-（在下方）+ mittere（送出）— 從下往上「呈交」給主管。',
      Example: 'Late reports will be <mark>submitted</mark> to the next payroll cycle.',
      Source: 'TOEIC cloze set 02 — office',
      due: '11-01', ivl: '3 天', tags: ['office'],
    },
    kigasuru: {
      notetype: 'Yoin', deck: 'yoin', lang: 'ja',
      chunk: kiga, plain: '気がする',
      sentence: `${ruby('今日', 'きょう')}は、あの${ruby('人', 'ひと')}に${ruby('会', 'あ')}える<mark>${kiga}</mark>。`,
      meaningZh: '覺得；有……的感覺。用來表達主觀感受或不確定的預感。',
      meaningTarget: `はっきりとはわからないが、そうだと${ruby('感', 'かん')}じる。`,
      example: `この${ruby('道', 'みち')}は、${ruby('前', 'まえ')}にも${ruby('歩', 'ある')}いた<mark>${kiga}</mark>。`,
      source: { platform: 'Netflix', title: '雨の待合室', episode: '第 1 集', time: '03:18', jump: 'https://www.netflix.com/watch/fixture?t=198' },
      due: '11-01', ivl: '2 天', tags: ['yoin'],
    },
  },
  browse: {
    query: 'note:Concept-Deep', count: 305,
    rows: ['allocate', 'itinerary', 'tentative', 'submit', 'kigasuru'],
    extra: [
      { term: 'reimburse', gloss: '(v.) 償還、核銷（費用）', deck: 'L730', type: 'Concept-Deep', due: '11-04', ivl: '6 天' },
      { term: 'commence', gloss: '(v.) 開始、著手', deck: 'L730', type: 'Concept-Deep', due: '11-06', ivl: '30 天', suspended: true },
    ],
  },
  stats: {
    retention: 89.4, target: 90,
    byDeck: [['L600', 91.2], ['L730', 86.5], ['TOEIC Cloze', 88.0], ['Sesame', 93.1], ['Yoin · 影集語塊', 84.0]],
    streak: 23, longest: 41, avg: 82, // avg = sum(reviews)/30 = 2455/30
    range: '2026-10-03 至 11-01',
    forecast: [105, 46, 52, 61, 38, 44, 70, 57, 33, 48, 64, 41, 29, 55, 72, 36, 40, 58, 47, 31, 66, 50, 35, 43, 69, 39, 28, 54, 45, 37],
    reviews: [74, 92, 81, 58, 66, 104, 0, 97, 79, 71, 112, 90, 84, 68, 95, 101, 77, 83, 99, 86, 72, 108, 93, 80, 76, 89, 96, 82, 91, 51],
  },
};
