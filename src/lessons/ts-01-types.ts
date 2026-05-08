import type { Lesson } from '../types';

export const tsTypes: Lesson = {
  id: 'ts-01-types',
  chapter: 'ts',
  order: 1,
  title: '型って何？ — number, string, boolean',
  summary: 'JavaScript に「型」が加わると何が嬉しいのかを体験する。',
  estimatedMinutes: 6,
  body: `
## このレッスンで分かること

- TypeScript で **変数に型を書く** とどうなるのか
- 型を間違えたときに、エディタが何を教えてくれるのか
- \`number\` / \`string\` / \`boolean\` の使い分け

---

JavaScript はとても自由な言語で、変数にどんな値でも入れられます。
便利な反面、「数字だと思っていた変数に文字列が入っていた」というバグが
**実行してみるまで気付けない** のが弱点です。

TypeScript はその変数に「これは数字だけが入る」「これは文字列だけ」と
**型を書いておく** ことで、実行する前にエディタが間違いを教えてくれます。

\`\`\`ts
let age: number = 30;
age = 'thirty'; // ❌ Type 'string' is not assignable to type 'number'.
\`\`\`

> 💡 **読み方**: \`変数名: 型名\` で「この変数の中身は **この型** だよ」と宣言します。

---

## 主要な3つの型

| 型 | 入る値の例 | こんな時に使う |
| -- | --------- | -------------- |
| \`number\` | \`0\`, \`42\`, \`3.14\` | 数値・カウント・金額 |
| \`string\` | \`'hello'\`, \`\\\`hi\\\`\` | 名前・メッセージ・URL |
| \`boolean\` | \`true\`, \`false\` | フラグ・ON/OFF |

> 🧪 **やってみよう**: 右側のエディタの \`name\` を \`123\` に書き換えてみてください。
> 赤い波線で「型が合わない」と教えてくれます。
`,
  playground: {
    template: 'vanilla-ts',
    files: [
      {
        path: '/index.ts',
        active: true,
        code: `// この3つの変数に型がついています。
// 数字・文字列・真偽値、それぞれの型を覗いてみよう。

let age: number = 28;
let name: string = 'Hisoka';
let isAlive: boolean = true;

console.log(\`name: \${name}\`);
console.log(\`age:  \${age}\`);
console.log(\`isAlive: \${isAlive}\`);

// ⬇️ ミッション: 下の TODO を埋めて実行してみよう。
// const myFavoriteNumber: ??? = ???;
// console.log('my favorite:', myFavoriteNumber);
`,
      },
    ],
    hint: '右の「コンソール」タブに console.log の結果が出ます。',
  },
  mission: {
    title: '自分の好きな数字を型付きで定義しよう',
    checks: [
      '`myFavoriteNumber` という変数を `number` 型で宣言する',
      '`console.log` で出力する',
      '一度わざと文字列を代入して、エディタが赤波線で警告するのを観察する',
    ],
    hint: '`const myFavoriteNumber: number = 7;` のように書く。`= "seven"` にすると怒られる。',
  },
};
