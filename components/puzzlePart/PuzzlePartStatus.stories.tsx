import type { Meta, StoryObj } from '@storybook/react';
import PuzzlePartStatus from './PuzzlePartStatus';
import { PuzzlePartIDContext } from '@/lib/context';
import { Provider, createStore } from 'jotai';
import { 
  puzzlePartErrorState, 
  puzzlePartResultState,
  queuedPuzzlePartsState,
  currentlyRunningPuzzlePartState
} from '@/lib/atoms';

const meta = {
  title: 'Components/PuzzlePart/PuzzlePartStatus',
  component: PuzzlePartStatus,
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
} satisfies Meta<typeof PuzzlePartStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <PuzzlePartIDContext.Provider value="01-1">
          <Story />
        </PuzzlePartIDContext.Provider>
      </Provider>
    ),
  ],
};

export const Success: Story = {
  decorators: [
    (Story) => {
      const store = createStore();
      store.set(puzzlePartResultState('01-1'), 12345);
      return (
        <Provider store={store}>
          <PuzzlePartIDContext.Provider value="01-1">
            <Story />
          </PuzzlePartIDContext.Provider>
        </Provider>
      );
    },
  ],
};

export const Failed: Story = {
  decorators: [
    (Story) => {
      const store = createStore();
      const error = new Error('Something went wrong');
      store.set(puzzlePartErrorState('01-1'), error);
      return (
        <Provider store={store}>
          <PuzzlePartIDContext.Provider value="01-1">
            <Story />
          </PuzzlePartIDContext.Provider>
        </Provider>
      );
    },
  ],
};

export const Running: Story = {
  decorators: [
    (Story) => {
      const store = createStore();
      store.set(queuedPuzzlePartsState, ['01-1']);
      store.set(currentlyRunningPuzzlePartState, '01-1');
      return (
        <Provider store={store}>
          <PuzzlePartIDContext.Provider value="01-1">
            <Story />
          </PuzzlePartIDContext.Provider>
        </Provider>
      );
    },
  ],
};

export const Queued: Story = {
  decorators: [
    (Story) => {
      const store = createStore();
      store.set(queuedPuzzlePartsState, ['01-1', '01-2']);
      store.set(currentlyRunningPuzzlePartState, '01-2');
      return (
        <Provider store={store}>
          <PuzzlePartIDContext.Provider value="01-1">
            <Story />
          </PuzzlePartIDContext.Provider>
        </Provider>
      );
    },
  ],
};

export const Default: Story = Idle;
