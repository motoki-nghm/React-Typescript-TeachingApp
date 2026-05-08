import type { Lesson } from '../types';

export const reactState: Lesson = {
  id: 'react-03-state',
  chapter: 'react',
  order: 3,
  title: 'useState で状態を持つ',
  summary: 'ボタンを押すと数字が増える、を React 流に実装する。',
  estimatedMinutes: 8,
  body: `
## このレッスンで分かること

- **状態 (state)** とは何か
- \`useState\` の使い方
- 「state を更新したら再描画される」という React の心臓部分

---

### state = 「画面が覚えておきたい値」

カウンターの数、入力中の文字、開閉中のモーダル。
**画面の見た目を変える値** はぜんぶ state です。

\`\`\`tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      クリック数: {count}
    </button>
  );
}
\`\`\`

### 読み方

- \`useState(0)\` で「初期値 0 の state を作るよ」
- 戻り値は **2要素のタプル**:
  - \`count\` … 現在の値
  - \`setCount\` … 値を更新するための関数
- \`setCount(count + 1)\` を呼ぶと → React が **画面を再描画** する

> 💡 \`count++\` のように **直接書き換えてはいけません**。
> 必ず \`setCount(...)\` を経由する。React はそれを見て描画を更新します。

---

## 関数型の更新

「現在の値を元に、次の値を計算する」場合は関数を渡すのが安全です。

\`\`\`tsx
setCount((prev) => prev + 1);
\`\`\`

非同期の連続更新でも順番がずれない、というメリットがあります。
`,
  playground: {
    template: 'react-ts',
    files: [
      {
        path: '/App.tsx',
        active: true,
        code: `import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main
      style={{
        fontFamily: 'system-ui',
        padding: 24,
        textAlign: 'center',
      }}
    >
      <h1>クリックカウンター</h1>
      <p style={{ fontSize: 64, margin: '16px 0' }}>{count}</p>

      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: '8px 20px',
          fontSize: 18,
          background: '#7c5cff',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          marginRight: 8,
        }}
      >
        +1
      </button>

      {/* ⬇️ ミッション:
        1) -1 ボタンを追加する
        2) 「リセット」ボタンを追加する (count を 0 に戻す)
        3) 余裕があれば、count が 0 未満にならないようにする
      */}
    </main>
  );
}
`,
      },
    ],
  },
  mission: {
    title: 'カウンターに `-1` と `リセット` を追加する',
    checks: [
      '`-1` ボタンで count が減る',
      '`リセット` ボタンで count が 0 に戻る',
      '余裕があれば、count が 0 未満にならないようガードする',
    ],
    hint: '`onClick={() => setCount(count - 1)}` と `onClick={() => setCount(0)}` を追加。負数防止は `Math.max(0, count - 1)`。',
  },
};
