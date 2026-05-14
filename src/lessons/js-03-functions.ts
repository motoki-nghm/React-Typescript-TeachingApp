import type { Lesson } from '../types';

export const jsFunctions: Lesson = {
  id: 'js-03-functions',
  chapter: 'js',
  order: 3,
  title: '関数 — アロー関数とデフォルト引数',
  summary: '`function` 宣言とアロー関数、レスト/スプレッド、第一級関数の考え方。',
  estimatedMinutes: 8,
  body: `
## このレッスンで分かること

- \`function\` 宣言 と **アロー関数** の使い分け
- デフォルト引数とレスト引数 \`...args\`
- 関数も値として扱える（**第一級関数**）

---

### 3つの書き方

\`\`\`js
// ① function 宣言（巻き上げあり）
function add(a, b) { return a + b; }

// ② 関数式
const sub = function (a, b) { return a - b; };

// ③ アロー関数（現代のデフォルト）
const mul = (a, b) => a * b;
\`\`\`

アロー関数は **短く書ける** + **\`this\` を周囲から引き継ぐ** という特徴があります。
コールバックでは特に重宝します。

### デフォルト引数

\`\`\`js
const greet = (name, lang = 'ja') => {
  if (lang === 'en') return \`Hello, \${name}!\`;
  return \`こんにちは \${name} さん\`;
};

greet('Gon');        // → 'こんにちは Gon さん'
greet('Gon', 'en');  // → 'Hello, Gon!'
\`\`\`

### レスト引数

「何個でも受け取る」関数を作れます。

\`\`\`js
const sum = (...nums) => nums.reduce((a, b) => a + b, 0);

sum(1, 2, 3);          // → 6
sum(1, 2, 3, 4, 5);    // → 15
\`\`\`

### 関数は「値」

\`\`\`js
const ops = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
};

const result = ops.add(10, 5);  // 関数を取り出して呼ぶ
\`\`\`

> 💡 関数を引数に渡したり、配列に入れたり、戻り値にしたりできる。
> これが **第一級関数 (first-class function)**。React の \`onClick\` も
> 「関数を渡している」だけ。
`,
  playground: {
    template: 'vanilla',
    files: [
      {
        path: '/index.js',
        active: true,
        code: `// ① function 宣言
function add(a, b) {
  return a + b;
}

// ② アロー関数（短い書き方）
const mul = (a, b) => a * b;

// 引数が1つならカッコも省ける
const double = x => x * 2;

// 戻り値が式1つならブロックも return も省ける
const square = x => x * x;

console.log(add(2, 3));       // 5
console.log(mul(4, 5));       // 20
console.log(double(7));       // 14
console.log(square(6));       // 36

// デフォルト引数
const greet = (name, emoji = '👋') => \`\${emoji} こんにちは \${name}\`;
console.log(greet('Gon'));
console.log(greet('Killua', '⚡'));

// レスト引数（可変長）
const sum = (...nums) => nums.reduce((a, b) => a + b, 0);
console.log(sum(1, 2, 3, 4, 5));

// ⬇️ ミッション:
// 1) max(...nums) を作る (Math.max(...nums) を使ってよい)
// 2) avg(...nums) を作って平均を返す (空配列なら 0 を返す)
// 3) 自分の好きなオペレーションを ops オブジェクトに足して呼ぶ
`,
      },
    ],
  },
  mission: {
    title: '可変長引数の `max` と `avg` を実装する',
    checks: [
      'レスト引数 `(...nums)` を使う',
      '`max` は最大値を返す（`Math.max(...nums)` で OK）',
      '`avg` は平均を返す、空配列なら 0 を返す',
      'アロー関数の短い書き方を試す',
    ],
    hint: '`const avg = (...nums) => nums.length === 0 ? 0 : nums.reduce((a, b) => a + b, 0) / nums.length;`',
  },
};
