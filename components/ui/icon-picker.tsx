'use client'

import { useState } from "react";
import type { FC, SVGProps } from "react";
import {
  PythonIcon, ReactIcon, JavaScriptIcon, JavaIcon, HtmlFiveIcon, CssThreeIcon,
  DatabaseIcon, Database01Icon, Database02Icon, Typescript01Icon, Typescript02Icon,
  PhpIcon, CodeIcon, CodeCircleIcon, CodeSquareIcon, CodeSimpleIcon,
  Github01Icon, TailwindcssIcon, CloudServerIcon, ComputerTerminal01Icon,
  BinaryCodeIcon, GitBranchIcon, GitCommitIcon, GitForkIcon, GitMergeIcon,
  GitPullRequestIcon, GitlabIcon, SourceCodeIcon, InspectCodeIcon, AlgorithmIcon,
  DocumentCodeIcon, NodeAddIcon, VisualStudioCodeIcon, CodesandboxIcon,
  NextIcon, AndroidIcon, AppleIcon, ChromeIcon, FigmaIcon, LeetcodeIcon,
  GoogleGeminiIcon, AiCloudIcon, GitbookIcon,
} from "hugeicons-react";

type IconComponent = FC<SVGProps<SVGSVGElement> & { size?: number; color?: string }>;

export const SKILL_ICONS: { name: string; label: string; Icon: IconComponent }[] = [
  { name: "Python", label: "Python", Icon: PythonIcon as IconComponent },
  { name: "React", label: "React", Icon: ReactIcon as IconComponent },
  { name: "JavaScript", label: "JavaScript", Icon: JavaScriptIcon as IconComponent },
  { name: "Java", label: "Java", Icon: JavaIcon as IconComponent },
  { name: "HtmlFive", label: "HTML5", Icon: HtmlFiveIcon as IconComponent },
  { name: "CssThree", label: "CSS3", Icon: CssThreeIcon as IconComponent },
  { name: "Database", label: "Database", Icon: DatabaseIcon as IconComponent },
  { name: "Database01", label: "Database Alt", Icon: Database01Icon as IconComponent },
  { name: "Database02", label: "Database 2", Icon: Database02Icon as IconComponent },
  { name: "Typescript01", label: "TypeScript", Icon: Typescript01Icon as IconComponent },
  { name: "Typescript02", label: "TypeScript 2", Icon: Typescript02Icon as IconComponent },
  { name: "Php", label: "PHP", Icon: PhpIcon as IconComponent },
  { name: "Code", label: "Code", Icon: CodeIcon as IconComponent },
  { name: "CodeCircle", label: "Code Circle", Icon: CodeCircleIcon as IconComponent },
  { name: "CodeSquare", label: "Code Square", Icon: CodeSquareIcon as IconComponent },
  { name: "CodeSimple", label: "Code Simple", Icon: CodeSimpleIcon as IconComponent },
  { name: "Github01", label: "GitHub", Icon: Github01Icon as IconComponent },
  { name: "Tailwindcss", label: "Tailwind CSS", Icon: TailwindcssIcon as IconComponent },
  { name: "CloudServer", label: "Cloud Server", Icon: CloudServerIcon as IconComponent },
  { name: "ComputerTerminal01", label: "Terminal", Icon: ComputerTerminal01Icon as IconComponent },
  { name: "BinaryCode", label: "Binary / Data", Icon: BinaryCodeIcon as IconComponent },
  { name: "GitBranch", label: "Git Branch", Icon: GitBranchIcon as IconComponent },
  { name: "GitCommit", label: "Git Commit", Icon: GitCommitIcon as IconComponent },
  { name: "GitFork", label: "Git Fork", Icon: GitForkIcon as IconComponent },
  { name: "GitMerge", label: "Git Merge", Icon: GitMergeIcon as IconComponent },
  { name: "GitPullRequest", label: "Pull Request", Icon: GitPullRequestIcon as IconComponent },
  { name: "Gitlab", label: "GitLab", Icon: GitlabIcon as IconComponent },
  { name: "SourceCode", label: "Source Code", Icon: SourceCodeIcon as IconComponent },
  { name: "InspectCode", label: "Inspect Code", Icon: InspectCodeIcon as IconComponent },
  { name: "Algorithm", label: "Algorithm", Icon: AlgorithmIcon as IconComponent },
  { name: "DocumentCode", label: "Doc Code", Icon: DocumentCodeIcon as IconComponent },
  { name: "NodeAdd", label: "Node.js", Icon: NodeAddIcon as IconComponent },
  { name: "VisualStudioCode", label: "VS Code", Icon: VisualStudioCodeIcon as IconComponent },
  { name: "Codesandbox", label: "CodeSandbox", Icon: CodesandboxIcon as IconComponent },
  { name: "Next", label: "Next.js", Icon: NextIcon as IconComponent },
  { name: "Android", label: "Android", Icon: AndroidIcon as IconComponent },
  { name: "Apple", label: "Apple", Icon: AppleIcon as IconComponent },
  { name: "Chrome", label: "Chrome", Icon: ChromeIcon as IconComponent },
  { name: "Figma", label: "Figma", Icon: FigmaIcon as IconComponent },
  { name: "Leetcode", label: "LeetCode", Icon: LeetcodeIcon as IconComponent },
  { name: "GoogleGemini", label: "Gemini AI", Icon: GoogleGeminiIcon as IconComponent },
  { name: "AiCloud", label: "AI Cloud", Icon: AiCloudIcon as IconComponent },
  { name: "Gitbook", label: "GitBook", Icon: GitbookIcon as IconComponent },
];

export function getIconComponent(name: string): IconComponent {
  return (SKILL_ICONS.find((i) => i.name === name)?.Icon ?? CodeIcon) as IconComponent;
}

interface IconPickerProps {
  value: string;
  onChange: (name: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = SKILL_ICONS.filter((i) =>
    i.label.toLowerCase().includes(search.toLowerCase()) ||
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const selected = SKILL_ICONS.find((i) => i.name === value);
  const SelectedIcon = selected?.Icon ?? (CodeIcon as IconComponent);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white hover:border-zinc-500 transition-colors w-full text-left"
      >
        <SelectedIcon size={18} className="text-purple-400 shrink-0" />
        <span className="text-sm text-zinc-300">{selected?.label ?? "Pick an icon"}</span>
        <span className="ml-auto text-zinc-500 text-xs">{value || "none"}</span>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl">
          <div className="p-2 border-b border-zinc-800">
            <input
              autoFocus
              placeholder="Search icons…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-purple-500"
            />
          </div>
          <div className="grid grid-cols-6 gap-1 p-2 max-h-52 overflow-y-auto">
            {filtered.map((item) => {
              const { Icon } = item;
              const active = item.name === value;
              return (
                <button
                  key={item.name}
                  type="button"
                  title={item.label}
                  onClick={() => { onChange(item.name); setOpen(false); setSearch(""); }}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                    active
                      ? "bg-purple-600/30 border border-purple-500/50"
                      : "hover:bg-zinc-800 border border-transparent"
                  }`}
                >
                  <Icon size={20} className={active ? "text-purple-300" : "text-zinc-300"} />
                  <span className="text-zinc-500 text-[9px] leading-tight text-center truncate w-full">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
