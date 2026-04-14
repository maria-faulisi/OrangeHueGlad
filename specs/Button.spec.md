---
component: Button
figma_node_id: ""
figma_file_key: ""
status: implemented
last_synced: ""
---

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `primary` | `boolean` | `false` | Primary (filled) vs secondary (outlined) style |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `label` | `string` | — | Button text content |
| `backgroundColor` | `string` | — | Override background (escape hatch) |
| `disabled` | `boolean` | — | Disabled state |
| `onClick` | `() => void` | — | Click handler |

## Design Tokens Used

| Token | CSS Custom Property | Purpose |
|-------|---------------------|---------|
| `$color-primary-default` | `--ohg-color-primary-default` | Primary fill |
| `$color-primary-hover` | `--ohg-color-primary-hover` | Primary hover fill |
| `$color-primary-active` | `--ohg-color-primary-active` | Primary pressed fill |
| `$color-primary-disabled` | `--ohg-color-primary-disabled` | Primary disabled fill |
| `$color-text-inverse` | `--ohg-color-text-inverse` | Label on primary |
| `$color-text-inverse-subtle` | `--ohg-color-text-inverse-subtle` | Label on disabled primary |
| `$color-text-primary` | `--ohg-color-text-primary` | Label on secondary |
| `$color-text-muted` | `--ohg-color-text-muted` | Label on disabled secondary |
| `$color-border-shadow` | `--ohg-color-border-shadow` | Secondary border shadow |
| `$color-surface-hover` | `--ohg-color-surface-hover` | Secondary hover bg |
| `$color-surface-active` | `--ohg-color-surface-active` | Secondary active bg |
| `$color-focus-ring` | `--ohg-color-focus-ring` | Focus outline |
| `$radius-pill` | `--ohg-radius-pill` | Border radius |
| `$font-family-base` | `--ohg-font-family-base` | Typeface |
| `$font-weight-bold` | `--ohg-font-weight-bold` | Label weight |
| `$button-padding-sm/md/lg` | `--ohg-button-padding-*` | Size padding |
| `$font-size-sm/md/lg` | `--ohg-font-size-*` | Size font-size |

## Variants / Stories

| Story name | Description |
|------------|-------------|
| Primary | Primary filled button |
| Secondary | Outlined button |
| Large | Large size |
| Small | Small size |
| PrimaryDisabled | Disabled primary |
| SecondaryDisabled | Disabled secondary |

## A11y notes

- [x] `type="button"` prevents accidental form submission
- [x] `disabled` attribute disables focus and interaction
- [x] Focus ring visible via `focus-visible` pseudo-class
- [x] Contrast ratios meet WCAG AA for all variants
