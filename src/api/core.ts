/**
 * RTKQ utility types
 */

export interface FetchError {
  status: 'FETCH_ERROR';
  error: string;
}

export interface ParsingError {
  error: { data: string; error: string; status: 'PARSING_ERROR'; originalStatus: number };
}

export interface AbortError {
  error: { name: 'AbortError'; message: string };
}

export type MutationSuccess<MutationType = any, DataType = any> = Omit<MutationType, 'data'> & {
  data: DataType;
};

/**
 * Type guards and utils
 */

export function isFetchError(error: any): error is FetchError {
  return error?.status === 'FETCH_ERROR';
}

export function isParsingError(error: any): error is ParsingError {
  return error?.error?.status === 'PARSING_ERROR';
}

export function isAbortError(error: any): error is AbortError {
  return error?.error?.name === 'AbortError';
}

export async function unwrapMutationResult<Type = any>(result: any): Promise<Type> {
  console.log('Unwrapping result', result);
  if (result.error) {
    throw result;
  }
  return result;
}
