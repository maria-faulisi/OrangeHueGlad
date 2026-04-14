import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <p style={{ margin: 0 }}>Card content goes here.</p>
    </Card>
  ),
  args: {},
};

export const Raised: Story = {
  render: (args) => (
    <Card {...args}>
      <p style={{ margin: 0 }}>Raised card with shadow.</p>
    </Card>
  ),
  args: { elevation: 'raised' },
};

export const PaddingSm: Story = {
  name: 'Padding: Small',
  render: (args) => (
    <Card {...args}>
      <p style={{ margin: 0 }}>Compact padding.</p>
    </Card>
  ),
  args: { padding: 'sm' },
};

export const AsArticle: Story = {
  name: 'Semantic: article',
  render: (args) => (
    <Card {...args}>
      <h2 style={{ margin: '0 0 8px' }}>Article heading</h2>
      <p style={{ margin: 0 }}>This card renders as an article element.</p>
    </Card>
  ),
  args: { as: 'article', elevation: 'raised' },
};
