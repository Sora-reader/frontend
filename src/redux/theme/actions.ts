import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { SetPaletteAction, SetThemeTypeAction, ThemeModeType } from './types';

export const SET_TYPE = 'SET_TYPE';
export const SET_PALETTE = 'SET_PALETTE';

export const setThemeType = (
  theme_type: ThemeModeType
): SetThemeTypeAction => ({ type: SET_TYPE, theme_type });

export const setPalette = (
  options: PaletteOptions,
  palette: 'light' | 'dark'
): SetPaletteAction => {
  return { type: SET_PALETTE, palette, options };
};
