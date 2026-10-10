export interface SideProject {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  topics: string[];
  status: "production" | "development" | "archived";
}

// Star/fork counts are a snapshot from the GitHub API on 2026-10-10.
export const sideProjects: SideProject[] = [
  {
    id: "jarvis",
    title: "jarvis",
    description:
      "Local-first code-intelligence MCP server. Hybrid retrieval fuses dense vectors, Zoekt lexical search, and SCIP symbols via reciprocal rank fusion. On PyPI (jarvis-mcp) and the official MCP Registry.",
    githubUrl: "https://github.com/jarvis-intelligence/jarvis",
    language: "Python",
    languageColor: "#3572A5",
    stars: 4,
    forks: 0,
    topics: ["mcp", "code-intelligence", "scip", "tree-sitter", "lancedb"],
    status: "production",
  },
  {
    id: "llm-gateway",
    title: "LLM Gateway",
    description:
      "OpenAI-compatible gateway routing to 500+ models behind one key, capturing TTFT, latency, and token usage per request, with an agent-run trace viewer and per-model circuit breakers.",
    githubUrl: "https://github.com/phuongddx/llm-gateway",
    language: "Python",
    languageColor: "#3572A5",
    stars: 0,
    forks: 0,
    topics: ["llm", "gateway", "observability", "fastapi", "sse"],
    status: "production",
  },
  {
    id: "spm-cache",
    title: "spm-cache",
    description:
      "Swift Package Manager xcframework cache proxy, shipped with a Homebrew tap and a GitHub Action.",
    githubUrl: "https://github.com/phuongddx/spm-cache",
    language: "Ruby",
    languageColor: "#CC342D",
    stars: 1,
    forks: 0,
    topics: ["swift-package-manager", "xcframework", "cache", "homebrew", "github-actions"],
    status: "production",
  },
];
