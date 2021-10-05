import axios from 'axios';
import { chapterUpdateDeadline, detailUpdateDeadline } from '../../core/consts';
import { utcDate } from '../../common/utils';
import { Manga, MangaChapter, MangaChapters } from '../../api/types';
import { CurrentChapter } from './reducer';

/**
 * Make API call to fetch manga data
 * @param id manga DB id
 */
export const requestMangaData = async (id: number): Promise<Manga> => {
  const response = await axios.get(`manga/${id}`);
  return response.data;
};

/**
 * Make API call to fetch all manga and chapter data
 * @param mangaId manga DB id
 * @param chapterId chapter DB id
 */
export const requestAllMangaData = async (
  mangaId: number,
  volumeNumber: number,
  chapterNumber: number
): Promise<{ current: Manga; chapter: CurrentChapter }> => {
  const { data: manga } = await axios.get(`manga/${mangaId}`);
  const { data: chapters } = await axios.get(`manga/${mangaId}/chapters`);
  const currentChapter = chapters.find(
    (chapter: MangaChapter) => chapter.volume === volumeNumber && chapter.number == chapterNumber
  );
  // Mimick Axios 404 error
  if (!currentChapter) throw { error: { response: { status: 404 } } };
  const { data: images } = await axios.get(`manga/${currentChapter.id}/images`);

  return {
    current: {
      ...(manga as Manga),
      chapters: {
        ...(chapters as MangaChapters),
      },
    },
    chapter: {
      ...currentChapter,
      images: {
        ...images,
      },
    },
  };
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
