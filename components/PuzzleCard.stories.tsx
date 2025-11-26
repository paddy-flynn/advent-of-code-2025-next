import type { Meta, StoryObj } from '@storybook/react';
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
          part1: () => 'part1 result',
          part2: () => 'part2 result',
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

export const Default: Story = {};

export const WithLink: Story = {
  args: {
    hideLink: false,
  },
};

export const WithoutLink: Story = {
  args: {
    hideLink: true,
  },
};
