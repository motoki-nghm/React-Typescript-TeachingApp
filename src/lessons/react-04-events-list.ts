import type { Lesson } from '../types';

export const reactEventsList: Lesson = {
  id: 'react-04-events-list',
  chapter: 'react',
  order: 4,
  title: 'イベント・条件分岐・リスト表示',
  summary: 'TODO リストを作って、React の3つの基本動作を一気に体験する。',
  estimatedMinutes: 10,
  body: `
## このレッスンで分かること

- イベントハンドラ (\`onClick\`, \`onChange\`)
- 条件分岐レンダリング (\`{flag && <X />}\`, 三項演算子)
- 配列を \`.map()\` で要素に変換するパターン

---

### イベント

DOM のイベントは **キャメルケース** で書きます。

\`\`\`tsx
<button onClick={() => alert('hi')}>クリック</button>
<input onChange={(e) => console.log(e.target.value)} />
\`\`\`

### 条件分岐レンダリング

JSX の中に \`if\` 文は書けないので、**三項演算子** か **\`&&\`** を使います。

\`\`\`tsx
{isLoading ? <Spinner /> : <Result />}
{error && <p>エラーが発生しました</p>}
\`\`\`

### リストを描画する

配列を \`.map()\` で JSX の配列に変換します。
それぞれに **\`key\`** を付けるのがポイント (React がどの要素か識別するため)。

\`\`\`tsx
<ul>
  {items.map((item) => (
    <li key={item.id}>{item.text}</li>
  ))}
</ul>
\`\`\`

> 💡 \`key\` は **兄弟要素の中でユニーク** であれば OK。
> 配列の \`index\` を使うと並び替え時にバグるので、可能なら **id** を使う。

---

## ちょっとした TODO アプリを作ってみよう

右側のコードはすでに「追加」が実装済み。
あなたは「**削除ボタン**」と「**完了チェック**」を加えてみましょう。
`,
  playground: {
    template: 'react-ts',
    files: [
      {
        path: '/App.tsx',
        active: true,
        code: `import { useState } from 'react';

type Todo = { id: number; text: string; done: boolean };

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'TypeScript の章を終える', done: true },
    { id: 2, text: 'React の章を進める', done: false },
  ]);
  const [draft, setDraft] = useState('');

  const add = () => {
    if (!draft.trim()) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: draft.trim(), done: false },
    ]);
    setDraft('');
  };

  return (
    <main style={{ fontFamily: 'system-ui', padding: 24, maxWidth: 480 }}>
      <h1>📝 TODO</h1>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="やることを入力"
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={add} style={{ padding: '8px 16px' }}>
          追加
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
        {todos.map((t) => (
          <li
            key={t.id}
            style={{
              padding: 8,
              borderBottom: '1px solid #eee',
              opacity: t.done ? 0.5 : 1,
              textDecoration: t.done ? 'line-through' : 'none',
            }}
          >
            {t.text}
            {/* ⬇️ ミッション:
              1) チェックボックスで done を切り替えられるようにする
              2) 「削除」ボタンで todos からその項目を消せるようにする
            */}
          </li>
        ))}
      </ul>

      {todos.length === 0 && <p>やることはありません 🎉</p>}
    </main>
  );
}
`,
      },
    ],
  },
  mission: {
    title: 'TODO に「完了切替」と「削除」を追加する',
    checks: [
      'チェックボックスで `done` を切り替えると見た目（取り消し線・透明度）が変わる',
      '削除ボタンを押すと該当項目が消える',
      '`todos` 配列を直接書き換えず、必ず `setTodos` で新しい配列を渡す',
    ],
    hint: '`setTodos((prev) => prev.map((x) => x.id === t.id ? { ...x, done: !x.done } : x))` で切替。削除は `prev.filter((x) => x.id !== t.id)`。',
  },
};
