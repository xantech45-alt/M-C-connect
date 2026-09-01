# Tool Capability Map

> Verified capabilities only. No hallucinations.

---

## 1. Available capabilities in this environment

| Capability | Status | Used by |
|------------|--------|---------|
| `Read`, `Write`, `Edit`, `Glob`, `Grep` | ✅ | All agents |
| `Bash` (git, npm, node, powershell) | ✅ | Bootstrap, build, test |
| `Task` (sub-agents) | ✅ | Parallel work-streams |
| `Skill` (slash commands) | ✅ | Project skills if available |
| `MCP: context7` | ✅ | Library docs (React, Vite, Lucide) |
| `MCP: chrome-devtools-mcp` | ✅ | Browser QA, screenshot review |
| `MCP: playwright` | ✅ | Browser automation, screenshot capture |

## 2. Map: task → capability → fallback

| Task | Primary | Fallback |
|------|---------|----------|
| Bootstrap React + Vite + TS | npm / Bash | - |
| Install Inter font | Google Fonts `<link>` in `index.html` (self-hosted woff2 preferred for prod) | System fallbacks declared in `--font-sans` |
| Icon library | `lucide-react` (MIT, outline, 1.5px stroke) | inline SVG fallback |
| Styling | Vanilla CSS modules + design tokens (no Tailwind - keeps blueprint authority) | CSS-in-JS |
| Routing | `react-router-dom` v6+ | `@tanstack/router` |
| Form state | React Hook Form + Zod | uncontrolled with manual validate |
| Server state (mock layer) | Custom hooks + mocks | TanStack Query pointed at mocks |
| Charts (dashboard) | Recharts (lightweight, accessible) | inline SVG sparkline |
| Testing | Vitest + @testing-library/react | Jest |
| Visual QA | `chrome-devtools-mcp` + `playwright` MCP | manual |
| Lint | ESLint + typescript-eslint | - |
| Format | Prettier | - |

## 3. Plugins / skills available

| Plugin | Purpose | Used? |
|--------|---------|-------|
| `cortex:*` skills (loaded) | Project SDLC automation; not authoritative for this implementation | Optional / parallel |
| `chrome-devtools-mcp` | Browser automation, screenshots | Yes - visual review |
| `playwright` | Headless browser QA | Yes - screenshot review |
| `context7` | Library docs | Yes - for React/Router/Vite specifics |

> All other MCP servers visible in the session are unrelated to this project and are **not** used.
