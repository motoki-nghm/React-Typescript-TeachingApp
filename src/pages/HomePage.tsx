import { Link } from 'react-router-dom';
import { ArrowRight, Clock, PlayCircle, RefreshCw, Sparkles } from 'lucide-react';
import { CHAPTERS, LESSONS, getLessonsByChapter } from '../lessons';
import { useProgress } from '../store/progress';
import { ProgressBar } from '../components/ProgressBar';

export function HomePage() {
  const completed = useProgress((s) => s.completed);
  const lastVisitedId = useProgress((s) => s.lastVisitedId);
  const reset = useProgress((s) => s.reset);

  const totalDone = LESSONS.filter((l) => completed[l.id]).length;
  const firstUnfinished = LESSONS.find((l) => !completed[l.id]);
  const continueTarget =
    (lastVisitedId && LESSONS.find((l) => l.id === lastVisitedId)) ||
    firstUnfinished ||
    LESSONS[0];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-8 md:px-8 md:py-14">
      <section className="rounded-3xl border border-border bg-gradient-to-br from-brand/15 via-surface to-surface p-6 md:p-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand/15 px-3 py-1 text-xs font-medium text-brand-soft">
          <Sparkles size={12} />
          ハンズオン形式で React × TypeScript を学ぶ
        </div>
        <h1 className="mb-3 text-3xl font-bold leading-tight md:text-4xl">
          ブラウザの中で書いて、書いた瞬間に動く。
          <br className="hidden md:inline" />
          手を動かして覚える、最短ルート。
        </h1>
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base">
          このアプリは <strong className="text-ink">完全ブラウザ完結</strong>。
          環境構築なしで、TypeScript の基礎 → React の基礎 →
          React×TS の実践を、実際にコードを書きながら学べます。
          各レッスンには <strong className="text-ink">ミッション</strong> があり、
          進捗はあなたのブラウザに自動保存されます。
        </p>

        <div className="mb-6">
          <ProgressBar done={totalDone} total={LESSONS.length} />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={`/lesson/${continueTarget.id}`}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand/90"
          >
            <PlayCircle size={16} />
            {totalDone === 0
              ? '最初のレッスンから始める'
              : totalDone === LESSONS.length
                ? 'もう一度復習する'
                : '続きから再開する'}
            <ArrowRight size={14} />
          </Link>
          {totalDone > 0 && (
            <button
              type="button"
              onClick={() => {
                if (confirm('進捗をすべてリセットします。よろしいですか？')) {
                  reset();
                }
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs text-ink-muted transition hover:bg-surface-2 hover:text-ink"
            >
              <RefreshCw size={12} />
              進捗をリセット
            </button>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        {CHAPTERS.map((chapter) => {
          const lessons = getLessonsByChapter(chapter.id);
          const done = lessons.filter((l) => completed[l.id]).length;
          return (
            <div
              key={chapter.id}
              className="rounded-2xl border border-border bg-surface p-5 md:p-6"
            >
              <header className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold">{chapter.label}</h2>
                  <p className="text-sm text-ink-muted">{chapter.caption}</p>
                </div>
                <span className="text-xs tabular-nums text-ink-muted">
                  {done}/{lessons.length} 完了
                </span>
              </header>
              <ul className="grid gap-2 md:grid-cols-2">
                {lessons.map((lesson) => {
                  const isDone = Boolean(completed[lesson.id]);
                  return (
                    <li key={lesson.id}>
                      <Link
                        to={`/lesson/${lesson.id}`}
                        className={`flex h-full items-start gap-3 rounded-xl border p-3 text-left transition ${
                          isDone
                            ? 'border-accent/40 bg-accent/5 hover:border-accent/60'
                            : 'border-border bg-surface-2/50 hover:border-brand/40 hover:bg-surface-2'
                        }`}
                      >
                        <span
                          className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                            isDone
                              ? 'bg-accent/20 text-accent'
                              : 'bg-brand/20 text-brand-soft'
                          }`}
                        >
                          {isDone ? '✓' : lesson.order}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-ink">
                            {lesson.title}
                          </p>
                          <p className="mt-0.5 text-xs text-ink-muted">
                            {lesson.summary}
                          </p>
                          <p className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-ink-muted">
                            <Clock size={10} /> 約{lesson.estimatedMinutes}分
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </section>

      <footer className="rounded-2xl border border-border bg-surface px-5 py-4 text-xs text-ink-muted">
        💡 <strong className="text-ink">最適な学び方</strong>:
        まずレッスンを最後まで読んだら、エディタを書き換えてみる。
        ミッションは「動くものができたら」自分の判断で完了に。
        詰まっても <strong className="text-ink">ヒント</strong> があるので大丈夫。
      </footer>
    </div>
  );
}
