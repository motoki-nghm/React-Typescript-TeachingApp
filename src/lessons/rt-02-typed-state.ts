import type { Lesson } from '../types';

export const rtTypedState: Lesson = {
  id: 'rt-02-typed-state',
  chapter: 'react-ts',
  order: 2,
  title: 'useState とジェネリクス',
  summary: '`useState<T>` で型を明示する場面と、推論にまかせる場面。',
  estimatedMinutes: 7,
  body: `
## このレッスンで分かること

- \`useState\` の型推論が **どこまで頑張ってくれるか**
- 明示的に \`useState<T>(...)\` と書くべき場面
- ユニオン型を使った「ステータス管理」パターン

---

### 推論で十分な場合

初期値から型がはっきり分かる時は、**何も書かなくて OK**。

\`\`\`tsx
const [count, setCount] = useState(0);          // number と推論
const [name, setName] = useState('Gon');        // string と推論
const [open, setOpen] = useState(false);        // boolean と推論
\`\`\`

### 明示すべき場合

「最初は \`null\`、あとで User オブジェクトが入る」のように、
**初期値だけでは型が決まらない時** はジェネリクスで指定します。

\`\`\`tsx
type User = { id: string; name: string };

const [user, setUser] = useState<User | null>(null);

// あとで…
setUser({ id: 'u1', name: 'Gon' });
\`\`\`

\`useState<User | null>(null)\` の \`<...>\` の部分が **ジェネリクス**。
「この state はこの型ですよ」と TypeScript に教えています。

### 配列にも使う

\`\`\`tsx
const [todos, setTodos] = useState<Todo[]>([]);
\`\`\`

空配列 \`[]\` だと TS は \`never[]\` と推論してしまう（要素を入れられない！）ため、
**最初から空の配列を持つ state はジェネリクスで型を教えてあげる** のが定石です。

---

## ステータス管理の定番パターン

「ロード中／成功／失敗」のように **状態が3つ以上** ある時は、ユニオン型が便利。

\`\`\`tsx
type Status = 'idle' | 'loading' | 'success' | 'error';
const [status, setStatus] = useState<Status>('idle');
\`\`\`
`,
  playground: {
    template: 'react-ts',
    files: [
      {
        path: '/App.tsx',
        active: true,
        code: `import { useState } from 'react';

type User = { id: string; name: string };
type Status = 'idle' | 'loading' | 'success' | 'error';

const fakeFetchUser = (): Promise<User> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // 30% の確率で失敗
      if (Math.random() < 0.3) reject(new Error('ネットワークエラー'));
      else resolve({ id: 'u1', name: 'Killua' });
    }, 800);
  });

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<Status>('idle');

  const load = async () => {
    setStatus('loading');
    try {
      const u = await fakeFetchUser();
      setUser(u);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <main style={{ fontFamily: 'system-ui', padding: 24 }}>
      <h1>状態管理ミニ実験</h1>
      <button onClick={load} disabled={status === 'loading'}>
        ユーザーを取得
      </button>

      <p>状態: {status}</p>

      {status === 'loading' && <p>⏳ 読み込み中...</p>}
      {status === 'error' && <p style={{ color: 'red' }}>❌ 失敗しました</p>}
      {status === 'success' && user && (
        <p>
          ✅ こんにちは <strong>{user.name}</strong> さん (id: {user.id})
        </p>
      )}

      {/* ⬇️ ミッション:
        1) 「リセット」ボタンを追加し、user を null・status を 'idle' に戻す
        2) status の取りうる値を全パターン試してみる (loading / success / error)
      */}
    </main>
  );
}
`,
      },
    ],
  },
  mission: {
    title: '状態をリセットするボタンを追加する',
    checks: [
      'リセットボタンで `user` が `null`、`status` が `idle` に戻る',
      '画面の表示が初期状態に戻ることを確認',
      'ユニオン型のおかげで、`status` のタイプミスが TS に弾かれることを観察',
    ],
    hint: '`<button onClick={() => { setUser(null); setStatus("idle"); }}>リセット</button>` を追加。',
  },
};
