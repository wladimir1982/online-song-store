import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from 'constants/apiBaseUrl';
import apiURLs from 'constants/apiURLs';

export const singersApi = createApi({
  reducerPath: 'singersApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Singers'],
  endpoints: build => ({
    fetchAllSingers: build.query({
      query: () => ({
        url: apiURLs.singers.root,
        method: 'GET',
        providesTags: ['Singers']
      })
    })
  })
});

export const { useFetchAllSingersQuery } = singersApi;
