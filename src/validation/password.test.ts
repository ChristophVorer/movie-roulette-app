import {
  PASSWORD_COMPOSITION_MESSAGE,
  PASSWORD_LENGTH_MESSAGE,
  PASSWORD_REQUIRED_MESSAGE,
  validatePassword,
} from './password';

describe('validatePassword', () => {
  it.each([
    'MeinSicheresPasswort123!',
    'Abcdef1!',
    'Übergröße9#',
    'Pass wort1!',
  ])('accepts %s', (password) => {
    expect(validatePassword(password)).toEqual([]);
  });

  it.each([
    'meinpasswort123!',
    'MEINPASSWORT123!',
    'MeinPasswort!',
    'MeinPasswort123',
    'MeinPasswort 123',
  ])('rejects %s for missing character classes', (password) => {
    expect(validatePassword(password)).toEqual([PASSWORD_COMPOSITION_MESSAGE]);
  });

  it('rejects a too short password', () => {
    expect(validatePassword('Ab1!xyz')).toEqual([PASSWORD_LENGTH_MESSAGE]);
  });

  it('rejects a too long password', () => {
    expect(validatePassword('Aa1!' + 'x'.repeat(61))).toEqual([
      PASSWORD_LENGTH_MESSAGE,
    ]);
  });

  it('reports both rules when length and composition are violated', () => {
    expect(validatePassword('123')).toEqual([
      PASSWORD_LENGTH_MESSAGE,
      PASSWORD_COMPOSITION_MESSAGE,
    ]);
  });

  it('only reports the required message for an empty password', () => {
    expect(validatePassword('')).toEqual([PASSWORD_REQUIRED_MESSAGE]);
  });
});
