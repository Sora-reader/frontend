import { Dispatch } from 'react';
import isEmpty from 'lodash.isempty';
import { loadLastVisitedManga } from './actions';
import { Manga } from '../../api/types';

export const detailsNeedUpdate = (manga: Manga) => {
  if (!manga.updatedDetail) return false;
  const hourAgo = new Date();
  hourAgo.setHours(hourAgo.getHours() - 1);
  return new Date(manga.updatedDetail) < hourAgo;
};

export const chaptersNeedUpdate = (manga: Manga) => {
  if (!manga.updatedChapters) return false;
  const hourAgo = new Date();
  hourAgo.setHours(hourAgo.getHours() - 1);
  return new Date(manga.updatedChapters) < hourAgo;
};

export const syncLastVisited = (dispatch: Dispatch<any>, clientState: Array<Manga>) => {
  // Sync lastVisited both from and to localStorage
  return () => {
    const data = window.localStorage.getItem('sora-last-visited') || '[]';
    const cachedState = JSON.parse(String(data));

    const jsonClientState = JSON.stringify(clientState);
    const needsUpdate = jsonClientState !== JSON.stringify(cachedState);

    // If they're not equal
    if (needsUpdate) {
      // And client's state is empty (first render)
      if (isEmpty(clientState)) {
        // Then load cached state
        const cachedLastVisited: Array<Manga> = cachedState;
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
