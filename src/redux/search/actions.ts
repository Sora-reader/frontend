import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { MangaList } from '../../api/types';

export const SEARCH_MANGA = 'SEARCH_MANGA';

export const startSearch = createAsyncThunk<{ query: string; results: MangaList }, string>(
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
