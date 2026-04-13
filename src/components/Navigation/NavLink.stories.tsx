import type { Meta, StoryObj } from '@storybook/react-vite';

import { NavLink } from './NavLink';

const meta = {
  title: 'Components/Navigation',
  component: NavLink,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof NavLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { href: '#', children: 'Default link' },
};

export const Muted: Story = {
  args: { href: '#', children: 'Muted link', variant: 'muted' },
};

export const Primary: Story = {
  args: { href: '#', children: 'Primary link', variant: 'primary' },
};

export const External: Story = {
  args: {
    href: 'https://example.com',
    children: 'External link ↗',
    external: true,
    variant: 'primary',
  },
};
