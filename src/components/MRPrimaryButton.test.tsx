import { fireEvent, render, screen } from '@testing-library/react-native';
import { MRPrimaryButton } from './MRPrimaryButton';

describe('MRPrimaryButton', () => {
  it('renders the title', async () => {
    await render(<MRPrimaryButton title="Anmelden" onPress={jest.fn()} />);

    expect(screen.getByText('Anmelden')).toBeOnTheScreen();
  });

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    await render(<MRPrimaryButton title="Anmelden" onPress={onPress} />);

    await fireEvent.press(screen.getByText('Anmelden'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
