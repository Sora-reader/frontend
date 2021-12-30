import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiUrl } from '.';
import { MangaSearchResult } from './types';

// Define a service using a base URL and expected endpoints
const searchAPIBaseUrl = `${apiUrl}/manga`;
export const searchAPI = createApi({
  reducerPath: 'searchAPI',
  baseQuery: fetchBaseQuery({ baseUrl: searchAPIBaseUrl }),
  endpoints: (builder) => ({
    search: builder.query<MangaSearchResult, string>({
      query: (title) => `?title=${title}`,
    }),
    paginate: builder.mutation<MangaSearchResult, string>({
      query: (next) => next.replace(searchAPIBaseUrl, ''),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSearchQuery, usePaginateMutation } = searchAPI;
