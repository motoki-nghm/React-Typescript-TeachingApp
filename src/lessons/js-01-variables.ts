import type { Lesson } from '../types';

export const jsVariables: Lesson = {
  id: 'js-01-variables',
  chapter: 'js',
  order: 1,
  title: '変数とスコープ — `let` / `const` / `var`',
  summary: '3つの宣言キーワードの違いと、なぜ `const` を最初に選ぶのか。',
  estimatedMinutes: 7,
  body: `
## このレッスンで分かること

- \`var\` / \`let\` / \`const\` の違い
- **ブロックスコープ** と **巻き上げ (hoisting)** の感覚
- 「迷ったら \`const\`」という現代のデフォルト

---

### 3つの宣言

\`\`\`js
const PI = 3.14;     // 再代入不可
let count = 0;       // 再代入可
var legacy = 'old';  // 古い書き方。原則使わない
\`\`\`

\`const\` で宣言した変数を再代入しようとすると、エラーになります。
**「あとから書き換えない値」は \`const\`** を使うのが基本です。

### ブロックスコープ

\`let\` と \`const\` は **\`{}\` の中だけで生きる** ルール（ブロックスコープ）。
\`var\` は関数全体に染み出します。

\`\`\`js
{
  let inner = 1;
  const constant = 2;
}
// inner も constant もこの外からは見えない
\`\`\`

> 💡 **モダン JS の鉄則**: まず \`const\`、変更が必要になったら \`let\` に直す。
> \`var\` は新規コードでは使わない。

---

## 配列・オブジェクトの \`const\` は「中身」までは固定しない

\`const\` は **参照** を変えられないだけで、中身は変更できます。

\`\`\`js
const arr = [1, 2, 3];
arr.push(4);          // ✅ OK (中身を足す)
arr = [9, 9, 9];      // ❌ NG (参照を変えようとしている)
\`\`\`
`,
  playground: {
    template: 'vanilla',
    files: [
      {
        path: '/index.js',
        active: true,
        code: `// const は再代入できない
const name = 'Gon';
console.log('name:', name);

// let は再代入できる
let score = 0;
score = score + 10;
console.log('score:', score);

// const の配列は中身を変えられる
const items = ['apple', 'banana'];
items.push('cherry');
console.log('items:', items);

// ⬇️ ミッション:
// 1) const で円周率 PI を定義し、半径 5 の円の面積を計算して表示
// 2) わざと PI に再代入してみて、エラーになることを観察
// 3) let で counter を 0 から 3 まで増やしながら表示
`,
      },
    ],
  },
  mission: {
    title: '`const` と `let` を使い分けて、円の面積とカウンターを実装する',
    checks: [
      '`const PI = 3.14159` を宣言する',
      '`半径 × 半径 × PI` で面積を表示する',
      '`let counter` を 0 から 3 までインクリメントして表示する',
      'わざと `PI = 3.14` と書いてみて、エラーの内容を読む',
    ],
    hint: '`const PI = 3.14159; const r = 5; console.log(r * r * PI);` のように書く。',
  },
};
