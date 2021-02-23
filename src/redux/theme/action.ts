import {ThemeModeType} from '../../utils/hooks';
import {PaletteOptions} from '@material-ui/core/styles/createPalette';

export const SET_TYPE = 'SET_TYPE';
export const SET_DARK_PALETTE = 'SET_DARK_PALETTE';
export const SET_LIGHT_PALETTE = 'SET_LIGHT_PALETTE';

interface SetThemeTypeAction {
  type: typeof SET_TYPE,
  theme_type: ThemeModeType
}

interface SetDarkPaletteAction {
  type: typeof SET_DARK_PALETTE,
  options: PaletteOptions
}

interface SetLightPaletteAction {
  type: typeof SET_LIGHT_PALETTE,
  options: PaletteOptions
}

export type ThemeActionTypes =
    SetThemeTypeAction
    | SetDarkPaletteAction
    | SetLightPaletteAction

export const setThemeType = (theme_type: ThemeModeType): SetThemeTypeAction => {
  return {type: SET_TYPE, theme_type: theme_type};
};
export const setDarkPalette = (options: PaletteOptions): SetDarkPaletteAction => {
  return {type: SET_DARK_PALETTE, options: options};
};
export const setLightPalette = (options: PaletteOptions): SetLightPaletteAction => {
  return {type: SET_LIGHT_PALETTE, options: options};
};
