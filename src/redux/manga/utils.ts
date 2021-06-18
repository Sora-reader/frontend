import { Dispatch } from 'react';
import _ from 'lodash';
import { MangaType } from '../../catalogs/baseCatalog';
import { loadLastVisitedManga } from './actions';

export const syncLastVisited = (dispatch: Dispatch<any>, clientState: Array<MangaType>) => {
  // Sync lastVisited both from and to localStorage
  return () => {
    const data = window.localStorage.getItem('sora-last-visited') || '[]';
    const cachedState = JSON.parse(String(data));

    const jsonClientState = JSON.stringify(clientState);
    const needsUpdate = jsonClientState !== JSON.stringify(cachedState);

    // If they're not equal
    if (needsUpdate) {
      // And client's state is empty (first render)
      if (_.isEmpty(clientState)) {
        // Then load cached state
        const cachedLastVisited: Array<MangaType> = cachedState;
        dispatch(loadLastVisitedManga(cachedLastVisited));
      }
      // But if client state has something different, than cache
      else {
        // Then it means we need to sync localStorage
        window.localStorage.setItem('sora-last-visited', jsonClientState);
      }
    }
  };
};
