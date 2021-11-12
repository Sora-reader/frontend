import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiUrl } from '.';
import { Manga, MangaChapterImages, MangaChapters } from './types';

export const mangaAPIBaseUrl = `${apiUrl}/manga`;
export const mangaDetailQuery = (pk: string | number) => `/${pk}/`;

export const mangaAPI = createApi({
  reducerPath: 'mangaAPI',
  baseQuery: fetchBaseQuery({ baseUrl: mangaAPIBaseUrl }),
  endpoints: (builder) => ({
    detail: builder.query<Manga, string | number>({
      query: mangaDetailQuery,
    }),
    chapters: builder.query<MangaChapters, string | number>({
      query: (pk) => `/${pk}/chapters`,
    }),
    images: builder.query<MangaChapterImages, string | number>({
      query: (pk) => `/${pk}/images`,
    }),
  }),
});

export const { useDetailQuery, useChaptersQuery, useImagesQuery } = mangaAPI;
