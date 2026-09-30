import type { ApiProblem, ValidationProblem } from '@/types/api';

export function isValidationProblem(
  problem: ApiProblem,
): problem is ValidationProblem {
  return (
    'validationErrors' in problem && Array.isArray(problem.validationErrors)
  );
}
