import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const TMDB_KEY = '5a5ff6c27a9f041cc266d17848ab129e';
const language = 'language=ru-RU';
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
    endpoints: builder => ({
        getPopularFilms: builder.query({
            query: ({ page = 1,
                sortBy = 'popularity.desc',
                genreId = null,
                yearFrom = null,
                yearTo = null,
                minRating = null
            }) => {
                // return `/discover/movie?api_key=${TMDB_KEY}&${language}&page=${page}&sort_by=${sortBy}&vote_count.gte=100`;
                let url = `/discover/movie?api_key=${TMDB_KEY}&${language}&page=${page}&sort_by=${sortBy}&vote_count.gte=100`;
                if (genreId) {
                    url += `&with_genres=${genreId}`;
                }

                
                if (yearFrom) {
                    url += `&primary_release_date.gte=${yearFrom}-01-01`;
                }
                if (yearTo) {
                    url += `&primary_release_date.lte=${yearTo}-12-31`;
                }

                if (minRating) {
                    url += `&vote_average.gte=${minRating}`;
                }

                return url;
            }
        }),
        getFilmGenres: builder.query({
            query: () => `genre/movie/list?api_key=${TMDB_KEY}&${language}`
        }),
        getMovieDetails: builder.query({
            query: (movieId) => `/movie/${movieId}?api_key=${TMDB_KEY}&${language}`
        }),
        getMovieActors: builder.query({
            query: (movieId) => `/movie/${movieId}/credits?api_key=${TMDB_KEY}&${language}`
        })
    })
})

export const {useGetPopularFilmsQuery, useGetFilmGenresQuery, useGetMovieDetailsQuery, useGetMovieActorsQuery} = apiSlice;