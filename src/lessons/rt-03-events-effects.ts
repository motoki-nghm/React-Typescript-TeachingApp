import type { Lesson } from '../types';

export const rtEventsEffects: Lesson = {
  id: 'rt-03-events-effects',
  chapter: 'react-ts',
  order: 3,
  title: 'イベント型と useEffect',
  summary: 'フォーム入力の型と、外部の世界と同期する `useEffect`。',
  estimatedMinutes: 9,
  body: `
## このレッスンで分かること

- イベントハンドラの型 (\`React.ChangeEvent\`, \`React.MouseEvent\`)
- \`useEffect\` で **外部の世界** (タイマー・購読・ネットワーク) と同期する基本
- クリーンアップ関数の役割

---

### イベントの型

普段は型推論が頑張ってくれるので **書かなくていい** ことが多いですが、
ハンドラを別関数として切り出した瞬間、型を書く必要があります。

\`\`\`tsx
// インラインなら推論される
<input onChange={(e) => setText(e.target.value)} />

// 別関数にしたら型を書く
function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  setText(e.target.value);
}
\`\`\`

### useEffect = 「外部と同期する」フック

\`\`\`tsx
useEffect(() => {
  // ① マウント時 (＋依存変化時) に実行される
  const id = setInterval(() => {
    console.log('1秒ごと');
  }, 1000);

  // ② アンマウント時 (＋依存変化前) に実行される
  return () => clearInterval(id);
}, []); // ③ 依存配列。空ならマウント時に1回だけ
\`\`\`

> 💡 **3つの大事な点**
> 1. 関数の中身は描画後に実行される
> 2. \`return\` した関数が **クリーンアップ** (副作用の片付け)
> 3. 依存配列に含めた値が変わると、クリーンアップ → 再実行

### よくある落とし穴

依存配列を **空のまま** にして、外の state を参照すると古い値を使い続けます。
**「使った state は依存配列に書く」** が原則。
`,
  playground: {
    template: 'react-ts',
    files: [
      {
        path: '/App.tsx',
        active: true,
        code: `import { useEffect, useState } from 'react';

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const [name, setName] = useState('');

  // running が true の間、毎秒 +1
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(id); // クリーンアップ
  }, [running]);

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  return (
    <main style={{ fontFamily: 'system-ui', padding: 24 }}>
      <h1>⏱ ストップウォッチ</h1>
      <p style={{ fontSize: 48 }}>{seconds}秒</p>

      <button onClick={() => setRunning((r) => !r)}>
        {running ? '⏸ 一時停止' : '▶ 再開'}
      </button>

      <hr style={{ margin: '24px 0' }} />

      <label>
        名前:
        <input value={name} onChange={handleNameChange} style={{ marginLeft: 8 }} />
      </label>
      {name && <p>こんにちは、{name} さん！</p>}

      {/* ⬇️ ミッション:
        1) 「リセット」ボタンを追加し、seconds を 0 に戻す
        2) document.title を \`\${seconds}秒経過\` に同期する useEffect を追加
           ヒント: 別の useEffect を書いて、依存配列に [seconds] を入れる
      */}
    </main>
  );
}
`,
      },
    ],
  },
  mission: {
    title: 'リセットボタンと、タイトル同期の `useEffect` を追加する',
    checks: [
      'リセットボタンで `seconds` が 0 に戻る',
      '`useEffect` で `document.title` を `${seconds}秒経過` に同期する',
      '依存配列に `[seconds]` を入れて、タイトルが毎秒更新されることを観察',
    ],
    hint: '`useEffect(() => { document.title = `${seconds}秒経過`; }, [seconds]);`',
  },
};
