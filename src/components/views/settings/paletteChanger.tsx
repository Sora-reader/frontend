// @flow
import * as React from 'react';
import {useState} from 'react';
import {CustomChip} from '../../muiCustoms/CustomChip';
import {Color, ColorPicker} from 'material-ui-color';
import {Button, createStyles, makeStyles, Theme} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import createPalette, {PaletteOptions} from '@material-ui/core/styles/createPalette';

const useStyles = makeStyles((theme: Theme) => createStyles({
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
}));

type ToneType = 'main' | 'light' | 'dark'
type PickerType = {
  primary: ToneType,
  secondary: ToneType,
}
type Props = {
  statePalette: PaletteOptions,
  setStatePalette: Function,
};

export function PaletteChanger(props: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [palette, setPalette] = useState(
      createPalette(props.statePalette),
  );
  const {statePalette, setStatePalette} = props;

  const [picker, setPicker] = useState({
    primary: 'main',
    secondary: 'main',
  } as PickerType);

  const updatePalette = (
      key: 'primary' | 'secondary',
      value: ToneType,
  ) => (color: Color) => {
    setPalette(prevState => {
      let newState = {...prevState};
      if (key && value)
        newState[key][value] = '#' + color.hex;
      return newState;
    });
  };
  const updatePicker = (
      key: 'primary' | 'secondary',
      value: ToneType,
  ) => () => {
    setPicker((prevState: PickerType) => {
      let newState = {...prevState};
      if (key && value)
        newState[key] = value;
      return newState;
    });
  };
  const reset = () => {
    setPalette(createPalette(props.statePalette));
  };
  const submit = () => {
    dispatch(setStatePalette({
      primary: palette.primary,
      secondary: palette.secondary,
    } as PaletteOptions));
  };
  return (
      <div className={classes.root}>
        <p>Главный цвет, оттенки</p>
        <div className={classes.chipContainer}>
          <CustomChip onClick={updatePicker('primary', 'main')}
                      style={{backgroundColor: palette.primary.main}}
                      label="основной"/>
          <CustomChip onClick={updatePicker('primary', 'light')}
                      style={{backgroundColor: palette.primary.light}}
                      label="светлый"/>
          <CustomChip onClick={updatePicker('primary', 'dark')}
                      style={{backgroundColor: palette.primary.dark}}
                      label="тёмный"/>
        </div>
        <ColorPicker onChange={updatePalette('primary', picker.primary)}
                     value={palette.primary[picker.primary]}/>
        <div className={classes.buttons}>
          <Button onClick={reset}>Сбросить</Button>
          <Button onClick={submit}>Сохранить</Button>
        </div>
      </div>
  );
}