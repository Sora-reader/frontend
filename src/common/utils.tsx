import { AxiosError } from 'axios';
import { baseUrl } from '../core/consts';
import { addError } from '../redux/errors/actions';
import { TDispatch } from '../redux/types';

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
export function captureAxiosToError(dispatch: TDispatch, error: AxiosError, title?: string) {
  return dispatch(
    addError({
      title: title || 'Ошибка',
      url: error.config.url ? baseUrl + error.config.url : undefined,
      message: String(error),
    })
  );
}
