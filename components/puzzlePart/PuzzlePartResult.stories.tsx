import type { Meta, StoryObj } from '@storybook/react';
import PuzzlePartResult from './PuzzlePartResult';
import { PuzzlePartIDContext } from '@/lib/context';

const meta = {
  title: 'Components/PuzzlePart/PuzzlePartResult',
  component: PuzzlePartResult,
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
} satisfies Meta<typeof PuzzlePartResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
