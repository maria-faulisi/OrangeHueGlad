import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: { label: 'Tip', variant: 'success' },
};

export const Neutral: Story = {
  args: { label: 'Draft', variant: 'neutral' },
};

export const Primary: Story = {
  args: { label: 'New', variant: 'primary' },
};

export const SizeMd: Story = {
  name: 'Size: Medium',
  args: { label: 'Tip', variant: 'success', size: 'md' },
};
