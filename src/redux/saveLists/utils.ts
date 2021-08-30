import { Manga } from '../../utils/apiTypes';
import { RootState } from '../store';
import { ListType } from './types';

export const getUniqueSaveLists = (lists: RootState['saveLists']) =>
  Object.entries(lists).filter(([listName]) => listName !== 'favorite');

export const inWhichList = (manga: Manga, lists: RootState['saveLists']): ListType | undefined => {
  const entries = getUniqueSaveLists(lists);
  for (let i = 0, size = entries.length; i < size; i++)
    if (inList(manga, entries[i][1])) return entries[i][0] as ListType;
};

export const inList = (manga: Manga, list: Array<Manga>) => {
  return list.find((e) => e.id === manga.id);
};

export const pushToArray = (manga: Manga, list: Array<Manga>) => {
  if (!inList(manga, list)) list.push(manga);
};

export const removeFromArray = (manga: Manga, list: Array<Manga>) => {
  if (inList(manga, list)) return list.filter((e) => e.id !== manga.id);
  return list;
};
