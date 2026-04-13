import type { Meta, StoryObj } from '@storybook/react-vite';

import { Heading } from './Heading';

const meta = {
  title: 'Components/Typography',
  component: Heading,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: { level: 1, children: 'The quick brown fox' },
};

export const H2: Story = {
  args: { level: 2, children: 'The quick brown fox' },
};

export const H3: Story = {
  args: { level: 3, children: 'The quick brown fox' },
};

export const H4: Story = {
  args: { level: 4, children: 'The quick brown fox' },
};

export const DecoupledSize: Story = {
  name: 'Semantic h1 / Visual xl',
  args: { level: 1, size: 'xl', children: 'h1 rendered at xl size' },
};

export const TypeScale: Story = {
  name: 'Full Type Scale',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Heading level={1} size="2xl">2xl — 32px</Heading>
      <Heading level={2} size="xl">xl — 20px</Heading>
      <Heading level={3} size="lg">lg — 16px</Heading>
      <Heading level={4} size="md">md — 14px</Heading>
      <Heading level={4} size="sm">sm — 12px</Heading>
    </div>
  ),
};
