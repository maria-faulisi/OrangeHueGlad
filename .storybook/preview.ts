import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo'  — show violations in the test UI but do not fail CI
      // 'error' — fail CI on a11y violations (upgrade when baseline is clean)
      // 'off'   — skip a11y checks entirely
      test: 'todo',
    },

    // Component status badge — set per-story via parameters.status
    status: {
      statuses: {
        alpha:      { background: '#FFF3CD', color: '#856404', description: 'In progress, API may change' },
        beta:       { background: '#CCE5FF', color: '#004085', description: 'Stable but gathering feedback' },
        stable:     { background: '#D4EDDA', color: '#155724', description: 'Production ready' },
        deprecated: { background: '#F8D7DA', color: '#721C24', description: 'Do not use in new work' },
      },
    },
  },

  // Storybook story sort — Introduction first, then Tokens, Components, Patterns
  options: {
    storySort: {
      order: [
        'Introduction',
        'Tokens',
        'Components',
        'Patterns',
      ],
    },
  },
};

export default preview;
