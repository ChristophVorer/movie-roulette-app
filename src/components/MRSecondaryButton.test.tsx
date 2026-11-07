import { fireEvent, render, screen } from '@testing-library/react-native';
import { MRSecondaryButton } from './MRSecondaryButton';

describe('MRSecondaryButton', () => {
  it('renders the title', async () => {
    await render(
      <MRSecondaryButton title="Registrieren" onPress={jest.fn()} />,
    );

    expect(screen.getByText('Registrieren')).toBeOnTheScreen();
  });

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    await render(<MRSecondaryButton title="Registrieren" onPress={onPress} />);

    await fireEvent.press(screen.getByText('Registrieren'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
