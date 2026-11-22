import { Link, useParams} from 'react-router-dom';
import './ActorInfo.scss';
import {useGetPersonDetailsQuery} from '../../api/ApiSlice';
import FilmItem from '../filmitem/FilmItem';
import Pagination from '../filmlist/Pagination';
import { useState } from 'react';
import { sortChange } from '../../reducer/MovieSlice';
import { useDispatch } from 'react-redux';
const ActorInfo = () => {
    const [sortBy, setSortBy] = useState('vote_average');
    const collator = new Intl.Collator('ru-RU'); //для сортировки
    const dispatch = useDispatch();
    const { id } = useParams();
    const {data} = useGetPersonDetailsQuery(id);
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 12; // Сколько фильмов показывать на одной странице
    const films = data?.movie_credits?.cast || [];
    const sortedFilms = [...films].sort((a, b) => {
        if (sortBy === 'release_date') {
            return (b.release_date || '').localeCompare(a.release_date || '');
        }
        return b.vote_average - a.vote_average;
    });
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedFilms = sortedFilms.slice(startIndex, endIndex);
    return (
        <article className="actor-info">
            <Link to="/" className="actor-info__back">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M10 3L5 8l5 5" />
                </svg>
                <span>Назад</span>
            </Link>

            <div className="actor-info__layout">
                <aside className="actor-info__side">
                    <div className="actor-info__photo">
                        <img 
                            src={`https://image.tmdb.org/t/p/w200${data?.profile_path}`} 
                            alt="photo" 
                        />
                    </div>

                    <div className="actor-info__facts">
                        <div className="actor-info__fact">
                            <span className="actor-info__fact-label">Дата рождения</span>
                            <span className="actor-info__fact-value">
                            {data?.birthday 
                                ? new Date(data.birthday).toLocaleDateString('ru-RU', { 
                                    day: 'numeric', 
                                    month: 'long', 
                                    year: 'numeric' 
                                }).replace(' г.', '')
                                : 'Неизвестно'}
                            </span>
                        </div>
                        <div className="actor-info__fact">
                            <span className="actor-info__fact-label">Место рождения</span>
                            <span className="actor-info__fact-value">{data?.place_of_birth}</span>
                        </div>
                        <div className="actor-info__fact">
                            <span className="actor-info__fact-label">Дата смерти</span>
                            <span className="actor-info__fact-value">{data?.deathday ? new Date(data.deathday).toLocaleDateString('ru-RU', { 
                                    day: 'numeric', 
                                    month: 'long', 
                                    year: 'numeric' 
                                }).replace(' г.', '')
                                : 'Жив'}</span>
                        </div>
                        <div className="actor-info__fact">
                            <span className="actor-info__fact-label">Возраст</span>
                            <span className="actor-info__fact-value">{data?.deathday ? data?.deathday.slice(0, 4) - data?.birthday.slice(0, 4)
                            : new Date().getFullYear() - data?.birthday.slice(0, 4)}</span>
                        </div>
                        <div className="actor-info__fact">
                            <span className="actor-info__fact-label">Карьера</span>
                            <span className="actor-info__fact-value">{data?.known_for_department}</span>
                        </div>
                        <div className="actor-info__fact">
                            <span className="actor-info__fact-label">Фильмов</span>
                            <span className="actor-info__fact-value">{data?.movie_credits?.cast.length || 0}</span>
                        </div>
                    </div>
                </aside>

                {/* ---------- Правая колонка ---------- */}
                <div className="actor-info__main">

                    <header className="actor-info__head">
                        <div className="actor-info__roles">
                            <span className="actor-info__role">Актёр</span>
                        </div>

                        <h1 className="actor-info__name">{data?.also_known_as}</h1>

                        <div className="actor-info__life">
                            <span>{data?.deathday ? ` ${data?.birthday.slice(0, 4)} - ${data?.deathday.slice(0, 4)}` : null}</span>
                            <span className="actor-info__dot" aria-hidden="true"></span>
                            <span>{data?.deathday ? `Прожил ${data?.deathday.slice(0, 4) - data?.birthday.slice(0, 4)}` : null}</span>
                        </div>

                        <div className="actor-info__actions">
                            <a href="#filmography" className="actor-info__btn actor-info__btn--primary">
                                К фильмографии
                            </a>
                            <button type="button" className="actor-info__btn">В избранное</button>
                        </div>
                    </header>

                    <section>
                        <h2 className="actor-info__label">Биография</h2>
                        <p className="actor-info__bio">
                            {data?.biography}
                        </p>
                    </section>

                </div>   {/* конец actor-info__main */}
            </div>       {/* конец actor-info__layout */}

            {/* ---------- Фильмография на всю ширину ---------- */}
            <section id="filmography" className="actor-info__films">
                <div className="actor-info__films-head">
                    <div>
                        <div className="actor-info__films-count">Всего: {data?.movie_credits?.cast.length || 0}</div>
                        <h2 className="actor-info__films-title">Фильмография</h2>
                    </div>

                    <div className="actor-info__sort">
                        <button type="button" className={`sort-pill${sortBy === 'vote_average' ? ' sort-pill--active' : ''}`} onClick={() => setSortBy('vote_average')}>По рейтингу</button>
                        <button type="button" className={`sort-pill${sortBy === 'release_date' ? ' sort-pill--active' : ''}`} onClick={() => setSortBy('release_date')}>По году</button>
                    </div>
                </div>

                <div className="film-list" aria-label="Фильмография">
                    {paginatedFilms.length ? (
                        paginatedFilms.map(({ id, ...film }) => (
                            <Link key={id} to={`/movie/${id}`} className="actor-info__link">
                                <FilmItem {...film} />
                            </Link>
                        ))
                    ) : (
                        <p className="film-list__message">Фильмы не найдены.</p>
                    )}
                </div>

                <Pagination
                    page={page}
                    onPrev={() => setPage((p) => Math.max(1, p - 1))}
                    onNext={() => setPage((p) => p + 1)}
                />
            </section>
        </article>
    );
};

export default ActorInfo;