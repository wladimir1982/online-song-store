import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from 'constants/apiBaseUrl';
import apiURLs from 'constants/apiURLs';

export const singerApi = createApi({
  reducerPath: 'singerApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Singer, Songs'],
  endpoints: build => ({
    fetchSinger: build.query({
      query: id => ({
        url: apiURLs.singers.details(id),
        method: 'GET',
        providesTags: ['Singer']
      })
    }),
    fetchSongs: build.query({
      query: id => ({
        url: apiURLs.songs(id),
        method: 'GET',
        providesTags: ['Songs']
      })
    })
  })
});

export const { useFetchSingerQuery, useFetchSongsQuery } = singerApi;
