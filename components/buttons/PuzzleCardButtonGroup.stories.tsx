import type { Meta, StoryObj } from '@storybook/react';
import PuzzleCardButtonGroup from './PuzzleCardButtonGroup';
import { PuzzleContext } from '@/lib/context';

const meta = {
  title: 'Components/Buttons/PuzzleCardButtonGroup',
  component: PuzzleCardButtonGroup,
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
        <Story />
      </PuzzleContext.Provider>
    ),
  ],
} satisfies Meta<typeof PuzzleCardButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
