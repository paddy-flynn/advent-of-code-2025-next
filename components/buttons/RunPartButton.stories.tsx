import type { Meta, StoryObj } from '@storybook/react';
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

export const Default: Story = {};
