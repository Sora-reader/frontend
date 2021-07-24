import { Condition } from '../types';

export const queryDidNotChange: Condition<string> = (query, { getState }) => {
  const {
    search: { query: storedQuery },
  } = getState();
  return Boolean((query && storedQuery === query) || query);
};
