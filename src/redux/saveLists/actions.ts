import { createAction } from '@reduxjs/toolkit';
import { Manga } from '../../utils/apiTypes';
import { ListType } from './types';

export const favor = createAction<Manga>('saveLists/favor');
export const unfavor = createAction<Manga>('saveLists/unfavor');

export const addToList = createAction('saveLists/addToList', (manga: Manga, list: ListType) => {
  return {
    payload: {
      manga,
      list,
    },
  };
});

export const removeFromList = createAction('saveLists/removeFromList', (manga: Manga, list: ListType) => {
  return {
    payload: {
      manga,
      list,
    },
  };
});
