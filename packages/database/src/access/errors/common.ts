
export class DatabaseOperationError extends Error {
  public readonly code?: string;
  public readonly meta?: Record<string, unknown>;
  public readonly originalError?: unknown;

  constructor(message: string, options?: ErrorOptions & { 
    code?: string; 
    meta?: Record<string, unknown>;
    originalError?: unknown;
  }) {
    super(message, options);
    this.name = 'DatabaseOperationError';
    this.code = options?.code;
    this.meta = options?.meta;
    this.originalError = options?.originalError;
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class InputParseError extends Error {
  constructor(message: string) {
    super(message);
  }
}
