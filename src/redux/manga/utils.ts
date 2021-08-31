import axios from 'axios';
import { Manga } from '../../utils/apiTypes';

export const requestMangaData = async (id: Number) => {
  const response = await axios.get(`manga/${id}`);
  return response.data;
};

export const reRequestMangaData = async (manga: Manga, onUpdate: (data: Manga) => any, timeout = 2000) => {
  if (detailsNeedUpdate(manga)) {
    setTimeout(() => {
      requestMangaData(manga.id).then((newManga) => {
        onUpdate(newManga);
      });
    }, timeout);
  }
};

export const detailsNeedUpdate = (manga: Manga) => {
  if (!manga.updatedDetail) return false;
  if (~manga.id) return true;
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
