import type { Meta, StoryObj } from '@storybook/react';
import PuzzlePartRow from './PuzzlePartRow';
import { PuzzlePartIDContext } from '@/lib/context';

const meta = {
  title: 'Components/PuzzlePart/PuzzlePartRow',
  component: PuzzlePartRow,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <PuzzlePartIDContext.Provider value="01-1">
        <div className="w-[800px]">
          <ul>
            <Story />
          </ul>
        </div>
      </PuzzlePartIDContext.Provider>
    ),
  ],
} satisfies Meta<typeof PuzzlePartRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Part1: Story = {};

export const Part2: Story = {
  decorators: [
    (Story) => (
      <PuzzlePartIDContext.Provider value="01-2">
        <div className="w-[800px]">
          <ul>
            <Story />
          </ul>
        </div>
      </PuzzlePartIDContext.Provider>
    ),
  ],
};
