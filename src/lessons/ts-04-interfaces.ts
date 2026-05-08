import type { Lesson } from '../types';

export const tsInterfaces: Lesson = {
  id: 'ts-04-interfaces',
  chapter: 'ts',
  order: 4,
  title: 'type と interface — 名前を持つ型',
  summary: 'オブジェクトの「形」に名前をつけて、コードの設計図にする。',
  estimatedMinutes: 8,
  body: `
## このレッスンで分かること

- \`type\` エイリアスと \`interface\` の書き方
- 何度も同じ型を書かなくて済む嬉しさ
- ユニオン型 \`'free' | 'paid'\` の威力

---

### 型に名前をつける

\`\`\`ts
type User = {
  id: string;
  name: string;
  age: number;
};

const me: User = { id: 'u1', name: 'Gon', age: 12 };
\`\`\`

\`type\` の代わりに \`interface\` でも書けます。
**オブジェクトの形を表すなら、ほぼ同じ** と思って OK です。

\`\`\`ts
interface User {
  id: string;
  name: string;
  age: number;
}
\`\`\`

> 💡 **使い分け（ざっくり）**
> - オブジェクト・クラスを表す → \`interface\` でも \`type\` でもよい
> - **ユニオン**や**プリミティブ**に名前をつけたい → \`type\` のみ可

### ユニオン型

「**この値は A か B のどちらか**」を表します。

\`\`\`ts
type ApiMode = 'free' | 'paid';

function setMode(mode: ApiMode) {
  if (mode === 'free') console.log('🆓 無料モード');
  else console.log('💎 有料モード');
}

setMode('free');     // ✅
setMode('premium');  // ❌ 'free' | 'paid' のどちらでもない
\`\`\`

---

## 設計図としての型

\`User\` 型を一度書いてしまえば、関数の引数や配列の型として **何度でも使える** ようになります。
これが TypeScript で「設計を先に決める」ことの強さです。
`,
  playground: {
    template: 'vanilla-ts',
    files: [
      {
        path: '/index.ts',
        active: true,
        code: `type Role = 'admin' | 'member' | 'guest';

interface User {
  id: string;
  name: string;
  role: Role;
}

const users: User[] = [
  { id: 'u1', name: 'Gon', role: 'member' },
  { id: 'u2', name: 'Netero', role: 'admin' },
  { id: 'u3', name: 'Visitor', role: 'guest' },
];

function describe(user: User): string {
  switch (user.role) {
    case 'admin':
      return \`\${user.name} は管理者\`;
    case 'member':
      return \`\${user.name} は一般メンバー\`;
    case 'guest':
      return \`\${user.name} はゲスト\`;
  }
}

users.forEach((u) => console.log(describe(u)));

// ⬇️ ミッション: 'banned' という Role を増やしてみよう
// 1) Role に 'banned' を追加
// 2) describe 関数の switch に 'banned' のケースを追加 (足りないと TS が怒る)
// 3) users にひとり banned を追加して結果を見る
`,
      },
    ],
  },
  mission: {
    title: '`Role` に `banned` を増やして、描画関数を網羅する',
    checks: [
      '`type Role` に `banned` を追加する',
      '`describe` の switch に `banned` のケースを追加',
      '追加し忘れると TS がコンパイル時に教えてくれることを観察する',
    ],
    hint: '`Role` を変えた瞬間、`describe` の switch 漏れで TypeScript が赤くなる。これがユニオン型の威力。',
  },
};
