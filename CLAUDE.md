# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
nvm use 24                    # Node ≥ 20 required
npm run build                 # tsc type-check + Vite library build → dist/
npm run storybook             # Storybook dev server on :6006
npm run lint                  # ESLint (flat config, v9)
npm run format                # Prettier write
npm test                      # Vitest (browser mode via Playwright/Chromium)
npm run test:coverage         # Coverage with v8 provider
npm run build-storybook       # Static Storybook build
```

To run a single test file: `npx vitest run src/components/Button/Button.stories.ts`

## Architecture

**Library mode**: Vite outputs `dist/rembrandt.js` (ESM) + `dist/rembrandt.umd.cjs` (CJS) + `dist/index.d.ts`. React/ReactDOM are externalized (peer deps).

**Component structure**: Every component lives in `src/components/<Name>/` with four co-located files:
- `<Name>.tsx` — component + exported prop interface
- `<Name>.module.scss` — SCSS CSS Modules (camelCase class names)
- `<Name>.stories.ts` — Storybook CSF3 stories (also serve as Vitest browser tests)
- `index.ts` — re-exports component and types

New components must be exported from `src/index.ts`.

**Testing**: Vitest runs stories as browser tests via `@storybook/addon-vitest` + Playwright Chromium. Coverage excludes `*.stories.*` and `index.ts` files.

**Storybook**: `.storybook/main.ts` has a `viteFinal` hook that deletes `config.build.lib` so Storybook doesn't inherit library mode from `vite.config.ts`.

## TypeScript Constraints

- `exactOptionalPropertyTypes: true` — when forwarding optional props, use conditional spread: `{...(val !== undefined && { prop: val })}`
- `verbatimModuleSyntax: true` — use `import type` for type-only imports
- `noUncheckedIndexedAccess: true` — array/object index access returns `T | undefined`
- Story files (`**/*.stories.*`) are excluded from the main `tsconfig.json`; they're covered by Storybook's own tsconfig
