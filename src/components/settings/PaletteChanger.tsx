import * as React from 'react';
import { useEffect, useState } from 'react';
import { Color, ColorPicker } from 'material-ui-color';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import createPalette, { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { GenreChip } from '../manga/GenreChip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(1),
    },
    chipContainer: {
      display: 'flex',
      flexFlow: 'row wrap',
      '& li': {
        borderRadius: '1rem',
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
    },
    buttons: {
      padding: theme.spacing(1),
      '& button': {
        marginRight: theme.spacing(1),
      },
    },
  })
);

type ToneType = 'main' | 'light' | 'dark';
type PickerType = {
  primary: ToneType;
  secondary: ToneType;
};
type Props = {
  statePalette: PaletteOptions;
  defaultPalette: PaletteOptions;
  // TODO: thunk types
  setStatePalette: Function;
};

export function PaletteChanger(props: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { statePalette, defaultPalette, setStatePalette } = props;
  const [palette, setPalette] = useState(createPalette(statePalette));
  const [picker, setPicker] = useState({
    primary: 'main',
    secondary: 'main',
  } as PickerType);

  const updatePalette = (key: 'primary' | 'secondary', value: ToneType) => (color: Color | string) => {
    setPalette((prevState) => {
      const newState = { ...prevState };
      if (key && value) {
        if (typeof color === 'string') newState[key][value] = color;
        else newState[key][value] = `#${color.hex}`;
      }
      return newState;
    });
  };

  const updatePicker = (key: 'primary' | 'secondary', value: ToneType) => () => {
    setPicker((prevState: PickerType) => {
      const newState = { ...prevState };
      if (key && value) newState[key] = value;
      return newState;
    });
  };

  const reset = () => {
    dispatch(setStatePalette(defaultPalette));
  };
  const submit = () => {
    console.log('Dispatching', palette.primary, 'with', setStatePalette.name);
    dispatch(
      setStatePalette({
        primary: palette.primary,
        secondary: palette.secondary,
      } as PaletteOptions)
    );
  };

  useEffect(() => {
    // Reset if the palette changes (loads from localStorage)
    setPalette(createPalette(statePalette));
  }, [statePalette]);

  return (
    <div className={classes.root}>
      <p>Главный цвет, оттенки</p>
      <div className={classes.chipContainer}>
        <GenreChip
          onClick={updatePicker('primary', 'main')}
          style={{
            backgroundColor: palette.primary.main,
            color: palette.text.primary,
          }}
          label="основной"
        />
        <GenreChip
          onClick={updatePicker('primary', 'light')}
          style={{
            backgroundColor: palette.primary.light,
            color: palette.text.primary,
          }}
          label="светлый"
        />
        <GenreChip
          onClick={updatePicker('primary', 'dark')}
          style={{
            backgroundColor: palette.primary.dark,
            color: palette.text.primary,
          }}
          label="тёмный"
        />
      </div>
      <ColorPicker onChange={updatePalette('primary', picker.primary)} value={palette.primary[picker.primary]} />
      <div className={classes.buttons}>
        <Button onClick={reset}>Сбросить</Button>
        <Button onClick={submit}>Сохранить</Button>
      </div>
    </div>
  );
}
