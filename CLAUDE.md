# CLAUDE.md — OrangeHueGlad Design System

This file provides guidance to Claude Code when working in this repository.

---

## Commands

```bash
nvm use 24                    # Node ≥ 20 required (.nvmrc pins 24)
npm run build                 # tsc type-check + Vite library build → dist/
npm run storybook             # Storybook dev server on :6006
npm run lint                  # ESLint (flat config, v9)
npm run format                # Prettier write
npm test                      # Vitest (browser mode via Playwright/Chromium)
npm run test:coverage         # Coverage with v8 provider
npm run build-storybook       # Static Storybook build
node scripts/check-tokens.mjs # Token lint — fails if hardcoded values found
npm run chromatic             # Visual regression via Chromatic
```

To run a single test file: `npx vitest run src/components/Button/Button.stories.ts`

---

## Architecture

**Library mode**: Vite outputs `dist/ohg.js` (ESM) + `dist/ohg.umd.cjs` (CJS) + `dist/index.d.ts`. React/ReactDOM are externalized (peer deps). Package name is `@mariafaulisi/ohg`.

**Token layer**: `src/tokens/tokens.css` is the single source of truth for all design values. It is imported in `src/index.ts` so consumers receive CSS custom properties automatically. Never hardcode design values in component files.

**Component structure**: Every component lives in `src/components/<Name>/` with five co-located files:
- `<Name>.tsx` — component + exported prop interface
- `<Name>.module.scss` — SCSS CSS Modules (camelCase class names); must start with `@use '../../tokens/tokens' as t;`
- `<Name>.stories.tsx` — Storybook CSF3 stories (also serve as Vitest browser tests)
- `<Name>.mdx` — usage documentation (optional for new components, encouraged)
- `index.ts` — re-exports component and types

New components must be exported from `src/index.ts`.

**Storybook taxonomy**:
```
Introduction      ← portfolio landing page
Tokens/Colors
Tokens/Typography
Tokens/Spacing
Components/*      ← individual components
Patterns/*        ← composed patterns (Header, Page)
Contributing
```

**Testing**: Vitest runs stories as browser tests via `@storybook/addon-vitest` + Playwright Chromium. Coverage excludes `*.stories.*` and `index.ts` files.

**Storybook**: `.storybook/main.ts` has a `viteFinal` hook that deletes `config.build.lib` so Storybook doesn't inherit library mode from `vite.config.ts`. When `CI=true`, it also sets `config.base = '/OrangeHueGlad/'` for GitHub Pages.

---

## Token system

All design values are CSS custom properties prefixed `--ohg-*` defined in `src/tokens/tokens.css`.

### Token files
| File | Purpose |
|------|---------|
| `src/tokens/tokens.css` | `:root { --ohg-* }` — single source of truth |
| `src/tokens/tokens.scss` | SCSS vars wrapping each CSS custom property via `var()` |
| `src/tokens/tokens.ts` | TypeScript constants for JS consumers (animations, inline styles) |
| `src/tokens/tokens.figma.json` | W3C DTCG format — read/written by Figma MCP |

### SCSS consumption pattern
```scss
@use '../../tokens/tokens' as t;

.myComponent {
  color: t.$color-text-primary;
  font-family: t.$font-family-base;
  padding: t.$spacing-4;
}
```

### Accessing CSS module classes safely
CSS modules are typed `{ readonly [key: string]: string }`. With `noUncheckedIndexedAccess`, access returns `string | undefined`. Use `?? ''` for safety:
```typescript
const sizeClass = styles.sizeMd ?? '';
```

### Token lint enforcement
`node scripts/check-tokens.mjs` — run locally and in CI. Fails if any `.tsx` or `.module.scss` file in `src/components/` contains hardcoded hex colors or font-family strings.

---

## TypeScript constraints

- `exactOptionalPropertyTypes: true` — when forwarding optional props, use conditional spread: `{...(val !== undefined && { prop: val })}`
- `verbatimModuleSyntax: true` — use `import type` for type-only imports
- `noUncheckedIndexedAccess: true` — array/object index access returns `T | undefined`
- `noUnusedLocals / noUnusedParameters: true` — no dead code
- Story files (`**/*.stories.*`) are excluded from the main `tsconfig.json`; they're covered by Storybook's own tsconfig

---

## GitHub Actions

| Workflow | Triggers | Jobs |
|----------|---------|------|
| `ci.yml` | PR → main | lint, typecheck, build-lib, test, build-storybook, token-lint |
| `chromatic.yml` | PR → main | Visual regression via Chromatic TurboSnap |
| `publish.yml` | push main / `v*` tags | deploy Storybook to GitHub Pages; publish npm on tags |

Required GitHub secrets: `CHROMATIC_PROJECT_TOKEN`, `NODE_AUTH_TOKEN`.

---

## Figma MCP workflow

See `docs/figma-mcp-workflow.md` for full instructions.

**Design → Code**: Provide a Figma node ID → Claude reads component via MCP → generates `.tsx`, `.module.scss`, `.stories.tsx`, `index.ts`, `specs/<Name>.spec.md`.

**Code → Design**: Claude reads `.tsx` + `.module.scss` → pushes Figma component via MCP write API → updates spec file with returned node ID.

Component specs live in `specs/` with frontmatter tracking `figma_node_id`, `figma_file_key`, and `status` (`figma-only | implemented | diverged | synced`).

---

## Release process

1. Bump `version` in `package.json`
2. Commit: `git commit -m "chore: release v0.x.0"`
3. Push and tag: `git tag v0.x.0 && git push && git push --tags`
4. GitHub Actions publishes to npm (`@mariafaulisi/ohg`) and redeploys Storybook to GitHub Pages
