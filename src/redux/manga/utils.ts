import { Dispatch, useEffect } from 'react';
import isEmpty from 'lodash.isempty';
import { loadViewedManga } from './actions';
import { Manga, MangaList } from '../../utils/apiTypes';
import { StoreType } from '../store';

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

// Load viewed from localstorage if needed
export const useSyncViewed = (store: StoreType, viewed: MangaList) =>
  useEffect(syncViewed(store.dispatch, viewed), [viewed]);

export const syncViewed = (dispatch: Dispatch<any>, clientState: Array<Manga>) => {
  // Sync viewed both from and to localStorage
  return () => {
    const data = window.localStorage.getItem('sora-viewed') || '[]';
    const cachedState = JSON.parse(String(data));

    const jsonClientState = JSON.stringify(clientState);
    const needsUpdate = jsonClientState !== JSON.stringify(cachedState);

    // If they're not equal
    if (needsUpdate) {
      // And client's state is empty (first render)
      if (isEmpty(clientState)) {
        // Then load cached state
        const cachedViewed: Array<Manga> = cachedState;
        dispatch(loadViewedManga(cachedViewed));
      }
      // But if client state has something different, than cache
      else {
        // Then it means we need to sync localStorage
        window.localStorage.setItem('sora-viewed', jsonClientState);
      }
    }
  };
};
