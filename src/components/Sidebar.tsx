import { NavLink } from 'react-router-dom';
import { CheckCircle2, Circle, X } from 'lucide-react';
import { CHAPTERS, getLessonsByChapter } from '../lessons';
import { useProgress } from '../store/progress';

interface SidebarProps {
  onNavigate?: () => void;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export function Sidebar({ onNavigate, onClose, showCloseButton }: SidebarProps) {
  const completed = useProgress((s) => s.completed);

  return (
    <aside className="flex h-full flex-col gap-2 overflow-y-auto bg-surface px-4 py-5">
      <div className="flex items-center justify-between px-1 pb-2">
        <NavLink
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-2 text-ink hover:text-brand-soft"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand/20 text-base">
            🎓
          </span>
          <span className="text-sm font-semibold leading-tight">
            React × TS<br />
            <span className="text-[11px] font-normal text-ink-muted">
              Playground School
            </span>
          </span>
        </NavLink>
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            aria-label="メニューを閉じる"
            className="rounded-md p-1.5 text-ink-muted hover:bg-surface-2 hover:text-ink"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <NavLink
        to="/"
        end
        onClick={onNavigate}
        className={({ isActive }) =>
          `mb-2 rounded-lg px-3 py-2 text-sm transition ${
            isActive
              ? 'bg-brand/15 text-brand-soft'
              : 'text-ink-muted hover:bg-surface-2 hover:text-ink'
          }`
        }
      >
        🏠 ホーム
      </NavLink>

      {CHAPTERS.map((chapter) => {
        const lessons = getLessonsByChapter(chapter.id);
        const done = lessons.filter((l) => completed[l.id]).length;
        return (
          <div key={chapter.id} className="mb-2">
            <div className="px-2 pb-1.5 pt-3">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-muted">
                {chapter.label}
              </p>
              <p className="text-[10px] text-ink-muted/70">
                {chapter.caption} ・ {done}/{lessons.length}
              </p>
            </div>
            <ul className="flex flex-col gap-0.5">
              {lessons.map((lesson) => {
                const isDone = Boolean(completed[lesson.id]);
                return (
                  <li key={lesson.id}>
                    <NavLink
                      to={`/lesson/${lesson.id}`}
                      onClick={onNavigate}
                      className={({ isActive }) =>
                        `flex items-start gap-2 rounded-lg px-2.5 py-2 text-[13px] leading-snug transition ${
                          isActive
                            ? 'bg-brand/15 text-ink'
                            : 'text-ink-muted hover:bg-surface-2 hover:text-ink'
                        }`
                      }
                    >
                      <span
                        className={`mt-0.5 shrink-0 ${
                          isDone ? 'text-accent' : 'text-ink-muted/60'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 size={14} />
                        ) : (
                          <Circle size={14} />
                        )}
                      </span>
                      <span className="min-w-0 break-words">{lesson.title}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      <div className="mt-auto rounded-lg bg-surface-2 p-3 text-[11px] leading-relaxed text-ink-muted">
        💾 進捗はブラウザに自動保存されます。
        <br />
        別端末でも続きから始めるには、同じブラウザでアクセスしてください。
      </div>
    </aside>
  );
}
