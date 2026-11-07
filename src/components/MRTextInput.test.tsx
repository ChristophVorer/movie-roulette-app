import { fireEvent, render, screen } from '@testing-library/react-native';
import { MRTextInput } from './MRTextInput';

describe('MRTextInput', () => {
  it('forwards text changes', async () => {
    const onChangeText = jest.fn();
    await render(
      <MRTextInput placeholder="E-Mail" onChangeText={onChangeText} />,
    );

    await fireEvent.changeText(
      screen.getByPlaceholderText('E-Mail'),
      'christoph@example.com',
    );

    expect(onChangeText).toHaveBeenCalledWith('christoph@example.com');
  });

  it('shows the error message when an error is set', async () => {
    await render(
      <MRTextInput
        placeholder="E-Mail"
        error="Die E-Mail-Adresse ist ungültig."
      />,
    );

    expect(
      screen.getByText('Die E-Mail-Adresse ist ungültig.'),
    ).toBeOnTheScreen();
  });

  it('shows no error message without error', async () => {
    await render(<MRTextInput placeholder="E-Mail" />);

    expect(screen.queryByText(/ungültig/)).not.toBeOnTheScreen();
  });

  it('respects secureTextEntry when not used as password field', async () => {
    await render(<MRTextInput placeholder="PIN" secureTextEntry />);

    expect(screen.getByPlaceholderText('PIN')).toHaveProp(
      'secureTextEntry',
      true,
    );
    expect(
      screen.queryByRole('button', { name: 'Passwort anzeigen' }),
    ).not.toBeOnTheScreen();
  });

  describe('as password field', () => {
    it('hides the password by default', async () => {
      await render(<MRTextInput placeholder="Passwort" isPassword />);

      expect(screen.getByPlaceholderText('Passwort')).toHaveProp(
        'secureTextEntry',
        true,
      );
    });

    it('toggles password visibility', async () => {
      await render(<MRTextInput placeholder="Passwort" isPassword />);
      const input = screen.getByPlaceholderText('Passwort');

      await fireEvent.press(
        screen.getByRole('button', { name: 'Passwort anzeigen' }),
      );
      expect(input).toHaveProp('secureTextEntry', false);

      await fireEvent.press(
        screen.getByRole('button', { name: 'Passwort verbergen' }),
      );
      expect(input).toHaveProp('secureTextEntry', true);
    });
  });
});
