class ApiError extends Error {
  status: number;

  errors: Record<string, unknown>;

  constructor(
    status: number,
    message: string,
    errors: Record<string, unknown>,
  ) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static Error(
    status: number,
    message: string,
    errors: Record<string, unknown> = {},
  ) {
    return new ApiError(status, message, errors);
  }
}

export default ApiError;
