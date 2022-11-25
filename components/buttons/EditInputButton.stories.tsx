import type { Meta, StoryObj } from '@storybook/react';
import EditInputButton from './EditInputButton';
import { PuzzleContext } from '@/lib/context';

const meta = {
  title: 'Components/Buttons/EditInputButton',
  component: EditInputButton,
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
} satisfies Meta<typeof EditInputButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
