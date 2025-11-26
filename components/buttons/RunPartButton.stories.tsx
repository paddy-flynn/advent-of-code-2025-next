import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import RunPartButton from './RunPartButton';
import { PuzzlePartIDContext } from '@/lib/context';

const meta = {
  title: 'Components/Buttons/RunPartButton',
  component: RunPartButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <PuzzlePartIDContext.Provider value="01-1">
        <Story />
      </PuzzlePartIDContext.Provider>
    ),
  ],
} satisfies Meta<typeof RunPartButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /run/i });
    await expect(button).toBeInTheDocument();
    await expect(button).toBeEnabled();
  },
};

export const Interaction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /run/i });
    await userEvent.click(button);
    await expect(button).toBeInTheDocument();
  },
};
