import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { sleep } from '../../common/utils';
import { Manga, MangaChapter, MangaChapterImages, MangaChapters, MangaList } from '../../common/apiTypes';
import { chapterDidNotChange, mangaDidNotChange } from './conditions';
import { CurrentChapter } from './reducer';
import { detailsNeedUpdate, requestMangaData } from './utils';

// Manga
export const setCurrentManga = createAction<Manga>('manga/setPreview');
export const fetchMangaDetail = createAsyncThunk<Manga, Number>('manga/fetchDetail', requestMangaData, {
  condition: mangaDidNotChange,
});

// Chapters
export const setCurrentChapter = createAction<MangaChapter>('manga/setCurrentChapter');
export const fetchMangaChapters = createAsyncThunk<MangaChapters, Number>(
  'manga/fetchChapters',
  async (id: Number) => {
    console.log('Fetching chapters for', id);
    const response = await axios.get(`manga/${id}/chapters`);
    return response.data;
  },
  {
    condition: mangaDidNotChange,
  }
);
export const fetchChapterImages = createAsyncThunk<MangaChapterImages, Number>(
  'manga/fetchChapterImages',
  async (id: Number) => {
    const response = await axios.get(`manga/${id}/images`);
    return response.data;
  },
  {
    condition: chapterDidNotChange,
  }
);

export const setRead = createAction('manga/setRead', (mangaId: number, chapterId: number) => {
  return { payload: { mangaId, chapterId } };
});

// Viewed
export const loadViewedManga = createAction<MangaList>('manga/loadViewed');
export const pushViewedManga = createAction<Manga>('manga/pushViewed');

/**
 * Fetch all data - manga details, chapter list and images for given chapter
 */
export const fetchAll = createAsyncThunk<
  { manga: Manga; chapter?: CurrentChapter },
  { mangaId: number; volumeNumber: number; chapterNumber: number }
>(
  'manga/fetchAll',
  async ({ mangaId, volumeNumber, chapterNumber }) => {
    console.log('====> Fetch all');
    let manga;
    let shouldRetry = true;
    do {
      manga = (await axios.get(`manga/${mangaId}`)).data as Manga;
      if (detailsNeedUpdate(manga)) await sleep(1000);
      else shouldRetry = false;
    } while (shouldRetry);
    console.log('1. Fetched manga, getting chapters...');

    const { data: chapters }: { data: MangaChapters } = await axios.get(`manga/${mangaId}/chapters`);
    console.log('2. Fetched chapters, getting image links');

    const currentChapter = chapters.find(
      (chapter) => chapter.volume === volumeNumber && chapter.number == chapterNumber
    );
    const { data: currentChapterImages } = await axios.get(`manga/${currentChapter?.id}/images`);
    console.log('3. Fetched all\n<====');

    return {
      manga: {
        ...manga,
        chapters: chapters,
      },
      chapter: {
        ...currentChapter,
        images: currentChapterImages,
      } as CurrentChapter,
    };
  },
  {
    condition: ({ mangaId }, { getState }: any) => mangaDidNotChange(mangaId, { getState, extra: null }),
  }
);
