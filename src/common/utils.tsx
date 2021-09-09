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
