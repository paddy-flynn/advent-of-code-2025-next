import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import PuzzleCard from './PuzzleCard';
import { PuzzleContext } from '@/lib/context';

const meta = {
  title: 'Components/PuzzleCard',
  component: PuzzleCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <PuzzleContext.Provider
        value={{
          day: '01',
          name: 'Example Puzzle',
          input: 'sample input',
        }}
      >
        <div className="w-[800px]">
          <Story />
        </div>
      </PuzzleContext.Provider>
    ),
  ],
} satisfies Meta<typeof PuzzleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Day 01/i)).toBeInTheDocument();
    await expect(canvas.getByText(/Example Puzzle/i)).toBeInTheDocument();
  },
};

export const WithLink: Story = {
  args: {
    hideLink: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('link', { name: /Day 01 - Example Puzzle/i })).toBeInTheDocument();
  },
};

export const WithoutLink: Story = {
  args: {
    hideLink: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Day 01/i)).toBeInTheDocument();
    await expect(canvas.getByText(/Example Puzzle/i)).toBeInTheDocument();
  },
};
