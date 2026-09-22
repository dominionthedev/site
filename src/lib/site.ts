export const SITE_NAME = "DominionDev";
export const SITE_TAGLINE = "A tour, not a resume.";
export const SITE_THESIS = "I live in the terminal";
export const SITE_EMAIL = "dominionthedeveloper@gmail.com";

export const NAV = [
  { id: "think", label: "Think" },
  { id: "stack", label: "Stack" },
  { id: "work", label: "Work" },
  { id: "reach", label: "Reach" },
] as const;

export const STAGES = ["hero", "think", "stack", "work", "reach"] as const;

export const PHILOSOPHY = {
  lines: [
    "Stylishness isn't something you look at. It's how I say exactly what I feel.",
    "A limit is not a stop. It's a challenge.",
  ],
  proof:
    "RunBox exists because a 4GB MacBook Air on macOS 11 couldn't run Docker. So instead of waiting for better hardware, I built around the limit.",
};

export const LANG_COLOR = {
  Go: "#00ADD8",
  Python: "#3776AB",
  Rust: "#E43717",
  Zig: "#F7A41D",
  Lua: "#7C7CFF",
  TypeScript: "#3178C6",
} as const;

export const LANGUAGES = [
  { name: "Go", color: LANG_COLOR.Go, x: 7, y: 16, rot: -5, size: "xl" },
  { name: "Rust", color: LANG_COLOR.Rust, x: 54, y: 10, rot: 4, size: "xl" },
  { name: "Python", color: LANG_COLOR.Python, x: 14, y: 54, rot: 7, size: "lg" },
  { name: "Zig", color: LANG_COLOR.Zig, x: 66, y: 48, rot: -7, size: "lg" },
  { name: "Lua", color: LANG_COLOR.Lua, x: 38, y: 30, rot: 2, size: "md" },
] as const;

export const ENVIRONMENT = ["WezTerm", "Tmux", "Neovim", "zsh"] as const;

export type Project = {
  name: string;
  url: string;
  lang: string;
  blurb: string;
};

export const PROJECTS: Project[] = [
  {
    name: "RunBox",
    url: "https://github.com/dominionthedev/runbox",
    lang: "Rust",
    blurb: "macOS-only dev-box isolation. Not a container, not a VM.",
  },
  {
    name: "leak",
    url: "https://github.com/dominionthedev/leak",
    lang: "Go",
    blurb: "Control the terminal: termios, CSI, OSC, modes, and replies.",
  },
  {
    name: "drop",
    url: "https://github.com/dominionthedev/drop",
    lang: "Go",
    blurb: "A virtual screen for constructing and rendering terminal UIs.",
  },
  {
    name: "termfx",
    url: "https://github.com/dominionthedev/termfx",
    lang: "Go",
    blurb: "UI-grade motion and treatment for terminal UIs.",
  },
  {
    name: "finite",
    url: "https://github.com/dominionthedev/finite",
    lang: "Go",
    blurb: "Programmable SVG. Diagrams, marks, and scenes as Go.",
  },
  {
    name: "mushmellow",
    url: "https://github.com/dominionthedev/mushmellow",
    lang: "Go",
    blurb: "Deterministic, local-first orchestration for development workflows.",
  },
  {
    name: "sheme",
    url: "https://github.com/dominionthedev/sheme",
    lang: "Go",
    blurb: "Shell themes generated from wondertone palettes.",
  },
  {
    name: "odd",
    url: "https://github.com/dominionthedev/odd",
    lang: "Rust",
    blurb: "A weird way to deal with the filesystem.",
  },
  {
    name: "loom",
    url: "https://github.com/dominionthedev/loom",
    lang: "Go",
    blurb: "Weave your development workflow. Where execution thinks.",
  },
  {
    name: "aether",
    url: "https://github.com/dominionthedev/aether",
    lang: "TypeScript",
    blurb: "A terminal from the void.",
  },
  {
    name: "nvim-timeline",
    url: "https://github.com/dominionthedev/nvim-timeline",
    lang: "Lua",
    blurb: "Git-like history for individual files in Neovim.",
  },
  {
    name: "neobar",
    url: "https://github.com/dominionthedev/neobar",
    lang: "Lua",
    blurb: "A VSCode-like activity bar for Neovim.",
  },
  {
    name: "git.yazi",
    url: "https://github.com/dominionthedev/git.yazi",
    lang: "Lua",
    blurb: "Git file status as linemode for Yazi.",
  },
  {
    name: "crontask",
    url: "https://github.com/dominionthedev/crontask",
    lang: "Go",
    blurb: "Laptop automations via crontab and launchd.",
  },
  {
    name: "tplate",
    url: "https://github.com/dominionthedev/tplate",
    lang: "Go",
    blurb: "tmux session template manager.",
  },
  {
    name: "panewatch",
    url: "https://github.com/dominionthedev/panewatch",
    lang: "Go",
    blurb: "Notify when a tmux pane you aren't watching finishes or stalls.",
  },
  {
    name: "genflow",
    url: "https://github.com/dominionthedev/genflow",
    lang: "Go",
    blurb: "Flow-based reasoning and decision systems.",
  },
  {
    name: "lean",
    url: "https://github.com/dominionthedev/lean",
    lang: "Go",
    blurb: "A smart tool for managing env files.",
  },
  {
    name: "ollacloud",
    url: "https://github.com/dominionthedev/ollacloud",
    lang: "Go",
    blurb: "Use Ollama Cloud without downloading Ollama.",
  },
  {
    name: "alfig",
    url: "https://github.com/dominionthedev/alfig",
    lang: "Python",
    blurb: "Unified config: TOML, JSON, YAML, and CONF interchangeably.",
  },
];

export const FEATURED = PROJECTS[0]!;
export const CATALOG = PROJECTS.slice(1);

export const LINKS = [
  { href: "https://github.com/dominionthedev", label: "GitHub", detail: "github.com/dominionthedev" },
  { href: `mailto:${SITE_EMAIL}`, label: "Email", detail: SITE_EMAIL },
  { href: "https://x.com/dominionthedev", label: "X", detail: "x.com/dominionthedev" },
] as const;

export function colorFor(lang: string) {
  return (LANG_COLOR as Record<string, string>)[lang] ?? "#7cffb2";
}
