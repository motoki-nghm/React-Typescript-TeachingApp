import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  SandpackConsole,
} from '@codesandbox/sandpack-react';
import { useState } from 'react';
import { Code2, Eye, Terminal } from 'lucide-react';
import type { LessonPlayground } from '../types';

interface PlaygroundProps {
  playground: LessonPlayground;
  /** Whether to show the iframe preview tab. False for vanilla JS/TS lessons (console only). */
  showPreview?: boolean;
}

const customTheme = {
  colors: {
    surface1: '#0d1017',
    surface2: '#11141b',
    surface3: '#161a23',
    clickable: '#9ba3b4',
    base: '#e6e8ee',
    disabled: '#52596b',
    hover: '#ffffff',
    accent: '#7c5cff',
    error: '#f87171',
    errorSurface: '#3f1d1d',
  },
  syntax: {
    plain: '#e6e8ee',
    comment: { color: '#7280a0', fontStyle: 'italic' },
    keyword: '#c4b5fd',
    tag: '#f0abfc',
    punctuation: '#9ba3b4',
    definition: '#7dd3fc',
    property: '#a5f3fc',
    static: '#fde68a',
    string: '#86efac',
  },
  font: {
    body: '"Inter", system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, Consolas, monospace',
    size: '14px',
    lineHeight: '1.55',
  },
} as const;

type PanelKey = 'preview' | 'console';

export function Playground({ playground, showPreview = true }: PlaygroundProps) {
  const [panel, setPanel] = useState<PanelKey>(showPreview ? 'preview' : 'console');

  const sandpackFiles: Record<
    string,
    { code: string; active?: boolean; hidden?: boolean; readOnly?: boolean }
  > = {};
  for (const f of playground.files) {
    sandpackFiles[f.path] = {
      code: f.code,
      active: f.active,
      hidden: f.hidden,
      readOnly: f.readOnly,
    };
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-3 shadow-lg shadow-black/30">
      {playground.hint && (
        <p className="px-2 text-xs leading-relaxed text-ink-muted">
          <span className="mr-2 inline-block rounded bg-brand/15 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-brand-soft">
            HINT
          </span>
          {playground.hint}
        </p>
      )}

      <div className="flex items-center gap-1 px-1">
        {showPreview ? (
          <>
            <TabButton
              active={panel === 'preview'}
              icon={<Eye size={14} />}
              label="プレビュー"
              onClick={() => setPanel('preview')}
            />
            <TabButton
              active={panel === 'console'}
              icon={<Terminal size={14} />}
              label="コンソール"
              onClick={() => setPanel('console')}
            />
          </>
        ) : (
          <div className="flex items-center gap-1.5 rounded-lg bg-brand/15 px-3 py-1.5 text-xs font-medium text-brand-soft">
            <Terminal size={14} />
            実行結果（コンソール）
          </div>
        )}
        <div className="ml-auto flex items-center gap-1 text-xs text-ink-muted">
          <Code2 size={12} />
          <span>編集して保存（Ctrl/Cmd+S）で即反映</span>
        </div>
      </div>

      <SandpackProvider
        template={playground.template}
        files={sandpackFiles}
        theme={customTheme}
        options={{
          autorun: true,
          recompileMode: 'delayed',
          recompileDelay: 400,
        }}
      >
        <SandpackLayout
          style={{
            background: 'transparent',
            border: 'none',
            borderRadius: '0.75rem',
          }}
        >
          <SandpackCodeEditor
            showTabs
            showLineNumbers
            showInlineErrors
            wrapContent
            closableTabs={false}
            style={{ height: 360, minWidth: 0 }}
          />
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              height: 360,
            }}
          >
            {showPreview && panel === 'preview' ? (
              <SandpackPreview
                showOpenInCodeSandbox={false}
                showRefreshButton
                style={{ height: '100%', background: '#fff' }}
              />
            ) : (
              <SandpackConsole style={{ height: '100%' }} />
            )}
          </div>
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

interface TabButtonProps {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function TabButton({ active, icon, label, onClick }: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
        active
          ? 'bg-brand/20 text-brand-soft'
          : 'text-ink-muted hover:bg-surface-2 hover:text-ink'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
