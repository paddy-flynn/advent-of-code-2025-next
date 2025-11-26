import type { Meta, StoryObj } from '@storybook/react';
import RunAllButton from './RunAllButton';

const meta = {
  title: 'Components/Buttons/RunAllButton',
  component: RunAllButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    allDays: ['01', '02', '03', '04', '05'],
  },
} satisfies Meta<typeof RunAllButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleDay: Story = {
  args: {
    allDays: ['01'],
  },
};

export const ManyDays: Story = {
  args: {
    allDays: Array.from({ length: 25 }, (_, i) => String(i + 1).padStart(2, '0')),
  },
};
