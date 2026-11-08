export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 64;

export const PASSWORD_REQUIRED_MESSAGE = 'Das Passwort darf nicht leer sein.';
export const PASSWORD_LENGTH_MESSAGE = `Das Passwort muss zwischen ${PASSWORD_MIN_LENGTH} und ${PASSWORD_MAX_LENGTH} Zeichen lang sein.`;
export const PASSWORD_COMPOSITION_MESSAGE =
  'Das Passwort muss Groß- und Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten.';

const isLetter = (char: string) => char.toLowerCase() !== char.toUpperCase();
const isLowerCaseLetter = (char: string) =>
  isLetter(char) && char === char.toLowerCase();
const isUpperCaseLetter = (char: string) =>
  isLetter(char) && char === char.toUpperCase();
const isDigit = (char: string) => char >= '0' && char <= '9';
const isWhitespace = (char: string) => /\s/.test(char);
const isSpecialCharacter = (char: string) =>
  !isLetter(char) && !isDigit(char) && !isWhitespace(char);

/**
 * Validates a password against the same policy the API enforces.
 *
 * The API remains the source of truth; this check only gives users
 * immediate feedback before a request is sent.
 *
 * @returns All violated rules as user-facing messages, empty if valid.
 */
export function validatePassword(password: string): string[] {
  if (password.length === 0) {
    return [PASSWORD_REQUIRED_MESSAGE];
  }

  const errors: string[] = [];

  if (
    password.length < PASSWORD_MIN_LENGTH ||
    password.length > PASSWORD_MAX_LENGTH
  ) {
    errors.push(PASSWORD_LENGTH_MESSAGE);
  }

  const chars = Array.from(password);
  const hasAllCharacterClasses =
    chars.some(isLowerCaseLetter) &&
    chars.some(isUpperCaseLetter) &&
    chars.some(isDigit) &&
    chars.some(isSpecialCharacter);

  if (!hasAllCharacterClasses) {
    errors.push(PASSWORD_COMPOSITION_MESSAGE);
  }

  return errors;
}
