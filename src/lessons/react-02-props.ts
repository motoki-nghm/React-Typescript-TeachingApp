import type { Lesson } from '../types';

export const reactProps: Lesson = {
  id: 'react-02-props',
  chapter: 'react',
  order: 2,
  title: 'props で値を渡す',
  summary: 'コンポーネントを「再利用できる部品」にするための仕組み。',
  estimatedMinutes: 7,
  body: `
## このレッスンで分かること

- **props** とは何か
- 同じコンポーネントに違う値を渡して、見た目を変える方法
- 子要素 (\`children\`) の渡し方

---

### props = 関数の引数

コンポーネントは関数。だから引数を受け取れます。
HTML 属性のように渡した値が、関数の **第1引数オブジェクト** に入ってきます。

\`\`\`tsx
function Greeting(props: { name: string }) {
  return <p>Hello, {props.name}!</p>;
}

<Greeting name="Gon" />       // → Hello, Gon!
<Greeting name="Killua" />    // → Hello, Killua!
\`\`\`

### 分割代入で受け取る (よく使う)

\`\`\`tsx
function Greeting({ name }: { name: string }) {
  return <p>Hello, {name}!</p>;
}
\`\`\`

書き方が違うだけで意味は同じ。**チームのコードに合わせて** 揃えます。

### children で「中身」を受け取る

タグの中に書いた要素は、自動的に \`children\` という props に入ります。

\`\`\`tsx
function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}

<Card>
  <h2>タイトル</h2>
  <p>中身</p>
</Card>
\`\`\`

---

## ポイント

> 💡 props は **読み取り専用** です。子コンポーネント側で書き換えることは想定されていません。
> 「親から子へ、上から下へ」一方通行が React の基本。
`,
  playground: {
    template: 'react-ts',
    files: [
      {
        path: '/App.tsx',
        active: true,
        code: `function Card({
  title,
  emoji,
  children,
}: {
  title: string;
  emoji: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        border: '1px solid #ccc',
        borderRadius: 12,
        padding: 16,
        margin: 12,
      }}
    >
      <h3 style={{ margin: 0 }}>
        {emoji} {title}
      </h3>
      <div style={{ marginTop: 8 }}>{children}</div>
    </section>
  );
}

export default function App() {
  return (
    <main style={{ fontFamily: 'system-ui', padding: 16 }}>
      <h1>キャラ名鑑</h1>
      <Card title="ゴン" emoji="🌱">
        <p>主人公。直感タイプの強化系念能力者。</p>
      </Card>
      <Card title="キルア" emoji="⚡">
        <p>暗殺一家の元プロ。電気を操る変化系。</p>
      </Card>
      {/* ⬇️ ミッション: 自分の好きなキャラのカードを1枚増やそう */}
    </main>
  );
}
`,
      },
    ],
  },
  mission: {
    title: '3枚目の `<Card>` を追加する',
    checks: [
      '`<Card>` をもう1枚追加し、`title` と `emoji` を渡す',
      'カードの中身（children）として `<p>` を入れる',
      '渡し忘れた props があると TS がエラーを出すことを観察',
    ],
    hint: '`<Card title="クラピカ" emoji="🔗"><p>...</p></Card>` のように追加。',
  },
};
