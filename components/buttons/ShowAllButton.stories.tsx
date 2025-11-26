import type { Meta, StoryObj } from '@storybook/react';
import ShowAllButton from './ShowAllButton';

const meta = {
  title: 'Components/Buttons/ShowAllButton',
  component: ShowAllButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ShowAllButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
