import { AnyAction, Middleware } from 'redux';
import { camelCaseKeys, getPropertyFromString } from '../common/utils';

/**
 * Middleware that camelCases keys for specified actions (or their properties)
 * @param actionRegex action type regex
 * @param key nested property selector. Use this if you want to only "camelize" a certain action property
 */
export const camelMiddleware =
  (actionRegex: RegExp | string, key?: string): Middleware =>
  (_) =>
  (next) =>
  (action: AnyAction) => {
    if (typeof action === 'object' && action.type.match(actionRegex)) {
      if (key) {
        let prop = getPropertyFromString(action, key);
        Object.assign(prop, camelCaseKeys(prop));
      } else {
        return next(camelCaseKeys(action));
      }
    }
    return next(action);
  };
