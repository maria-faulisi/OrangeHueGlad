# Figma MCP Workflow

This document explains the bi-directional design ↔ code workflow used to build OrangeHueGlad components with Claude + Figma MCP.

---

## Setup

**Requirements:**
- Claude Code (CLI or desktop app) with Figma MCP enabled
- Figma personal access token with `files:read`, `variables:read`, `variables:write` scopes
- The OrangeHueGlad Figma file (file key recorded below)

**Figma file reference:**
- File key: *(fill in when Figma file is created)*
- Team ID: *(fill in)*
- Variables collection: `OHG / Tokens`

---

## Design → Code

Use this workflow when a component exists in Figma and you want to generate a React component.

**Step 1.** Open the Figma file and select the component frame.

**Step 2.** Copy the node ID from the URL: `?node-id=X%3AY` → node ID is `X:Y`.

**Step 3.** In Claude Code, use this prompt template:

```
Read the Figma component at node "X:Y" in file "FILE_KEY" using the Figma MCP.
Generate a React component following OrangeHueGlad conventions:
- TypeScript with strict mode
- SCSS CSS Modules with @use '../../tokens/tokens' as t
- Storybook CSF3 story (.stories.tsx)
- index.ts export
- specs/ComponentName.spec.md
Map all Figma variables to --ohg-* tokens from src/tokens/tokens.css.
```

**Step 4.** Review generated files, run `npm run build && npm test`.

**Step 5.** Update `src/index.ts` to export the new component.

---

## Code → Design

Use this workflow when a React component is finished and you want to create or update its Figma counterpart.

**Step 1.** In Claude Code, use this prompt template:

```
Read src/components/ComponentName/ComponentName.tsx and ComponentName.module.scss.
Using the Figma MCP, create (or update) a Figma component in file "FILE_KEY" that:
- Maps all --ohg-* CSS custom properties to Figma Variables in the OHG/Tokens collection
- Creates component properties matching the TypeScript props interface
- Sets up variant groups for each prop union type
Return the created node ID and update specs/ComponentName.spec.md.
```

**Step 2.** Verify the component appears in Figma with correct variable bindings.

**Step 3.** The spec file is updated with the Figma node ID — commit it.

---

## Token sync

When design tokens change (new color, updated spacing):

1. Update `src/tokens/tokens.css` — the source of truth
2. `tokens.scss`, `tokens.ts`, and `tokens.figma.json` derive from this file
3. Run this Claude prompt to push updated variables to Figma:

```
Read src/tokens/tokens.figma.json and update the Figma Variables collection
"OHG/Tokens" in file "FILE_KEY" using the Figma MCP Variables write API.
```

---

## Session log

Record each MCP session below for portfolio evidence.

### Session 1 — Initial token sync
- Date: *(fill in)*
- Direction: Code → Figma
- Claude prompt: *(paste prompt)*
- Result: *(what was created/updated)*

### Session 2 — Button component
- Date: *(fill in)*
- Direction: Code → Figma
- Claude prompt: *(paste prompt)*
- Result: *(Figma node ID created)*
