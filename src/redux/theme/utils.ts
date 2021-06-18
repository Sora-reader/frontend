import { Dispatch } from 'react';
import _ from 'lodash';
import { setPalette } from './actions';

// TODO: not working lmao
export const loadCachedPalettes = (dispatch: Dispatch<any>, clientDark: any, clientLight: any) => {
  // Load palettes from localStorage if needed
  // Client changes are synced TO localStorage in a different function
  return () => {
    const data = window.localStorage.getItem('sora-theme') || '{}';
    const cachedState = JSON.parse(String(data));

    if (!_.isEmpty(cachedState)) {
      const cachedDark = cachedState.darkPalette;
      const cachedLight = cachedState.lightPalette;

      const darkDiff = JSON.stringify(cachedDark) !== JSON.stringify(clientDark);
      const lightDiff = JSON.stringify(cachedLight) !== JSON.stringify(clientLight);

      if (darkDiff) {
        console.log('Dark palettes differ, dispatching');
        dispatch(setPalette(cachedDark, 'dark'));
      }

      if (lightDiff) {
        console.log('Light palettes differ, dispatching');
        dispatch(setPalette(cachedLight, 'light'));
      }
    }
  };
};
