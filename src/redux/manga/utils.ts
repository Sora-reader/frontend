import { Manga } from '../../utils/apiTypes';

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
