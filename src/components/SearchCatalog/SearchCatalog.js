import FilmItem from '../filmitem/FilmItem';
import Pagination from '../filmlist/Pagination';
import './SearchCatalog.scss';
import { Link, useParams } from 'react-router-dom';
import {useGetsearchAllQuery} from '../../api/ApiSlice';
import { useState } from 'react';
import Spinner from '../../spinner/Spinner';

const SearchCatalog = () => {
    const { query } = useParams();
    const [page, setPage] = useState(1);
    const { data, isLoading } = useGetsearchAllQuery(query);
    const movies = data?.results?.filter(item => item.media_type === 'movie') || [];
    const actors = data?.results?.filter(item => item.media_type === 'person') || []; 

    if (isLoading) return <Spinner />;
    if (!query) return <p>Введите запрос</p>;
    
    
return (
    <div className='search-catalog'>
        <h1>Результаты поиска по "{query}"</h1>
        
        {/* Блок фильмов */}
        {movies.length > 0 && (
            <section className="search-catalog__section">
                <h2 className="search-catalog__subtitle">Фильмы</h2>
                
                <div className="search-catalog__grid">
                    {movies.map(({id, ...film}) => (
                        <Link key={id} to={`/movie/${id}`} className="search-catalog__link">
                            <FilmItem {...film} />
                        </Link>
                    ))}
                </div>
            {actors.length > 0 && (
                <section className="search-catalog__section">
                    <h2 className="search-catalog__subtitle">Актёры</h2>
                    <div className="search-catalog__people">
                        {actors.map(({ id, name, profile_path, known_for_department }) => (
                            <Link key={id} to={`/person/${id}`} className="search-catalog__person">
                                <div className="search-catalog__photo">
                                    {profile_path && (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                                            alt={name}
                                        />
                                    )}
                                </div>
                                <div className="search-catalog__person-name">{name}</div>
                                <div className="search-catalog__person-role">{known_for_department}</div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
            </section>
        )}
    </div>
);

};

export default SearchCatalog;