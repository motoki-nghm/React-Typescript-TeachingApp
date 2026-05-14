import type { Lesson } from '../types';

export const jsArrayMethods: Lesson = {
  id: 'js-05-array-methods',
  chapter: 'js',
  order: 5,
  title: '配列メソッド — map / filter / reduce',
  summary: 'for ループから卒業するための三種の神器。',
  estimatedMinutes: 9,
  body: `
## このレッスンで分かること

- \`map\` / \`filter\` / \`reduce\` の使い分け
- メソッドチェーンで「データを流れるように加工する」感覚
- **イミュータブル** な書き方（元の配列を壊さない）

---

### map — 全要素を変換

\`\`\`js
const nums = [1, 2, 3, 4];
const doubled = nums.map(n => n * 2);
// → [2, 4, 6, 8]
\`\`\`

\`map\` は **必ず元と同じ長さ** の配列を返します。
「全部にこれを掛けた／変換した結果」が欲しい時に。

### filter — 条件で絞り込む

\`\`\`js
const evens = nums.filter(n => n % 2 === 0);
// → [2, 4]
\`\`\`

コールバックが \`true\` を返した要素だけ残ります。

### reduce — 1つの値にまとめる

\`\`\`js
const total = nums.reduce((sum, n) => sum + n, 0);
// → 10
\`\`\`

最も強力で、最初は読みづらい関数。
\`(累積値, 現在の要素) => 次の累積値\` を返し、最後に最終的な累積値が出ます。

**第2引数の初期値 (\`0\`)** を渡すのが安全。空配列に初期値なしで使うとエラーになります。

---

### チェーンが本領

\`\`\`js
const result = users
  .filter(u => u.active)        // アクティブな人だけ
  .map(u => u.name.toUpperCase()) // 名前を大文字に
  .sort();                       // 並び替え
\`\`\`

> 💡 \`map\` / \`filter\` は **新しい配列** を返すので、元の \`users\` は無傷。
> このイミュータブルな書き方が React 時代の標準です。

### よく使う仲間たち

| メソッド | 何を返す |
| -------- | -------- |
| \`find\` | 最初に条件を満たす要素 (なければ \`undefined\`) |
| \`some\` | 1つでも条件を満たすか (boolean) |
| \`every\` | 全部が条件を満たすか (boolean) |
| \`includes\` | この値を含むか (boolean) |
| \`flat\` / \`flatMap\` | 配列をフラットにする |
`,
  playground: {
    template: 'vanilla',
    files: [
      {
        path: '/index.js',
        active: true,
        code: `const products = [
  { name: 'りんご', price: 200, inStock: true },
  { name: 'バナナ', price: 100, inStock: true },
  { name: 'メロン', price: 1500, inStock: false },
  { name: 'いちご', price: 600, inStock: true },
];

// map: 値段だけの配列を作る
const prices = products.map(p => p.price);
console.log('prices:', prices);

// filter: 在庫ありだけ
const available = products.filter(p => p.inStock);
console.log('available count:', available.length);

// reduce: 在庫ありの合計金額
const total = products
  .filter(p => p.inStock)
  .reduce((sum, p) => sum + p.price, 0);
console.log('total:', total);

// find: 名前で1件取得
const found = products.find(p => p.name === 'バナナ');
console.log('found:', found);

// some / every
console.log('安いのある？', products.some(p => p.price < 200));
console.log('全部在庫あり？', products.every(p => p.inStock));

// ⬇️ ミッション:
// 1) 在庫あり商品の「名前だけ」の配列を作って表示する
// 2) 500円以下の商品の「平均価格」を出す（reduce）
// 3) 全商品名を ', ' で連結した文字列を作る（reduce か join）
`,
      },
    ],
  },
  mission: {
    title: 'チェーンを駆使して3つのデータ加工を作る',
    checks: [
      '`filter` + `map` で在庫あり商品の名前配列を作る',
      '`filter` + `reduce` で 500円以下の平均価格を出す',
      '`map` + `join(", ")` で名前一覧の文字列を作る',
      '元の `products` 配列を書き換えていないことを確認する（イミュータブル）',
    ],
    hint: '`products.filter(p => p.price <= 500).reduce((s, p) => s + p.price, 0) / count` のように、平均は「合計 / 件数」。',
  },
};
