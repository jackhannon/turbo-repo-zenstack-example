import { DatabaseOperationError } from '@sample/database/access/errors/common';

export function withDatabaseError<T>(operation: () => Promise<T>): Promise<T> {
  try {
    return operation();
  } catch (error) {
    const prismaError = error as any;
    const code = prismaError?.code || prismaError?.meta?.code;
    const meta = prismaError?.meta || {};
    const message = prismaError?.message || 'Database operation failed';

    throw new DatabaseOperationError(message, {
      code,
      meta,
      cause: error as any,
    });
  }
}
