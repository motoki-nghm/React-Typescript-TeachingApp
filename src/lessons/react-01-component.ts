import type { Lesson } from '../types';

export const reactComponent: Lesson = {
  id: 'react-01-component',
  chapter: 'react',
  order: 1,
  title: 'はじめてのコンポーネント',
  summary: 'JSX で書ける関数が React の最小単位。',
  estimatedMinutes: 6,
  body: `
## このレッスンで分かること

- React の **コンポーネント** とは何か
- 関数が JSX を返すだけで画面に出ること
- HTML との小さな違い (\`className\` など)

---

### コンポーネント = 「JSX を返す関数」

\`\`\`tsx
function Hello() {
  return <h1>Hello, React!</h1>;
}
\`\`\`

これだけで「\`<Hello />\` という新しいタグを作った」のと同じです。

\`\`\`tsx
<Hello />     // 画面に <h1>Hello, React!</h1> が出る
\`\`\`

### JSX = JavaScript の中に書く HTML 風記法

| HTML | JSX |
| ---- | --- |
| \`class="card"\` | \`className="card"\` |
| \`for="email"\` | \`htmlFor="email"\` |
| \`style="color: red"\` | \`style={{ color: 'red' }}\` |

JSX の中で **JavaScript の式を埋め込む** には \`{}\` を使います。

\`\`\`tsx
const name = 'Gon';
return <p>Hello, {name}!</p>;
\`\`\`

> 💡 \`{}\` の中は **式** だけ。\`if\` 文は書けないので、三項演算子や論理演算で表現します。

---

## やってみよう

右の \`App.tsx\` を編集すると、すぐ右側のプレビューに反映されます。
**保存（Ctrl/Cmd+S）** すると即時更新されます。
`,
  playground: {
    template: 'react-ts',
    files: [
      {
        path: '/App.tsx',
        active: true,
        code: `export default function App() {
  const name = 'Gon';
  const today = new Date().toLocaleDateString('ja-JP');

  return (
    <main style={{ fontFamily: 'system-ui', padding: 24 }}>
      <h1 style={{ color: '#7c5cff' }}>はじめての React</h1>
      <p>こんにちは、{name} さん。</p>
      <p>今日は {today} です。</p>
      {/* ⬇️ ミッション: 自分の名前と趣味を表示する <p> を増やそう */}
    </main>
  );
}
`,
      },
    ],
  },
  mission: {
    title: '自己紹介カードを完成させる',
    checks: [
      '`name` を自分の名前に変える',
      '趣味を表示する `<p>` を追加する',
      '`<h1>` の色を好きな色に変えてみる',
    ],
    hint: '`<p>趣味: ガンプラ</p>` のように普通に追記すれば OK。HTML を書く感覚と同じ。',
  },
};
