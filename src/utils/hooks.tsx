import React, {Dispatch, useEffect, useState} from 'react';
import {createMuiTheme, Theme, ThemeOptions} from '@material-ui/core';
import {green, teal} from '@material-ui/core/colors';
import {useRouter} from 'next/router';
import {ParsedUrlQuery} from 'querystring';

export function useStickyState(defaultValue: any, key: string) {
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    const stickyValue = window.localStorage.getItem(key);

    if (stickyValue !== null) {
      setValue(JSON.parse(stickyValue));
    }
  }, [key]);

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export type ThemeModeType = 'dark' | 'light';

export function useCustomTheme(defaultValue?: ThemeModeType): [Theme, Dispatch<any>] {
  const [themeMode, setThemeMode] = useState(
      defaultValue || 'dark' as ThemeModeType);
  const [theme, setTheme] = useState(createMuiTheme() as Theme);

  useEffect(() => {
    console.log('Theme type ', themeMode);
    let themeData: ThemeOptions = {
      palette: {
        type: themeMode,
        primary: {},
        secondary: {
          ...teal,
        },
      },
    };
    switch (themeMode) {
      case 'dark': {
        if (themeData.palette)
          themeData.palette.primary = {
            main: teal['300'],
            light: teal.A100,
            dark: teal.A700,
          };
        break;
      }
      case 'light': {
        if (themeData.palette)
          themeData.palette.primary = {
            main: green.A200,
            light: green.A100,
            dark: green.A700,
          };
        break;
      }
    }
    setTheme(createMuiTheme(themeData));
  }, [themeMode]);

  return [theme, setThemeMode];
}

export default function usePageBottom() {
  const [bottom, setBottom] = React.useState(false);

  React.useEffect(() => {
    function handleScroll() {
      const isBottom =
          window.innerHeight + document.documentElement.scrollTop
          === document.documentElement.offsetHeight;
      setBottom(isBottom);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return bottom;
}