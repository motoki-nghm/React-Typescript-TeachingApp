import type { Lesson } from '../types';

export const tsArrayObject: Lesson = {
  id: 'ts-02-array-object',
  chapter: 'ts',
  order: 2,
  title: '配列とオブジェクトの型',
  summary: '複数の値をまとめる「配列」と「オブジェクト」に型をつける。',
  estimatedMinutes: 7,
  body: `
## このレッスンで分かること

- 配列の型 \`number[]\` / \`string[]\`
- オブジェクトの形を表す型
- 配列を回したり、プロパティを取り出すときの安心感

---

### 配列の型

「数字だけが入った配列」と書きたい時は、型のうしろに \`[]\` をつけます。

\`\`\`ts
const scores: number[] = [80, 92, 76];
scores.push(100);   // ✅ OK
scores.push('A+');  // ❌ string は入れられない
\`\`\`

### オブジェクトの型

オブジェクトの中身は **型を一つずつ** 書いていきます。

\`\`\`ts
const user: { name: string; age: number } = {
  name: 'Killua',
  age: 14,
};
\`\`\`

> 💡 後の章で、この \`{ name: string; age: number }\` を \`type\` や \`interface\` という
> 名前で再利用する書き方を学びます。今は **形を直書き** で OK。

---

## 配列に型がつくと何が嬉しい？

エディタが配列の **要素の型を覚えていてくれる** ので、
\`.map()\` の中でも補完が効きます。やってみましょう。
`,
  playground: {
    template: 'vanilla-ts',
    files: [
      {
        path: '/index.ts',
        active: true,
        code: `type User = { name: string; age: number };

const users: User[] = [
  { name: 'Gon', age: 12 },
  { name: 'Killua', age: 14 },
  { name: 'Kurapika', age: 17 },
];

// 配列から名前だけ抜き出す
const names = users.map((u) => u.name);
console.log('names:', names);

// 平均年齢を出す
const total = users.reduce((sum, u) => sum + u.age, 0);
console.log('avg age:', total / users.length);

// ⬇️ ミッション: 18歳以上だけ取り出す配列 \`adults\` を作って表示する
// const adults: User[] = users.filter(...);
// console.log('adults:', adults);
`,
      },
    ],
  },
  mission: {
    title: '18歳以上のユーザーだけを残す',
    checks: [
      '`users.filter` を使って `adults: User[]` を作る',
      '`console.log` で結果を確認する',
      'コールバック内の `u` にカーソルを置くと型が表示されることを観察する',
    ],
    hint: '`users.filter((u) => u.age >= 18)` で OK。型は推論されるので明示しなくても動く。',
  },
};
