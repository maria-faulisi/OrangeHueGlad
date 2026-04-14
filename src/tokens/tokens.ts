/**
 * OrangeHueGlad design tokens — TypeScript constants.
 *
 * Use these when token values are needed in JavaScript:
 *   - Inline style overrides
 *   - Animation configs (Framer Motion / motion)
 *   - Theme providers
 *
 * Each value references a CSS custom property so runtime theming still works.
 */

export const tokens = {
  color: {
    primary: {
      default:  'var(--ohg-color-primary-default)',
      hover:    'var(--ohg-color-primary-hover)',
      active:   'var(--ohg-color-primary-active)',
      disabled: 'var(--ohg-color-primary-disabled)',
    },
    success: {
      bg:   'var(--ohg-color-success-bg)',
      text: 'var(--ohg-color-success-text)',
    },
    info: 'var(--ohg-color-info)',
    text: {
      primary:       'var(--ohg-color-text-primary)',
      muted:         'var(--ohg-color-text-muted)',
      inverse:       'var(--ohg-color-text-inverse)',
      inverseSubtle: 'var(--ohg-color-text-inverse-subtle)',
    },
    surface: {
      hover:    'var(--ohg-color-surface-hover)',
      active:   'var(--ohg-color-surface-active)',
      disabled: 'var(--ohg-color-surface-disabled)',
    },
    border: {
      subtle: 'var(--ohg-color-border-subtle)',
      shadow: 'var(--ohg-color-border-shadow)',
    },
    focus: {
      ring: 'var(--ohg-color-focus-ring)',
    },
  },

  font: {
    family: {
      base: 'var(--ohg-font-family-base)',
    },
    size: {
      xs:  'var(--ohg-font-size-xs)',
      sm:  'var(--ohg-font-size-sm)',
      md:  'var(--ohg-font-size-md)',
      lg:  'var(--ohg-font-size-lg)',
      xl:  'var(--ohg-font-size-xl)',
      '2xl': 'var(--ohg-font-size-2xl)',
    },
    weight: {
      regular: 'var(--ohg-font-weight-regular)',
      bold:    'var(--ohg-font-weight-bold)',
    },
    lineHeight: {
      tight: 'var(--ohg-line-height-tight)',
      base:  'var(--ohg-line-height-base)',
      dense: 'var(--ohg-line-height-dense)',
    },
  },

  spacing: {
    1:  'var(--ohg-spacing-1)',
    2:  'var(--ohg-spacing-2)',
    3:  'var(--ohg-spacing-3)',
    4:  'var(--ohg-spacing-4)',
    5:  'var(--ohg-spacing-5)',
    6:  'var(--ohg-spacing-6)',
    7:  'var(--ohg-spacing-7)',
    8:  'var(--ohg-spacing-8)',
    9:  'var(--ohg-spacing-9)',
    10: 'var(--ohg-spacing-10)',
    11: 'var(--ohg-spacing-11)',
  },

  radius: {
    pill:        'var(--ohg-radius-pill)',
    sm:          'var(--ohg-radius-sm)',
    focusOffset: 'var(--ohg-radius-focus-offset)',
  },

  transition: {
    default: 'var(--ohg-transition-default)',
  },
} as const;
