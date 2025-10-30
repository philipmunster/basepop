export class ValidationError extends Error {
  issues?: unknown
  constructor(message = 'Invalid input', issues?: unknown, options?: { cause?: unknown }) {
    super(message, options)
    this.name = 'ValidationError'
    this.issues = issues
  }
}

export class AuthError extends Error {
  constructor(message = 'Authentication required', options?: { cause?: unknown }) {
    super(message, options)
    this.name = 'AuthError'
  }
}

export class OrgResolutionError extends Error {
  constructor(message = 'You are not a part of any organisation.', options?: { cause?: unknown }) {
    super(message, options)
    this.name = 'OrgResolutionError'
  }
}

export class DataFetchError extends Error {
  meta?: Record<string, unknown>;

  constructor(
    message = 'Failed to fetch data',
    options?: { cause?: unknown; meta?: Record<string, unknown> }
  ) {
    super(message, options);
    this.name = 'DataFetchError';
    this.meta = options?.meta;
  }
}

export class DataInsertError extends Error {
  meta?: Record<string, unknown>;

  constructor(
    message = 'Failed to insert data',
    options?: { cause?: unknown; meta?: Record<string, unknown> }
  ) {
    super(message, options);
    this.name = 'DataInsertError';
    this.meta = options?.meta;
  }
}