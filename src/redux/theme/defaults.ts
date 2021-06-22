import { green, teal } from '@material-ui/core/colors';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

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
