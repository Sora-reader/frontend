import {AnyAction, Dispatch} from 'redux';
import {ThemeModeType} from '../../utils/hooks';
import {PaletteOptions} from '@material-ui/core/styles/createPalette';

export const themeActionTypes = {
  SET_TYPE: 'SET_TYPE',
  SET_DARK_PALETTE: 'SET_DARK_PALETTE',
  SET_LIGHT_PALETTE: 'SET_LIGHT_PALETTE',
};

export interface SetThemeTypeAction extends AnyAction {
  theme_type: ThemeModeType
}

export const setThemeType = (theme_type: ThemeModeType) => (dispatch: Dispatch): SetThemeTypeAction => {
  return dispatch({type: themeActionTypes.SET_TYPE, theme_type: theme_type});
};

export interface SetDarkPaletteAction extends AnyAction {
  options: PaletteOptions,
}

export const setDarkPalette = (options: PaletteOptions) => (dispatch: Dispatch): SetDarkPaletteAction => {
  return dispatch({type: themeActionTypes.SET_DARK_PALETTE, options: options});
};

export interface SetLightPaletteAction extends AnyAction {
  options: PaletteOptions,
}

export const setLightPalette = (options: PaletteOptions) => (dispatch: Dispatch): SetLightPaletteAction => {
  return dispatch({type: themeActionTypes.SET_LIGHT_PALETTE, options: options});
};
