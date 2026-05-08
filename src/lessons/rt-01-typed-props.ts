import type { Lesson } from '../types';

export const rtTypedProps: Lesson = {
  id: 'rt-01-typed-props',
  chapter: 'react-ts',
  order: 1,
  title: 'コンポーネントに型をつける',
  summary: '`type Props = {...}` でコンポーネントの「契約」を書く。',
  estimatedMinutes: 7,
  body: `
## このレッスンで分かること

- props に型をつけて、間違った使い方を防ぐ
- \`type Props = ...\` で名前を持たせる定石
- オプション props の書き方

---

### Props 型を取り出す

第2章では \`{ name: string }\` を関数の引数に直書きしましたが、
**型に名前をつける** のが現場の定石です。

\`\`\`tsx
type ButtonProps = {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'ghost';   // 省略可
};

function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      data-variant={variant}
    >
      {label}
    </button>
  );
}
\`\`\`

> 💡 \`variant?: ...\` の \`?\` は **省略可能** の印。
> 関数のデフォルト引数 \`variant = 'primary'\` と組み合わせるのが定番。

### 何が嬉しい？

\`\`\`tsx
<Button label="保存" onClick={handleSave} />            // ✅
<Button onClick={handleSave} />                         // ❌ label が無い
<Button label="保存" onClick={handleSave} variant="huge" /> // ❌ ユニオン型に無い
\`\`\`

**間違いはエディタが教えてくれる**。
これが React + TypeScript の最大の旨味です。

---

## children を持つ場合

ボタンの中身を **子要素として柔軟に渡せる** ようにしたい時:

\`\`\`tsx
type Props = {
  children: React.ReactNode;
  onClick: () => void;
};
\`\`\`

\`React.ReactNode\` は「JSX に置ける何か」を表す型 (文字列・要素・配列・null など)。
迷ったらこれで OK。
`,
  playground: {
    template: 'react-ts',
    files: [
      {
        path: '/App.tsx',
        active: true,
        code: `import { useState } from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'ghost' | 'danger';
};

function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  const styles: Record<NonNullable<ButtonProps['variant']>, React.CSSProperties> =
    {
      primary: { background: '#7c5cff', color: '#fff' },
      ghost: { background: 'transparent', color: '#7c5cff', border: '1px solid #7c5cff' },
      danger: { background: '#ef4444', color: '#fff' },
    };

  return (
    <button
      onClick={onClick}
      style={{
        ...styles[variant],
        padding: '8px 16px',
        borderRadius: 8,
        border: 'none',
        marginRight: 8,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [msg, setMsg] = useState('まだ何も押されていません');

  return (
    <main style={{ fontFamily: 'system-ui', padding: 24 }}>
      <h1>型付きボタン</h1>
      <p>{msg}</p>

      <Button onClick={() => setMsg('保存しました ✅')}>保存</Button>
      <Button variant="ghost" onClick={() => setMsg('キャンセルしました')}>
        キャンセル
      </Button>

      {/* ⬇️ ミッション:
        1) 「削除」ボタンを variant="danger" で追加する
        2) わざと variant="huge" と書いて、TS が怒るのを観察
        3) onClick を渡し忘れて、TS が怒るのを観察
      */}
    </main>
  );
}
`,
      },
    ],
  },
  mission: {
    title: 'danger variant のボタンを追加する',
    checks: [
      '`<Button variant="danger" onClick={...}>削除</Button>` を追加',
      '`variant="huge"` を試して、TS の補完候補と赤波線を観察',
      '`onClick` を消して、TS が必須プロパティ不足を教えてくれることを観察',
    ],
    hint: '`<Button variant="danger" onClick={() => setMsg("削除しました")}>削除</Button>`',
  },
};
