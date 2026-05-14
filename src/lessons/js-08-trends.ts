import type { Lesson } from '../types';

export const jsTrends: Lesson = {
  id: 'js-08-trends',
  chapter: 'js',
  order: 8,
  title: '2024〜2026 トレンド — 最新 JS で書き直す',
  summary: '`Object.groupBy` / Set methods / `Promise.withResolvers` / `structuredClone` / Iterator helpers。',
  estimatedMinutes: 11,
  body: `
## このレッスンで分かること

直近の ECMAScript (ES2023〜ES2025) で **標準入り** した便利機能たち。
モダンブラウザと Node.js 20 以降では、もう普通に使えます。

---

### 1. \`Object.groupBy\` / \`Map.groupBy\` (ES2024)

配列をキーごとにまとめる、もう自作しなくていい。

\`\`\`js
const people = [
  { name: 'Gon', team: 'hunter' },
  { name: 'Hisoka', team: 'phantom' },
  { name: 'Killua', team: 'hunter' },
];

const byTeam = Object.groupBy(people, p => p.team);
// → { hunter: [Gon, Killua], phantom: [Hisoka] }
\`\`\`

### 2. Set methods (ES2025)

集合演算がメソッドで書ける。

\`\`\`js
const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5, 6]);

a.intersection(b);   // Set {3, 4}    (積集合)
a.union(b);          // Set {1,2,3,4,5,6}
a.difference(b);     // Set {1, 2}    (a だけにある)
a.symmetricDifference(b); // Set {1, 2, 5, 6}
a.isSubsetOf(b);     // false
\`\`\`

### 3. \`Promise.withResolvers\` (ES2024)

外から resolve/reject したい Promise を1行で作れる。

\`\`\`js
const { promise, resolve, reject } = Promise.withResolvers();

// 別の場所から
setTimeout(() => resolve('done!'), 1000);

await promise;   // 'done!'
\`\`\`

イベント駆動の場合に、Promise でラップするのが格段に楽になりました。

### 4. \`structuredClone\` (ES2022 / 標準ブラウザAPI)

**Date・Map・Set も含めた深いコピー** が1行で。
\`JSON.parse(JSON.stringify(x))\` は卒業しよう。

\`\`\`js
const copy = structuredClone(original);
\`\`\`

### 5. Iterator helpers (ES2025)

イテレーターに直接 \`.map\` / \`.filter\` / \`.take\` などが生えました。
**遅延評価** なので、無限シーケンスも扱える。

\`\`\`js
function* naturals() {
  let n = 1;
  while (true) yield n++;
}

const result = naturals()
  .filter(n => n % 2 === 0)   // 偶数だけ
  .map(n => n * n)             // 二乗
  .take(5)                     // 5個取る
  .toArray();
// → [4, 16, 36, 64, 100]
\`\`\`

> 💡 \`.toArray()\` を呼ぶまで何も実行されません。これが **遅延評価** の旨み。

---

### おまけ: \`Array.prototype.toSorted\` / \`toReversed\` / \`toSpliced\` (ES2023)

「**元の配列を壊さない**」非破壊バージョン。React 時代の必需品。

\`\`\`js
const sorted = arr.toSorted();      // 元の arr は無傷
const reversed = arr.toReversed();
\`\`\`
`,
  playground: {
    template: 'vanilla',
    files: [
      {
        path: '/index.js',
        active: true,
        code: `// === 1. Object.groupBy ===
const people = [
  { name: 'Gon', team: 'hunter' },
  { name: 'Hisoka', team: 'phantom' },
  { name: 'Killua', team: 'hunter' },
  { name: 'Chrollo', team: 'phantom' },
];
const byTeam = Object.groupBy(people, p => p.team);
console.log('groupBy:', byTeam);

// === 2. Set methods ===
const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5, 6]);
console.log('∩:', [...a.intersection(b)]);
console.log('∪:', [...a.union(b)]);
console.log('a-b:', [...a.difference(b)]);

// === 3. Promise.withResolvers ===
async function delayedHello() {
  const { promise, resolve } = Promise.withResolvers();
  setTimeout(() => resolve('👋 from withResolvers'), 300);
  const msg = await promise;
  console.log(msg);
}
delayedHello();

// === 4. structuredClone ===
const original = {
  name: 'Gon',
  tags: new Set(['hunter', 'rookie']),
  meta: { createdAt: new Date() },
};
const copy = structuredClone(original);
copy.name = 'Killua';
copy.tags.add('skater');
console.log('original.name:', original.name);   // 'Gon' (無傷)
console.log('copy.name:', copy.name);            // 'Killua'

// === 5. Iterator helpers ===
function* naturals() {
  let n = 1;
  while (true) yield n++;
}
const top5Squares = naturals()
  .filter(n => n % 2 === 0)
  .map(n => n * n)
  .take(5)
  .toArray();
console.log('first 5 even squares:', top5Squares);

// === おまけ: toSorted / toReversed ===
const nums = [3, 1, 4, 1, 5, 9, 2, 6];
console.log('toSorted:', nums.toSorted((x, y) => x - y));
console.log('original:', nums);   // 元は無傷

// ⬇️ ミッション:
// 商品配列を category で groupBy し、各カテゴリの平均価格を表示する
const products = [
  { name: 'りんご', category: 'fruit', price: 200 },
  { name: 'バナナ', category: 'fruit', price: 100 },
  { name: '牛乳',   category: 'dairy', price: 250 },
  { name: 'チーズ', category: 'dairy', price: 600 },
  { name: 'パン',   category: 'bakery', price: 180 },
];

// ここに実装してください
`,
      },
    ],
  },
  mission: {
    title: 'groupBy で集計し、カテゴリごとの平均価格を出す',
    checks: [
      '`Object.groupBy(products, p => p.category)` で分類',
      '各カテゴリ配列に対して `reduce` で合計、長さで割って平均を求める',
      '結果を `{ fruit: 150, dairy: 425, bakery: 180 }` のような形で表示',
    ],
    hint: '`Object.fromEntries(Object.entries(grouped).map(([k, arr]) => [k, arr.reduce((s, p) => s + p.price, 0) / arr.length]))`',
  },
};
