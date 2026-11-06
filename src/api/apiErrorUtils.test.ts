import type { ApiProblem, ValidationProblem } from '@/types/api';
import { isValidationProblem } from './apiErrorUtils';

const baseProblem: ApiProblem = {
  title: 'Bad Request',
  status: 400,
  detail: 'Die übermittelten Daten sind ungültig.',
};

describe('isValidationProblem', () => {
  it('returns true for a problem with validation errors', () => {
    const problem: ValidationProblem = {
      ...baseProblem,
      validationErrors: [
        { field: 'email', message: 'Die E-Mail-Adresse ist ungültig.' },
      ],
    };

    expect(isValidationProblem(problem)).toBe(true);
  });

  it('returns true for an empty validation error list', () => {
    const problem: ValidationProblem = {
      ...baseProblem,
      validationErrors: [],
    };

    expect(isValidationProblem(problem)).toBe(true);
  });

  it('returns false for a problem without validation errors', () => {
    expect(isValidationProblem(baseProblem)).toBe(false);
  });

  it('returns false when validationErrors is not an array', () => {
    const problem = {
      ...baseProblem,
      validationErrors: null,
    } as unknown as ApiProblem;

    expect(isValidationProblem(problem)).toBe(false);
  });
});
