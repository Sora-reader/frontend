import { PaletteType } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { defaultDark, defaultLight } from './defaults';
import { createReducer } from '@reduxjs/toolkit';
import { setPalette, setThemeType as setThemeMode } from './actions';

export type ThemeState = {
  mode: PaletteType;
  palettes: {
    dark: PaletteOptions;
    light: PaletteOptions;
  };
};

const initialState: ThemeState = {
  mode: 'dark',
  palettes: {
    dark: defaultDark,
    light: defaultLight,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setThemeMode, (state, action) => {
    console.log('Setting theme mode to', action.payload);
    state.mode = action.payload;
  });
  builder.addCase(setPalette, (state, action) => {
    Object.assign(state.palettes[action.payload.mode], action.payload.options);
  });
});

export default reducer;
