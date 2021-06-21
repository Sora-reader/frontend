import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { MutableRefObject } from 'react';
import { SearchResults } from '../../catalogs/baseCatalog';
import { ReadManga } from '../../catalogs/ReadManga';

export const SEARCH_MANGA = 'SEARCH_MANGA';
export const SET_SEARCH_INPUT_REF = 'SET_SEARCH_INPUT_REF';

export const startSearch = createAsyncThunk(
  'search/start',
  async (query: string): Promise<SearchResults> => {
    try {
      return await ReadManga.search.run(query);
    } catch (reason) {
      console.log('Request error');
      console.log(reason);
      return { query, items: [], results: -1, invalidResults: 0 };
    }
  }
);

export const setSearchRef = createAction<MutableRefObject<HTMLInputElement | undefined>>('setSearchRef');
