import { useGetPopularFilmsQuery} from '../../api/ApiSlice';
import FilmItem from '../filmitem/FilmItem';
import './FilmList.scss';
import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import Pagination from './Pagination';

const FilmList = () => {
    const [page, setPage] = useState(1);
    const activeFilter = useSelector(state => state.movie.activeFilter);
    const { data, isLoading, isError } = useGetPopularFilmsQuery({ page, sortBy: activeFilter });
   

    useEffect(() => {
    const element = document.getElementById('film-list');

    if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
    }, [page]); 

    if (isLoading) {
        return <p className="film-list__message">Загружаем фильмы...</p>;
    }

    if (isError) {
        return <p className="film-list__message film-list__message--error">Не удалось загрузить фильмы. Попробуйте позже.</p>;
    }

    return (
        <>
        <section className="film-list" id="film-list" aria-label="Популярные фильмы">
            {data?.results?.length ? (
                data.results.map(({ id, ...film }) => (
                    <FilmItem key={id} {...film} />
                ))
            ) : (
                <p className="film-list__message">Фильмы не найдены.</p>
            )}
        </section>
        
        <Pagination
            page={page}
            onPrev={() => {
                setPage((p) => p - 1);
            }}
            onNext={() => {
                setPage((p) => p + 1);
            }}
        />
        </>

    );
};

export default FilmList;