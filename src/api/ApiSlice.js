import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const TMDB_KEY = '5a5ff6c27a9f041cc266d17848ab129e';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
    endpoints: builder => ({
        getPopularFilms: builder.query({
            query: (page = 1) => `/movie/popular?api_key=${TMDB_KEY}&language=ru-RU&page=${page}`,
        })
    })
})

export const {useGetPopularFilmsQuery} = apiSlice;