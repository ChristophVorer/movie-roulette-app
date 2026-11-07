import { fireEvent, render, screen } from '@testing-library/react-native';
import { router } from 'expo-router';
import { MRBackButton } from './MRBackButton';

jest.mock('expo-router', () => ({
  router: { back: jest.fn() },
}));

const backMock = jest.mocked(router.back);

beforeEach(() => {
  backMock.mockClear();
});

describe('MRBackButton', () => {
  it('is announced as a back button', async () => {
    await render(<MRBackButton />);

    expect(screen.getByRole('button', { name: 'Zurück' })).toBeOnTheScreen();
  });

  it('navigates back when pressed', async () => {
    await render(<MRBackButton />);

    await fireEvent.press(screen.getByRole('button', { name: 'Zurück' }));

    expect(backMock).toHaveBeenCalledTimes(1);
  });
});
