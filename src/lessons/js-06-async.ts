import type { Lesson } from '../types';

export const jsAsync: Lesson = {
  id: 'js-06-async',
  chapter: 'js',
  order: 6,
  title: 'Promise と async/await',
  summary: '「あとで結果が来る」処理をきれいに書く2つの書き方。',
  estimatedMinutes: 10,
  body: `
## このレッスンで分かること

- **Promise** とは何か
- \`.then\` / \`.catch\` の使い方
- **async/await** で同期的に見える書き方
- 並列実行のための \`Promise.all\`

---

### Promise = 「いずれ届く結果」を表す箱

時間のかかる処理（API 呼び出し・タイマー・ファイル読み込み）の結果は、
**今すぐには返せません**。代わりに「未来の結果を表す約束 (Promise)」を返します。

\`\`\`js
fetch('https://api.example.com/users')   // Promise を返す
  .then(res => res.json())                // 成功したら次へ
  .then(data => console.log(data))
  .catch(err => console.error(err));      // 失敗したら catch
\`\`\`

### async / await — もっと読みやすく

\`async\` 関数の中では \`await\` で「結果が来るまで待つ」ことができます。
**見た目は同期コードと同じ** になります。

\`\`\`js
async function loadUsers() {
  try {
    const res = await fetch('https://api.example.com/users');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
\`\`\`

> 💡 \`async\` 関数は **必ず Promise を返します**。\`return data\` と書いても、
> 受け取る側からは \`Promise<data>\` に見える。

---

### 並列実行: Promise.all

順番待ちの必要がない処理は **同時に走らせる** のが速い。

\`\`\`js
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
]);
\`\`\`

| 関数 | 挙動 |
| ---- | ---- |
| \`Promise.all\` | 全部成功で resolve、1つでも失敗で reject |
| \`Promise.allSettled\` | 全部の結果を待ち、成功も失敗も配列で返す |
| \`Promise.race\` | 最初に決着がついた1つの結果を返す |
| \`Promise.any\` | 最初に成功した1つを返す |
`,
  playground: {
    template: 'vanilla',
    files: [
      {
        path: '/index.js',
        active: true,
        code: `// 1秒待ってから結果を返す Promise を作る
const wait = (ms, value) =>
  new Promise(resolve => setTimeout(() => resolve(value), ms));

// .then チェーン版
wait(500, 'hello')
  .then(msg => {
    console.log('① 受け取った:', msg);
    return msg.toUpperCase();
  })
  .then(upper => console.log('② 大文字:', upper));

// async/await 版
async function run() {
  console.log('--- async start ---');
  const a = await wait(300, 'A');
  const b = await wait(300, 'B');
  console.log('連続:', a, b);   // 合計 600ms かかる

  // 並列で 300ms 待ち2つを同時に走らせる
  const [x, y] = await Promise.all([wait(300, 'X'), wait(300, 'Y')]);
  console.log('並列:', x, y);   // 合計 300ms で済む
}

run();

// ⬇️ ミッション:
// 1) loadUser(id) という async 関数を作る
//    - id を渡したら wait(400, { id, name: 'User' + id }) を返す
// 2) Promise.all を使って id=1,2,3 のユーザーを並列に取得して表示する
// 3) try/catch で wait の失敗を捕まえる練習
//    ヒント: new Promise((_, reject) => setTimeout(() => reject(new Error('NG')), 200))
`,
      },
    ],
  },
  mission: {
    title: '並列ロードと try/catch を実装する',
    checks: [
      '`async function loadUser(id)` を実装する',
      '`Promise.all` で id=1,2,3 を **並列に** 取得',
      '`try / catch` で失敗時のエラーメッセージを表示',
    ],
    hint: '`const users = await Promise.all([1, 2, 3].map(loadUser));`',
  },
};
