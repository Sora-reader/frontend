import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { MangaSearchResult } from '../../utils/apiTypes';
import { RootState } from '../store';

export const SEARCH_MANGA = 'SEARCH_MANGA';

export const startSearch = createAsyncThunk<{ query: string; results: MangaSearchResult }, string>(
  'search/start',
  async (query: string) => {
    const response = await axios.get('manga/search/', {
      params: {
        title: query,
      },
    });
    return {
      query,
      results: response.data,
    };
  }
);

export const paginateNext = createAsyncThunk<MangaSearchResult>('search/paginate', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  if (state.search.results.next) {
    const response = await axios.get(state.search.results.next);
    return response.data;
  }
});
