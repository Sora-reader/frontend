import { PaletteType } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { createAction } from '@reduxjs/toolkit';

export const setThemeType = createAction<PaletteType>('theme/setType');
export const setPalette = createAction('theme/setPalette', (mode: PaletteType, options: PaletteOptions) => {
  return { payload: { mode, options } };
});
