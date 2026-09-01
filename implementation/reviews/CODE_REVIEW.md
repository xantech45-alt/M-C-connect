# Code Review

> Agent that writes code is not the only agent that approves it. This document captures every code review pass.

---

## Per-file checks

- Architecture: no feature → composite leaks; no composite → feature leaks.
- Maintainability: small, named, single-responsibility functions.
- No duplicate components, routes, stores, styles, or utils.
- Naming: `PascalCase` components; `camelCase` hooks/utils; `SCREAMING_SNAKE_CASE` constants.
- Component boundaries: props typed, defaults explicit.
- Hooks: dependency arrays correct; effects narrow.
- Error handling: catch only where useful; never empty catches.
- Accessibility: semantic HTML; ARIA only when needed.
- Performance: no inline large objects; images sized.
- Testing: at least one assertion per non-trivial util.
- CSS: token-driven; no inline `#hex` or magic `px`.

## Sign-off

| Phase | Reviewer | Date | Verdict |
|-------|----------|------|---------|
| (pending) | | | |
