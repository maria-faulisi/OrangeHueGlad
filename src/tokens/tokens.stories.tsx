import type { Meta } from '@storybook/react-vite';

// Excluded from Vitest browser tests — display-only, no interactions to assert.
// tags: ['!test'] prevents this story from running as a test.

const meta = {
  title: 'Tokens/Colors',
  tags: ['!test'],
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;

// ─── Color token definitions for the swatch grid ──────────────────────────────

const colorTokens: { name: string; variable: string; group: string }[] = [
  { group: 'Primary',  name: 'Default',  variable: '--ohg-color-primary-default' },
  { group: 'Primary',  name: 'Hover',    variable: '--ohg-color-primary-hover' },
  { group: 'Primary',  name: 'Active',   variable: '--ohg-color-primary-active' },
  { group: 'Primary',  name: 'Disabled', variable: '--ohg-color-primary-disabled' },
  { group: 'Success',  name: 'BG',       variable: '--ohg-color-success-bg' },
  { group: 'Success',  name: 'Text',     variable: '--ohg-color-success-text' },
  { group: 'Info',     name: 'Default',  variable: '--ohg-color-info' },
  { group: 'Text',     name: 'Primary',  variable: '--ohg-color-text-primary' },
  { group: 'Text',     name: 'Muted',    variable: '--ohg-color-text-muted' },
  { group: 'Text',     name: 'Inverse',  variable: '--ohg-color-text-inverse' },
  { group: 'Surface',  name: 'Hover',    variable: '--ohg-color-surface-hover' },
  { group: 'Surface',  name: 'Active',   variable: '--ohg-color-surface-active' },
  { group: 'Border',   name: 'Subtle',   variable: '--ohg-color-border-subtle' },
  { group: 'Focus',    name: 'Ring',     variable: '--ohg-color-focus-ring' },
];

const Swatch = ({ name, variable, group }: { name: string; variable: string; group: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
    <div
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '6px',
        background: `var(${variable})`,
        border: '1px solid rgba(0,0,0,0.1)',
        flexShrink: 0,
      }}
    />
    <div>
      <div style={{ fontWeight: 700, fontSize: '13px' }}>{group} / {name}</div>
      <code style={{ fontSize: '11px', color: '#666' }}>{variable}</code>
    </div>
  </div>
);

export const ColorPalette = {
  name: 'Color Palette',
  render: () => (
    <div style={{ fontFamily: 'var(--ohg-font-family-base)', maxWidth: '480px' }}>
      <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>Color Tokens</h2>
      {colorTokens.map((t) => (
        <Swatch key={t.variable} {...t} />
      ))}
    </div>
  ),
};
