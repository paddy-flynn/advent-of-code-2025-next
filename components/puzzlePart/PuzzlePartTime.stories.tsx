import type { Meta, StoryObj } from '@storybook/react';
import PuzzlePartTime from './PuzzlePartTime';
import { PuzzlePartIDContext } from '@/lib/context';

const meta = {
  title: 'Components/PuzzlePart/PuzzlePartTime',
  component: PuzzlePartTime,
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
} satisfies Meta<typeof PuzzlePartTime>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
