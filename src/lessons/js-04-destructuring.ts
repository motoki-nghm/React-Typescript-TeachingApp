import type { Lesson } from '../types';

export const jsDestructuring: Lesson = {
  id: 'js-04-destructuring',
  chapter: 'js',
  order: 4,
  title: '分割代入とスプレッド構文',
  summary: 'モダン JS で一番使う「ばらして取り出す／ばらまく」記法。',
  estimatedMinutes: 7,
  body: `
## このレッスンで分かること

- 配列・オブジェクトの **分割代入**
- スプレッド構文 \`...\` で **コピー** や **結合**
- React のコードで毎日見る記法たち

---

### オブジェクトの分割代入

\`\`\`js
const user = { name: 'Gon', age: 12, role: 'hunter' };

// 1個ずつ取り出す
const { name, age } = user;
console.log(name, age);   // 'Gon' 12

// 別名で受ける
const { name: userName } = user;

// デフォルト値も書ける
const { lang = 'ja' } = user;
\`\`\`

### 配列の分割代入

\`\`\`js
const arr = [10, 20, 30];
const [first, second, third] = arr;

// 飛ばすこともできる
const [, , last] = arr;

// 残りをまとめて
const [head, ...rest] = arr;   // head=10, rest=[20, 30]
\`\`\`

### スプレッド構文 \`...\`

\`\`\`js
// 配列のコピー (浅いコピー)
const copy = [...arr];

// 配列の結合
const merged = [...arr1, ...arr2];

// オブジェクトのコピー + 上書き
const updated = { ...user, age: 13 };
\`\`\`

> 💡 **React で頻出**: state の更新で「元の値はそのままに一部だけ変えたコピー」を作る。
> \`setUser(prev => ({ ...prev, age: prev.age + 1 }))\` のように書きます。

---

### 関数引数での分割代入

これも超頻出パターン。

\`\`\`js
function describe({ name, age }) {
  return \`\${name} (\${age}歳)\`;
}

describe({ name: 'Gon', age: 12 });   // → 'Gon (12歳)'
\`\`\`

React コンポーネントの props を受け取る時、ほぼこの書き方になります。
`,
  playground: {
    template: 'vanilla',
    files: [
      {
        path: '/index.js',
        active: true,
        code: `const user = {
  name: 'Killua',
  age: 14,
  hobbies: ['暗殺', 'スケボー', 'チョコ'],
};

// オブジェクトを分解
const { name, hobbies } = user;
console.log(name, hobbies);

// 別名 + デフォルト値
const { age: years = 0, lang = 'ja' } = user;
console.log(years, lang);

// 配列を分解
const [first, ...others] = hobbies;
console.log('first:', first);
console.log('others:', others);

// スプレッドで「年だけ1増やしたコピー」を作る
const updated = { ...user, age: user.age + 1 };
console.log('updated:', updated);

// 配列の結合
const allHobbies = [...hobbies, '読書'];
console.log('all:', allHobbies);

// ⬇️ ミッション:
// 1) const todo = { id: 1, text: '勉強', done: false } を定義
// 2) スプレッドを使って done: true に書き換えた completed を作る
// 3) 関数引数で {text, done} を分解して受け取り、文字列で返す describe を作る
//    例: describe(completed) → '✅ 勉強'  / describe(todo) → '⬜ 勉強'
`,
      },
    ],
  },
  mission: {
    title: 'スプレッドで TODO の完了状態を切り替える',
    checks: [
      '`{ ...todo, done: true }` で `completed` を作る',
      'もとの `todo.done` が `false` のままであることを確認（イミュータブル更新）',
      '`describe({ text, done })` を関数引数の分割代入で書く',
    ],
    hint: '`const describe = ({ text, done }) => `${done ? "✅" : "⬜"} ${text}`;`',
  },
};
