import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { createAction } from '@reduxjs/toolkit';
import { ThemeModeType } from './types';

export const SET_TYPE = 'SET_THEME_TYPE';
export const SET_PALETTE = 'SET_PALETTE';

export const setThemeType = createAction<ThemeModeType>(SET_TYPE);
export const setPalette = createAction(SET_PALETTE, (options: PaletteOptions, paletteType: ThemeModeType) => {
  return { payload: { paletteType, options } };
});
