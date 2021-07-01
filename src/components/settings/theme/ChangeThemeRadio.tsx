import { FormControl, FormControlLabel, PaletteType, Radio, RadioGroup, useTheme } from '@material-ui/core';

type Props = {
  callback: (type: PaletteType) => any;
};

export const ChangeThemeRadio = ({ callback }: Props) => {
  const theme = useTheme();

  return (
    <FormControl component="fieldset">
      <RadioGroup name="theme" value={theme.palette.type}>
        <FormControlLabel
          value="dark"
          label="Темная"
          control={<Radio color="primary" />}
          checked={theme.palette.type === 'dark'}
          onChange={() => callback('dark')}
        />
        <FormControlLabel
          value="light"
          label="Светлая"
          control={<Radio color="primary" />}
          checked={theme.palette.type === 'light'}
          onChange={() => callback('light')}
        />
      </RadioGroup>
    </FormControl>
  );
};
