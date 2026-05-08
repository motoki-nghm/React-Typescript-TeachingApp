import { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronRight, Lightbulb, Target } from 'lucide-react';
import type { LessonMission } from '../types';

interface MissionProps {
  mission: LessonMission;
  isComplete: boolean;
  onToggleComplete: () => void;
}

export function Mission({ mission, isComplete, onToggleComplete }: MissionProps) {
  const [hintOpen, setHintOpen] = useState(false);

  return (
    <section className="rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/10 via-surface to-surface p-5">
      <div className="mb-3 flex items-center gap-2">
        <Target size={18} className="text-brand-soft" />
        <h3 className="text-base font-semibold text-ink">ミッション</h3>
      </div>
      <p className="mb-3 text-sm font-medium text-ink">{mission.title}</p>
      <ul className="mb-4 flex flex-col gap-1.5">
        {mission.checks.map((check, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm text-ink-muted"
          >
            <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-soft/70" />
            <span>{check}</span>
          </li>
        ))}
      </ul>

      {mission.hint && (
        <div className="mb-4 rounded-lg border border-border bg-surface-2/60">
          <button
            type="button"
            onClick={() => setHintOpen((v) => !v)}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-ink-muted hover:text-ink"
          >
            {hintOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            <Lightbulb size={14} className="text-warn" />
            ヒントを見る (詰まったら)
          </button>
          {hintOpen && (
            <div className="border-t border-border px-3 py-2.5 text-xs leading-relaxed text-ink/90">
              <code className="whitespace-pre-wrap">{mission.hint}</code>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={onToggleComplete}
        className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
          isComplete
            ? 'bg-accent/15 text-accent hover:bg-accent/25'
            : 'bg-brand text-white hover:bg-brand/90'
        }`}
      >
        <CheckCircle2 size={16} />
        {isComplete ? '完了済み — 戻すには再クリック' : 'ミッション達成！次へ進む'}
      </button>
    </section>
  );
}
