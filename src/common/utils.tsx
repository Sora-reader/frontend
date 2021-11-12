import { AxiosError } from 'axios';
import _ from 'lodash';
import { addError } from '../redux/errors/actions';
import { AppDispatch } from '../redux/types';

/**
 * Sleep for {ms} milliseconds
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Dumb JS
 * @returns UTC localized Date (will still contain client's timezone, but in fact it's not)
 */
export function utcDate(date?: Date) {
  date = date ?? new Date();
  return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
}

/**
 * Capture axios error into a proper dispatch call
 */
export function captureAxiosToError(dispatch: AppDispatch, error: AxiosError, title?: string) {
  return dispatch(
    addError({
      title: title || 'Ошибка',
      url: error.config.url ? error.config.url : undefined,
      message: String(error).slice(0, 100),
    })
  );
}
/**
 * Lodash's isEmpty but as a type guard
 * @param data your object
 * @returns wheter this object is not empty
 */
export function isNotEmpty<Type = any>(data: any): data is Type {
  return !_.isEmpty(data);
}

/**
 * Access object's property from dotted string notation
 * @param object original object
 * @param path dotted path string, like 'prop.nestedProp'
 * @returns property or undefined
 */
export function getPropertyFromString(object: any, path: string) {
  return path.split('.').reduce((r, k) => r?.[k], object);
}

/**
 * Get a copy of object with all keys in camelCase
 * @param obj original object
 * @returns new object with all keys camelCased
 */
export function camelCaseKeys(obj: any, depth = 1) {
  let newObject: any = Array.isArray(obj) ? [] : {};

  for (let prop in obj) {
    if (typeof obj[prop] === 'object' && obj[prop] !== null) {
      newObject[_.camelCase(prop)] = camelCaseKeys(obj[prop], depth);
    } else {
      newObject[_.camelCase(prop)] = obj[prop];
    }
  }

  return newObject;
}
