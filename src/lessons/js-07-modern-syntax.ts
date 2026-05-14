import type { Lesson } from '../types';

export const jsModernSyntax: Lesson = {
  id: 'js-07-modern-syntax',
  chapter: 'js',
  order: 7,
  title: 'モダン構文 — `?.` / `??` / 論理代入',
  summary: 'null・undefined と仲良く付き合うための、見落とすと損する記法。',
  estimatedMinutes: 7,
  body: `
## このレッスンで分かること

- オプショナルチェーン \`?.\` で「あるか分からないプロパティ」を安全に辿る
- Null 合体演算子 \`??\` と、\`||\` との違い
- 論理代入演算子 \`??=\` / \`||=\` / \`&&=\`

---

### オプショナルチェーン \`?.\`

「途中の値が \`null\` や \`undefined\` だったら、評価を止めて \`undefined\` を返す」記法。

\`\`\`js
const user = { profile: { name: 'Gon' } };

user.profile.name;           // 'Gon'
user.address.street;         // ❌ TypeError (address が undefined)
user.address?.street;        // ✅ undefined (エラーにならない)

// メソッド呼び出しでも使える
user.greet?.();              // greet が無くてもエラーにならない

// 配列でも
arr?.[0];                    // arr が null/undefined なら undefined
\`\`\`

### Null 合体 \`??\`

「左が **\`null\` か \`undefined\`** のときだけ、右を使う」演算子。

\`\`\`js
const a = null ?? 'default';      // 'default'
const b = 0 ?? 'default';         // 0  (0 はそのまま！)
const c = '' ?? 'default';        // '' (空文字もそのまま！)
\`\`\`

### \`||\` との大きな違い

\`||\` は **falsy なら右を使う** ので、\`0\` や \`''\` も置き換わってしまいます。

\`\`\`js
const count = userInput || 10;   // userInput が 0 だと 10 になる 😱
const count = userInput ?? 10;   // userInput が 0 なら 0 のまま ✅
\`\`\`

> 💡 デフォルト値を与えたい時、**現代 JS では \`??\` を使う** のがほぼ常に正解。

---

### 論理代入演算子

代入の省略記法。

\`\`\`js
// 左が null/undefined のときだけ右を代入
config.timeout ??= 3000;     // 既存値があれば触らない

// 左が truthy のときだけ代入
config.enabled ||= true;

// 左が truthy のときだけ右を代入
config.feature &&= upgradeFeature(config.feature);
\`\`\`

設定オブジェクトの「デフォルト埋め」によく使われます。
`,
  playground: {
    template: 'vanilla',
    files: [
      {
        path: '/index.js',
        active: true,
        code: `const user = {
  name: 'Gon',
  profile: {
    age: 12,
    // address は未設定
  },
};

// オプショナルチェーン
console.log(user.profile?.age);          // 12
console.log(user.profile?.address?.city); // undefined (エラーにならない)
console.log(user.greet?.());              // undefined (関数が無くてもOK)

// Null 合体 vs ||
const score = 0;
console.log('||:', score || 100);   // 100 ← 0 が消える
console.log('??:', score ?? 100);   // 0   ← 0 はそのまま

// 設定オブジェクトのデフォルト埋め
const config = { timeout: 1500 };
config.timeout ??= 3000;     // 既存値あり → 触らない
config.retries ??= 3;        // 未設定 → 3 を入れる
console.log('config:', config);

// ⬇️ ミッション:
// 1) 以下の orders 配列から、各注文の customer.address.city を安全に表示する
//    一部の注文に customer や address が無いことに注意 (?. を使う)
// 2) city が無い場合は 'N/A' を表示する (?? を使う)
const orders = [
  { id: 1, customer: { name: 'Gon', address: { city: 'Tokyo' } } },
  { id: 2, customer: { name: 'Killua' } },
  { id: 3 },
  { id: 4, customer: { name: 'Kurapika', address: { city: 'Osaka' } } },
];

// ここに実装
`,
      },
    ],
  },
  mission: {
    title: '`?.` と `??` で安全に深いプロパティを辿る',
    checks: [
      '`orders.forEach` で各注文を回す',
      '`order.customer?.address?.city` で安全にアクセス',
      '`?? "N/A"` で未設定時のデフォルトを返す',
      '4件すべてエラーにならず表示されることを確認',
    ],
    hint: '`orders.forEach(o => console.log(o.id, o.customer?.address?.city ?? "N/A"));`',
  },
};
