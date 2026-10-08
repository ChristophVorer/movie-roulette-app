export interface ApiProblem {
  type?: string;
  title: string;
  status: number;
  detail: string;
  instance?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationProblem extends ApiProblem {
  validationErrors: ValidationError[];
}
