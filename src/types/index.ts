export type LessonChapter = 'ts' | 'react' | 'react-ts';

export type SandpackTemplate = 'react-ts' | 'vanilla-ts';

export interface SandpackFile {
  /** Path inside the sandbox (e.g. /App.tsx). */
  path: string;
  /** File contents. */
  code: string;
  /** Whether to highlight this file as the active tab. */
  active?: boolean;
  /** If true, hide the file from the user's tab list. */
  hidden?: boolean;
  /** If true, file is read-only (great for instructions or fixtures). */
  readOnly?: boolean;
}

export interface LessonPlayground {
  template: SandpackTemplate;
  files: SandpackFile[];
  /** Optional: command-style hint shown above the editor. */
  hint?: string;
}

export interface LessonMission {
  /** Headline of the task ("◯◯ を実装しよう"). */
  title: string;
  /** Bulleted requirements. */
  checks: string[];
  /** Inline hint / spoiler text. */
  hint?: string;
}

export interface Lesson {
  id: string;
  chapter: LessonChapter;
  order: number;
  title: string;
  /** One-line summary used in the sidebar and header. */
  summary: string;
  /** Estimated minutes to complete. */
  estimatedMinutes: number;
  /** Markdown body. */
  body: string;
  playground: LessonPlayground;
  mission: LessonMission;
}

export interface ChapterMeta {
  id: LessonChapter;
  label: string;
  caption: string;
}
