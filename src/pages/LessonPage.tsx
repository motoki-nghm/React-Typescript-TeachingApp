import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';

import { Playground } from '../components/Playground';
import { Mission } from '../components/Mission';
import { ProgressBar } from '../components/ProgressBar';
import {
  CHAPTERS,
  LESSONS,
  getLessonById,
  getNextLesson,
  getPreviousLesson,
} from '../lessons';
import { useProgress } from '../store/progress';

export function LessonPage() {
  const params = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const lesson = params.lessonId ? getLessonById(params.lessonId) : undefined;

  const completed = useProgress((s) => s.completed);
  const markComplete = useProgress((s) => s.markComplete);
  const markIncomplete = useProgress((s) => s.markIncomplete);
  const setLastVisited = useProgress((s) => s.setLastVisited);

  useEffect(() => {
    if (lesson) {
      setLastVisited(lesson.id);
      window.scrollTo({ top: 0 });
    }
  }, [lesson, setLastVisited]);

  if (!lesson) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-12 text-center">
        <h2 className="mb-3 text-xl font-semibold">レッスンが見つかりません</h2>
        <Link
          to="/"
          className="text-sm text-brand-soft underline hover:text-brand"
        >
          ホームへ戻る
        </Link>
      </div>
    );
  }

  const next = getNextLesson(lesson.id);
  const prev = getPreviousLesson(lesson.id);
  const chapter = CHAPTERS.find((c) => c.id === lesson.chapter);
  const isComplete = Boolean(completed[lesson.id]);
  const totalDone = LESSONS.filter((l) => completed[l.id]).length;

  const handleToggleComplete = () => {
    if (isComplete) {
      markIncomplete(lesson.id);
    } else {
      markComplete(lesson.id);
      if (next) {
        // Slight delay so the user can see the success state.
        window.setTimeout(() => navigate(`/lesson/${next.id}`), 350);
      }
    }
  };

  const showPreview = lesson.playground.template === 'react-ts';

  return (
    <article className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 md:px-8 md:py-10">
      <header className="flex flex-col gap-3">
        <ProgressBar done={totalDone} total={LESSONS.length} />
        <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
          <span className="rounded-md bg-brand/15 px-2 py-0.5 font-medium text-brand-soft">
            {chapter?.label}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            約{lesson.estimatedMinutes}分
          </span>
        </div>
        <h1 className="text-2xl font-bold leading-tight md:text-3xl">
          {lesson.title}
        </h1>
        <p className="text-sm text-ink-muted">{lesson.summary}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,1.4fr)]">
        <section className="prose prose-lesson prose-sm max-w-none md:prose-base">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.body}</ReactMarkdown>
        </section>

        <div className="flex flex-col gap-4">
          <Playground playground={lesson.playground} showPreview={showPreview} />
          <Mission
            mission={lesson.mission}
            isComplete={isComplete}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </div>

      <nav className="mt-4 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-stretch sm:justify-between">
        {prev ? (
          <Link
            to={`/lesson/${prev.id}`}
            className="flex flex-1 items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm transition hover:border-brand/50 hover:bg-surface-2"
          >
            <ArrowLeft size={16} className="shrink-0 text-ink-muted" />
            <div className="flex min-w-0 flex-col">
              <span className="text-[11px] uppercase tracking-wider text-ink-muted">
                前のレッスン
              </span>
              <span className="truncate font-medium text-ink">{prev.title}</span>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <Link
            to={`/lesson/${next.id}`}
            className="flex flex-1 items-center justify-end gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm transition hover:border-brand/50 hover:bg-surface-2"
          >
            <div className="flex min-w-0 flex-col text-right">
              <span className="text-[11px] uppercase tracking-wider text-ink-muted">
                次のレッスン
              </span>
              <span className="truncate font-medium text-ink">{next.title}</span>
            </div>
            <ArrowRight size={16} className="shrink-0 text-ink-muted" />
          </Link>
        ) : (
          <Link
            to="/"
            className="flex flex-1 items-center justify-end gap-3 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent transition hover:bg-accent/20"
          >
            <span className="font-medium">🎉 全レッスン制覇！ホームへ戻る</span>
            <ArrowRight size={16} />
          </Link>
        )}
      </nav>
    </article>
  );
}
