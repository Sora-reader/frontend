import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiUrl } from '.';
import { Manga, MangaChapterImages, MangaChapters } from './types';
import { withPollUntilUpdated } from '../common/rtk_utils';

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

// export const useDetailQuery = withPollUntilUpdated(
//   mangaAPI.useDetailQuery,
//   (q: ReturnType<typeof mangaAPI.useDetailQuery>) => detailsNeedUpdate(q.data)
// );
// export const useChaptersQuery = withPollUntilUpdated(
//   mangaAPI.useChaptersQuery,
//   (q: ReturnType<typeof mangaAPI.useChaptersQuery>) => detailsNeedUpdate(q.data)
// );
export const useImagesQuery = withPollUntilUpdated(
  mangaAPI.useImagesQuery,
  (q: ReturnType<typeof mangaAPI.useImagesQuery>) => q.isError
);
export const { useDetailQuery, useChaptersQuery } = mangaAPI;
