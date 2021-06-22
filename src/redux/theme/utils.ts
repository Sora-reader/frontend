import { Dispatch } from 'react';
import { setPalette } from './actions';
import { ThemeState } from './reducer';

export const loadCachedPalettes = (dispatch: Dispatch<any>, themeOptions: ThemeState) => {
  console.log('loadCachedPalettes called!');
  // Load palettes from localStorage if needed
  // Client changes are synced TO localStorage in a different function
  const data = window.localStorage.getItem('sora-theme') || '{}';
  const cachedState: ThemeState = JSON.parse(String(data));
  const cachedDark = cachedState?.palettes?.dark;
  const cachedLight = cachedState?.palettes?.light;

  console.log(cachedDark, cachedLight);
  console.log(cachedState);

  if (cachedDark && cachedLight) {
    const darkDiff = JSON.stringify(cachedDark) !== JSON.stringify(themeOptions.palettes.dark);
    const lightDiff = JSON.stringify(cachedLight) !== JSON.stringify(themeOptions.palettes.light);

    if (darkDiff) {
      console.log('Dark palettes differ, dispatching');
      dispatch(setPalette('dark', cachedDark));
    }

    if (lightDiff) {
      console.log('Light palettes differ, dispatching');
      dispatch(setPalette('light', cachedLight));
    }
  }
};
