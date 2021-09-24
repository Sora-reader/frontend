import axios from 'axios';
import { chapterUpdateDeadline, detailUpdateDeadline } from '../../core/consts';
import { utcDate } from '../../common/utils';
import { Manga } from '../../common/apiTypes';

/**
 * Make API call to fetch manga data
 * @param id manga DB id
 */
export const requestMangaData = async (id: Number): Promise<Manga> => {
  const response = await axios.get(`manga/${id}`);
  return response.data;
};

/**
 * Re-request manga detail data once
 * @param manga initial manga data
 * @param onUpdate callback if manga updates
 * @param timeout ms timeout before re-request
 */
export const reRequestMangaData = async (manga: Manga, onUpdate: (data: Manga) => any, timeout = 2000) => {
  if (detailsNeedUpdate(manga)) {
    setTimeout(() => {
      requestMangaData(manga.id).then((newManga) => {
        onUpdate(newManga);
      });
    }, timeout);
  }
};

/**
 * Check if manga details need update
 */
export const detailsNeedUpdate = (manga: Manga) => {
  if (!manga) return true;
  if (!manga.updatedDetail) return false;
  const updateDeadline = utcDate();
  updateDeadline.setHours(updateDeadline.getHours() - detailUpdateDeadline);
  return new Date(manga.updatedDetail) < updateDeadline;
};

/**
 * Check if manga chapters need update
 */
export const chaptersNeedUpdate = (manga: Manga) => {
  if (!manga) return true;
  if (!manga.updatedChapters) return false;
  const updateDeadline = utcDate();
  updateDeadline.setHours(updateDeadline.getHours() - chapterUpdateDeadline);
  return new Date(manga.updatedChapters) < updateDeadline;
};
