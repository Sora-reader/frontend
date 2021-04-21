import { createMuiTheme, Theme } from '@material-ui/core';
import { green, teal } from '@material-ui/core/colors';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { SET_PALETTE, SET_TYPE } from './actions';
import { ThemeAction } from './types';

type StateType = {
  theme: Theme;
  darkPalette: PaletteOptions;
  lightPalette: PaletteOptions;
};

export const defaultDark: PaletteOptions = {
  type: 'dark',
  primary: {
    main: teal['300'],
    light: teal.A100,
    dark: teal.A700,
  },
};

export const defaultLight: PaletteOptions = {
  type: 'light',
  primary: {
    main: green.A200,
    light: green.A100,
    dark: green.A700,
  },
};

const defaultTheme = createMuiTheme({
  palette: defaultDark,
});

const initialState: StateType = {
  theme: defaultTheme,
  darkPalette: defaultDark,
  lightPalette: defaultLight,
};

export default function reducer(state: StateType = initialState, action: ThemeAction) {
  let newState = { ...state };

  switch (action.type) {
    case SET_TYPE:
      console.log('Setting theme to', action.theme_type);
      if (action.theme_type === 'dark') {
        newState.theme = createMuiTheme({ palette: state.darkPalette });
      } else {
        newState.theme = createMuiTheme({ palette: state.lightPalette });
      }
      break;
    case SET_PALETTE:
      switch (action.palette) {
        case 'light':
          newState.lightPalette = {
            ...newState.lightPalette,
            ...action.options,
          };
          if (newState.theme.palette.type === 'light') {
            console.log('Reloading light theme with new palette', newState.lightPalette);
            newState.theme = createMuiTheme({ palette: newState.lightPalette });
          }
          break;
        case 'dark':
          newState.darkPalette = {
            ...newState.darkPalette,
            ...action.options,
          };
          if (newState.theme.palette.type === 'dark') {
            console.log('Reloading dark theme with new palette', newState.darkPalette);
            newState.theme = createMuiTheme({ palette: newState.darkPalette });
          }
          break;
        default:
          break;
      }
      break;
    default:
      newState = state;
  }

  if (typeof window !== 'undefined') {
    if (newState !== state) {
      console.log('Reducer got new data, persisting state...');
      window.localStorage.setItem('sora-theme', JSON.stringify(newState));
    }
  }

  return newState;
}
