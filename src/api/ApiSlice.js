import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const TMDB_KEY = '5a5ff6c27a9f041cc266d17848ab129e';
const language = 'language=ru-RU';
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
    endpoints: builder => ({
        getPopularFilms: builder.query({
            query: ({ page = 1, sortBy = 'popularity.desc' }) => {
                return `/discover/movie?api_key=${TMDB_KEY}&${language}&page=${page}&sort_by=${sortBy}&vote_count.gte=100`;
            }
        }),
        getFilmGenres: builder.query({
            query: () => `genre/movie/list?api_key=${TMDB_KEY}&${language}`
        })
    })
})

export const {useGetPopularFilmsQuery, useGetFilmGenresQuery} = apiSlice;