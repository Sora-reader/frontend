import { fetchChapterImages, fetchMangaChapters, fetchMangaDetail, setCurrentChapter } from '../../redux/manga/actions';
import { TDispatch } from '../../redux/types';
import { unwrapResult } from '@reduxjs/toolkit';
import { MangaChapters } from '../../utils/apiTypes';

export const fetchAll = (dispatch: TDispatch, mangaId: number, volumeNumber: number, chapterNumber: number) => {
  dispatch(fetchMangaDetail(mangaId))
    .then(unwrapResult)
    .then(async () => {
      const chapters = await dispatch(fetchMangaChapters(mangaId));
      const currentChapter = (chapters.payload as MangaChapters).find((chapter) => {
        return chapter.volume === volumeNumber && chapter.number === chapterNumber;
      });
      if (currentChapter) {
        await dispatch(setCurrentChapter(currentChapter));
        await dispatch(fetchChapterImages(currentChapter.id));
      }
    });
};

export const roundBinary = (value: number) => (value ? (value * 1) / Math.abs(value) : value);
