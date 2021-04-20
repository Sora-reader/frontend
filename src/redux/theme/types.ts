import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { SET_PALETTE, SET_TYPE } from './actions';

export type ThemeModeType = 'dark' | 'light';
export interface SetThemeTypeAction {
  type: typeof SET_TYPE;
  theme_type: ThemeModeType;
}
export interface SetPaletteAction {
  type: typeof SET_PALETTE;
  palette: 'light' | 'dark';
  options: PaletteOptions;
}

export type ThemeAction = SetThemeTypeAction | SetPaletteAction;
