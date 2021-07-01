import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Manga, MangaChapter, MangaChapterImages, MangaChapters, MangaList } from '../../api/types';
import { mangaFromResponse } from './utils';

export const setMangaPreview = createAction<Manga>('manga/setPreview');
export const setCurrentChapter = createAction<MangaChapter>('manga/setCurrentChapter');
export const fetchMangaDetail = createAsyncThunk<Manga, Number>('manga/fetchDetail', async (id: Number) => {
  const response = await axios.get(`manga/${id}`);
  return mangaFromResponse(response);
});
export const fetchMangaChapters = createAsyncThunk<MangaChapters, Number>('manga/fetchChapters', async (id: Number) => {
  const response = await axios.get(`manga/${id}/chapters`);
  return response.data;
});
export const fetchChapterImages = createAsyncThunk<MangaChapterImages, Number>(
  'manga/fetchChapterImages',
  async (id: Number) => {
    const response = await axios.get(`manga/${id}/images`);
    return response.data;
  }
);
export const loadLastVisitedManga = createAction<MangaList>('manga/loadLastVisited');
export const pushLastVisitedManga = createAction<Manga>('manga/pushLastVisited');
