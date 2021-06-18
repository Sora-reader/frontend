import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { createAction } from '@reduxjs/toolkit';
import { ThemeModeType } from './types';

export const setThemeType = createAction<ThemeModeType>('theme/setType');
export const setPalette = createAction('theme/setPalette', (options: PaletteOptions, mode: ThemeModeType) => {
  return { payload: { mode, options } };
});
