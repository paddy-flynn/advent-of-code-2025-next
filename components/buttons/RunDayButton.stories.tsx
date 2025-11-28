import type { Meta, StoryObj } from '@storybook/react';
import RunDayButton from './RunDayButton';
import { PuzzleContext } from '@/lib/context';

const meta = {
  title: 'Components/Buttons/RunDayButton',
  component: RunDayButton,
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
} satisfies Meta<typeof RunDayButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
