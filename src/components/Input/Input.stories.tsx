import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { id: 'default', label: 'Email address' },
};

export const WithHint: Story = {
  args: {
    id: 'with-hint',
    label: 'Email address',
    hint: 'We will never share your email.',
  },
};

export const WithError: Story = {
  args: {
    id: 'with-error',
    label: 'Email address',
    error: 'Please enter a valid email address.',
    defaultValue: 'not-an-email',
  },
};

export const Disabled: Story = {
  args: {
    id: 'disabled',
    label: 'Email address',
    disabled: true,
    defaultValue: 'user@example.com',
  },
};

export const SizeSm: Story = {
  name: 'Size: Small',
  args: { id: 'size-sm', label: 'Email address', size: 'sm' },
};

export const SizeLg: Story = {
  name: 'Size: Large',
  args: { id: 'size-lg', label: 'Email address', size: 'lg' },
};

export const FullWidth: Story = {
  args: { id: 'full-width', label: 'Email address', fullWidth: true },
  parameters: { layout: 'padded' },
};
