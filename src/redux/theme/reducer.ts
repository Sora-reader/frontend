import { createMuiTheme, Theme } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { setPalette, setThemeType, SET_PALETTE, SET_TYPE } from './actions';
import { defaultDark, defaultLight, defaultTheme } from './defaults';
import { AnyAction, createReducer, createSlice, current, Draft } from '@reduxjs/toolkit';

const initialState: StateType = {
  theme: defaultTheme,
  darkPalette: defaultDark,
  lightPalette: defaultLight,
};

type StateType = {
  theme: Theme;
  darkPalette: PaletteOptions;
  lightPalette: PaletteOptions;
};

const syncThemeToLocalStorage = (state: StateType) => {
  // TODO: how to access previous state with createReducer? Sync only on change
  window.localStorage.setItem('sora-theme', JSON.stringify(state));
};

// TODO: why is not working?
// const reducer = createReducer(initialState, (builder) => {
// builder.addCase(setThemeType, (state, action) => {
//   const paletteName = `${action.payload}Palette` as keyof typeof state;
//   reloadTheme(state as StateType, state[paletteName] as PaletteOptions);
// });
// builder.addCase(setPalette, (state, action) => {
//   const paletteName = `${action.payload.palette}Palette` as keyof typeof state;
//   let palette = state[paletteName] as Draft<PaletteOptions>;
//   palette = {
//     ...palette,
//     ...action.payload.options,
//   };
//   console.log(`Reloading ${state.theme.palette.type} theme with new palette`, palette);
//   reloadTheme(state as StateType, palette);
// });
// builder.addMatcher(
//   // Sync theme to localStorage everytime
//   () => typeof window !== 'undefined',
//   (state) => {
//     console.log(JSON.stringify(state));
//     console.log(JSON.stringify(current(state)));
//     window.localStorage.setItem('sora-theme', JSON.stringify(state));
//   }
// );
// });

export default function reducer(state = initialState, action: AnyAction) {
  let newState = { ...state };

  if (setThemeType.match(action)) {
    console.log('Setting theme to', action.payload);
    const paletteName = `${action.payload}Palette` as keyof typeof state;
    newState.theme = createMuiTheme({ palette: state[paletteName] as PaletteOptions });
    syncThemeToLocalStorage(newState);
    return newState;
  } else if (setPalette.match(action)) {
    const paletteName = `${action.payload.paletteType}Palette` as keyof typeof state;
    let palette = state[paletteName] as PaletteOptions;
    palette = {
      ...palette,
      ...action.payload.options,
    };
    if (action.payload.paletteType === state.theme.palette.type) {
      console.log(`Reloading ${state.theme.palette.type} theme with new palette`, palette);
      newState.theme = createMuiTheme({ palette });
    }
    syncThemeToLocalStorage(newState);
    return newState;
  }
  return state;
}
