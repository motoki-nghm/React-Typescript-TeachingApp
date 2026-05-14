# React × TypeScript Playground School

ブラウザの中で書いて、書いた瞬間に動く。React と TypeScript を **ハンズオン形式** で学べる、初心者向けのティーチングアプリです。

各レッスンには「解説 → 編集できるライブコード → ミッション」の流れがあり、進捗はブラウザに自動保存されます。

## 構成

- **第1章: JavaScript の基礎とトレンド** (8 レッスン) — 変数とスコープ、プリミティブ型、関数とアロー、分割代入とスプレッド、配列メソッド、Promise/async-await、`?.`/`??`/論理代入、ES2023–2025 トレンド (`Object.groupBy` / Set methods / `Promise.withResolvers` / `structuredClone` / Iterator helpers)
- **第2章: TypeScript の基礎** (4 レッスン) — `number/string/boolean`、配列とオブジェクト、関数、`type`/`interface`/ユニオン型
- **第3章: React の基礎** (4 レッスン) — コンポーネント、props、`useState`、イベント・条件・リスト
- **第4章: React × TypeScript** (3 レッスン) — 型付き props、`useState<T>`、イベント型と `useEffect`

合計 19 レッスン、約 150 分。

## 主要技術

| 役割 | 採用 |
| ---- | ---- |
| ビルド | Vite 8 |
| UI | React 19 + TypeScript 6 |
| スタイル | TailwindCSS 4 (`@tailwindcss/vite` プラグイン) |
| 状態管理 | Zustand (進捗を `localStorage` に永続化) |
| ルーティング | React Router v7 |
| ライブコード実行 | `@codesandbox/sandpack-react` (ブラウザ内で React/TS を実行) |
| Markdown | `react-markdown` + `remark-gfm` |

## 開発

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # 型チェック + 本番ビルド
npm run lint
```

## デバイス

PC ファースト・モバイル閲覧可。コード編集は物理キーボードのある PC が快適です。モバイルでは解説の閲覧と簡単な編集ができます。

## レッスンの追加

1. `src/lessons/` に新しい `.ts` ファイルを作る
2. `Lesson` 型 (`src/types/index.ts`) を満たすオブジェクトを default export 以外で export
3. `src/lessons/index.ts` の `LESSONS` 配列に追加

`order` でチャプター内の並び順、`chapter` で章 (`'ts' | 'react' | 'react-ts'`) を指定します。
