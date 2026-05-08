import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  /** Set of completed lesson IDs. Using object map because zustand persist needs serializable state. */
  completed: Record<string, true>;
  /** Last lesson the user opened, used for "続きから" CTA. */
  lastVisitedId: string | null;
  markComplete: (id: string) => void;
  markIncomplete: (id: string) => void;
  setLastVisited: (id: string) => void;
  reset: () => void;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      completed: {},
      lastVisitedId: null,
      markComplete: (id) =>
        set((state) => ({ completed: { ...state.completed, [id]: true } })),
      markIncomplete: (id) =>
        set((state) => {
          const next = { ...state.completed };
          delete next[id];
          return { completed: next };
        }),
      setLastVisited: (id) => set({ lastVisitedId: id }),
      reset: () => set({ completed: {}, lastVisitedId: null }),
    }),
    {
      name: 'rt-school::progress::v1',
    },
  ),
);

export const isLessonComplete = (
  completed: Record<string, true>,
  id: string,
): boolean => Boolean(completed[id]);
