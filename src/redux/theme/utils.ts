import { Dispatch, useEffect, useRef, useState } from 'react';
import { useInitialEffect } from '../../utils/hooks';
import { StoreType } from '../store';
import { setPalette } from './actions';
import { defaultDark, defaultLight } from './defaults';
import { ThemeState } from './reducer';

type UseThemeHandlersProps = {
  store: StoreType;
  themeState: ThemeState;
  callback: Function;
};

export const useThemeHooks = ({ store, themeState, callback }: UseThemeHandlersProps) => {
  const [loadedCachedTheme, setLoadedCachedTheme] = useState(false);
  const refCallback = useRef<Function>();
  refCallback.current = callback;

  useInitialEffect(() => {
    loadCachedPalettes(store.dispatch, themeState);
    setLoadedCachedTheme(true);
  });

  useEffect(() => {
    if (refCallback.current) refCallback.current();
    console.log('Written options to localStorage');
    if (loadedCachedTheme) {
      if (
        JSON.stringify(themeState.palettes.dark) === JSON.stringify(defaultDark) &&
        JSON.stringify(themeState.palettes.light) === JSON.stringify(defaultLight)
      ) {
        window.localStorage.removeItem('sora-theme');
      } else window.localStorage.setItem('sora-theme', JSON.stringify(themeState));
    }
  }, [themeState, loadedCachedTheme]);
};

export const loadCachedPalettes = (dispatch: Dispatch<any>, themeOptions: ThemeState) => {
  // Load palettes from localStorage if needed
  // Client changes are synced TO localStorage in a different function
  const data = window.localStorage.getItem('sora-theme') || '{}';
  const cachedState: ThemeState = JSON.parse(String(data));
  const cachedDark = cachedState?.palettes?.dark;
  const cachedLight = cachedState?.palettes?.light;

  if (cachedDark && cachedLight) {
    const darkDiff = JSON.stringify(cachedDark) !== JSON.stringify(themeOptions.palettes.dark);
    const lightDiff = JSON.stringify(cachedLight) !== JSON.stringify(themeOptions.palettes.light);

    if (darkDiff) {
      dispatch(setPalette('dark', cachedDark));
    }

    if (lightDiff) {
      dispatch(setPalette('light', cachedLight));
    }
  }
};
