import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import ShowAllButton from './ShowAllButton';

const meta = {
  title: 'Components/Buttons/ShowAllButton',
  component: ShowAllButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ShowAllButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /show all days/i });
    await expect(link).toBeInTheDocument();
  },
};

export const Interaction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /show all days/i });
    await expect(link).toHaveAttribute('href', '/');
  },
};
