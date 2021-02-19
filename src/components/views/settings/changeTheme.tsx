import React from 'react';
import {
  createStyles,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  lighten,
  makeStyles,
  Radio,
  RadioGroup,
  Theme,
  useTheme,
} from '@material-ui/core';
import {SketchPicker} from 'react-color';
import {useDispatch, useSelector} from 'react-redux';
import {setThemeType} from '../../../redux/theme/action';
import {State} from '../../../redux/store';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {},
  label: {color: theme.palette.text.primary + ' !important'},
  focusedLabel: {color: theme.palette.text.primary + ' !important'},
  radio: {
    '&$checked': {
      color: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
  checked: {},
  picker: {
    backgroundColor: lighten(theme.palette.background.paper, 0.1) +
        ' !important',
  },
}));

export function ChangeTheme() {
  const theme = useTheme();
  const themeState = useSelector((state: State) => state.theme);
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
      <div className={classes.root}>
        <FormControl component="fieldset">
          <FormLabel component="legend"
                     classes={{
                       root: classes.label,
                       focused: classes.focusedLabel,
                     }}>
            <h3>Тема</h3>
          </FormLabel>
          <RadioGroup name="theme" value={theme.palette.type}>
            <FormControlLabel value="dark" control={
              <Radio classes={{root: classes.radio, checked: classes.checked}}/>
            }
                              checked={theme.palette.type === 'dark'}
                              onChange={() => dispatch(setThemeType('dark'))}
                              label="Темная"/>
            <FormControlLabel control={
              <Radio classes={{root: classes.radio, checked: classes.checked}}/>
            }
                              checked={theme.palette.type === 'light'}
                              onChange={() => dispatch(setThemeType('light'))}
                              label="Светлая" value="light"/>
          </RadioGroup>
        </FormControl>
        <Divider/>
        <h3>Палитра темной темы</h3>
        <p>Главный цвет</p>
        <SketchPicker className={classes.picker}
            // @ts-ignore
                      color={themeState.darkPalette.primary.main}/>
        <Divider/>
        <h3>Палитра светлой темы</h3>
        <p>Главный цвет</p>

        <SketchPicker className={classes.picker}
            // @ts-ignore
                      color={themeState.lightPalette.primary.main}/>
      </div>
  );
}