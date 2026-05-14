import type { Lesson } from '../types';

export const jsPrimitives: Lesson = {
  id: 'js-02-primitives',
  chapter: 'js',
  order: 2,
  title: 'プリミティブ型と truthy / falsy',
  summary: 'JS の値の種類と、`if` で「真っぽい」と判定されるものたち。',
  estimatedMinutes: 6,
  body: `
## このレッスンで分かること

- JS の **プリミティブ7種** (string, number, boolean, null, undefined, bigint, symbol)
- **truthy** / **falsy** の感覚
- \`==\` と \`===\` の違い（最重要！）

---

### プリミティブ型

| 型 | 例 |
| --- | --- |
| string | \`'hello'\`, \`\\\`world\\\`\` |
| number | \`42\`, \`3.14\`, \`NaN\`, \`Infinity\` |
| boolean | \`true\`, \`false\` |
| null | \`null\` (意図的な「無し」) |
| undefined | \`undefined\` (未定義 / 未代入) |
| bigint | \`9007199254740993n\` |
| symbol | \`Symbol('id')\` |

\`typeof\` 演算子で型名を取り出せます。

\`\`\`js
typeof 'hi';        // 'string'
typeof 42;          // 'number'
typeof null;        // 'object' (歴史的バグ。仕様で残されている)
\`\`\`

### falsy な値（覚える価値あり）

\`if\` 文や \`Boolean(x)\` で **false 扱いされる** のはこの7つだけ:

\`\`\`
false, 0, -0, 0n, '', null, undefined, NaN
\`\`\`

それ以外は **全部 truthy**。\`'0'\` (文字列のゼロ) も \`'false'\` も \`[]\` も \`{}\` も truthy です。

### \`==\` vs \`===\`

\`==\` は型を勝手に変換して比較するので、直感に反する結果になります。
**現代 JS では \`===\` を使うのが鉄則**。

\`\`\`js
0 == '';       // true  😱
0 == '0';      // true  😱
null == undefined; // true (これは仕様)

0 === '';      // false (期待通り)
0 === 0;       // true
\`\`\`
`,
  playground: {
    template: 'vanilla',
    files: [
      {
        path: '/index.js',
        active: true,
        code: `// typeof で型を調べる
console.log(typeof 'hello');       // 'string'
console.log(typeof 42);            // 'number'
console.log(typeof true);          // 'boolean'
console.log(typeof undefined);     // 'undefined'
console.log(typeof null);          // 'object' (歴史的バグ)

// falsy な値を Boolean() で確認
console.log(Boolean(0));           // false
console.log(Boolean(''));          // false
console.log(Boolean(null));        // false
console.log(Boolean(undefined));   // false
console.log(Boolean(NaN));         // false

// truthy（見落としやすい）
console.log(Boolean('0'));         // true (文字列の '0')
console.log(Boolean([]));          // true (空配列)
console.log(Boolean({}));          // true (空オブジェクト)

// === で安全に比較
console.log(0 == '');              // true 😱
console.log(0 === '');             // false ✅

// ⬇️ ミッション:
// 1) 自分の年齢を const で定義する
// 2) if (age) で truthy 判定し、'OK' か 'NG' を表示する
// 3) 0歳を入れたら 'NG' になることを確認 (0 は falsy)
// 4) age >= 18 で大人 / 子供 を判定する
`,
      },
    ],
  },
  mission: {
    title: '年齢の truthy 判定 + 大人/子供チェック',
    checks: [
      '`const age = ...` で年齢を定義する',
      '`if (age)` を使って truthy/falsy を判定して表示',
      '`age >= 18` で大人 / 子供 を分岐して表示',
      '`==` ではなく `===` を使って比較する',
    ],
    hint: '`if (age >= 18) console.log("大人"); else console.log("子供");`',
  },
};
