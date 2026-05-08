import type { Lesson } from '../types';

export const tsFunctions: Lesson = {
  id: 'ts-03-functions',
  chapter: 'ts',
  order: 3,
  title: '関数に型をつける',
  summary: '引数と戻り値に型をつけて、誤った使い方を防ぐ。',
  estimatedMinutes: 7,
  body: `
## このレッスンで分かること

- 関数の **引数** と **戻り値** に型をつける書き方
- 戻り値の型は **省略しても推論される** こと
- アロー関数での書き方

---

### 引数と戻り値に型をつける

\`\`\`ts
function add(a: number, b: number): number {
  return a + b;
}

add(1, 2);        // ✅ 3
add(1, '2');      // ❌ string は渡せない
add(1);           // ❌ b が足りない
\`\`\`

引数の右側 \`(a: number, b: number)\` で **入力の型**、
\`):\` の右側 \`number\` で **戻り値の型** を書きます。

> 💡 戻り値の型は **省略可** です。実際は \`function add(a: number, b: number) { return a + b; }\`
> のように書いて、TypeScript に推論させることが多いです。
> 省略する／しないの判断は「**外から見える契約として明示したいか**」で決めます。

### アロー関数

\`\`\`ts
const greet = (name: string): string => \`Hello, \${name}!\`;
\`\`\`

書き方が違うだけで、考え方は同じ。

---

## オプション引数とデフォルト値

| 書き方 | 意味 |
| ------ | ---- |
| \`x: number\` | 必須 |
| \`x?: number\` | 省略可 (\`undefined\` になる) |
| \`x: number = 0\` | 省略時は \`0\` |
`,
  playground: {
    template: 'vanilla-ts',
    files: [
      {
        path: '/index.ts',
        active: true,
        code: `// 関数の型を読んでみよう。
function add(a: number, b: number): number {
  return a + b;
}

console.log('1 + 2 =', add(1, 2));

// アロー関数版
const greet = (name: string, excited?: boolean): string =>
  excited ? \`HELLO, \${name.toUpperCase()}!!\` : \`Hello, \${name}.\`;

console.log(greet('Gon'));
console.log(greet('Killua', true));

// ⬇️ ミッション:
// 1) 数字の配列を受け取って合計を返す \`sum\` を作る
// 2) 配列が空なら 0 を返すこと
// const sum = (nums: ???): ??? => { ... }
// console.log('sum:', sum([1, 2, 3, 4]));
`,
      },
    ],
  },
  mission: {
    title: '数値配列の合計を返す `sum` 関数を書く',
    checks: [
      '引数 `nums: number[]`、戻り値 `number` で関数を書く',
      '空配列を渡したら `0` が返ることを確認する',
      'アロー関数でも `function` 宣言でも好きな方で OK',
    ],
    hint: '`const sum = (nums: number[]): number => nums.reduce((a, b) => a + b, 0);`',
  },
};
