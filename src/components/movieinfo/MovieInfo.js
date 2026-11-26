import './MovieInfo.scss';
import '../filmlist/FilmList.scss';
import { useGetMovieDetailsQuery, useGetMovieActorsQuery, useGetMovieRecomendationQuery} from '../../api/ApiSlice';
import { useParams, Link } from 'react-router-dom';
import ActorInfo from '../actorinfo/ActorInfo';
import FilmItem from '../filmitem/FilmItem';
import ComponentError from '../../Errors/ComponentError';
import Spinner
 from '../../spinner/Spinner';
const MovieInfo = () => {
    const { id } = useParams();
    const { data: movie, isLoading: isMovieLoading } = useGetMovieDetailsQuery(id);
    const { data: credits, isLoading: isCreditsLoading } = useGetMovieActorsQuery(id);
    const { data: reco, isLoading: isRecoLoading, isError} = useGetMovieRecomendationQuery(id);
    const mainActors = credits?.cast?.slice(0, 10) || [];
    const director = credits?.crew?.find(person => person.job === 'Director');
    const recommends = reco?.results || [];
    const DateFromat = (minutes) => {
        if (!minutes) return 'Неизвестно';
        return (`${~~(minutes / 60)}ч ${minutes % 60}мин`)
    }
    const formatMoney = (amount) => {
    if (!amount) return 'Неизвестно';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
    }
    const isLoading = isMovieLoading || isCreditsLoading || isRecoLoading;
    if (isLoading) return <Spinner />

    if (isError) return <ComponentError/>
    return (
        <article className="movie-info">
            <Link to="/" className="movie-info__back">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M10 3L5 8l5 5" />
                </svg>
                <span>К каталогу</span>
            </Link>

            <header
                className="movie-info__cover"
                style={
                    movie?.backdrop_path
                        ? { backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }
                        : undefined
                }
            >
                {!movie?.backdrop_path && <div className="movie-info__sphere" aria-hidden="true"></div>}
                <div className="movie-info__shade" aria-hidden="true"></div>

                <div className="movie-info__head">
                    {movie?.backdrop_path ? (
                        <img
                            className="movie-info__poster"
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={`Постер фильма «${movie?.title}»`}
                        />
                    ) : (
                        <div className="movie-info__poster"></div>
                    )}

                    <div className="movie-info__main">
                        <div className="movie-info__genres">
                            {movie?.genres?.map(({ id, name }) => (
                                <span key={id} className="movie-info__genre">{name}</span>
                            ))}
                        </div>

                        <h1 className="movie-info__title">{movie?.title}</h1>
                        <p className="movie-info__tagline">{movie?.tagline}</p>
                        <div className="movie-info__meta">
                            {movie?.release_date?.slice(0, 4)} · {DateFromat(movie?.runtime)} · {movie?.adult ? '18+' : '0+'}
                        </div>

                        <div className="movie-info__actions">
                            <button type="button" className="movie-info__btn movie-info__btn--primary">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                                    <path d="M3 1.5v11l9-5.5z" />
                                </svg>
                                Смотреть трейлер
                            </button>
                            <button type="button" className="movie-info__btn">В избранное</button>
                        </div>
                    </div>

                    <div className="movie-info__rating">
                        <div className="movie-info__rating-value">{movie?.vote_average?.toFixed(1)}</div>
                        <div className="movie-info__rating-votes">{movie?.vote_count} оценок</div>
                    </div>
                </div>
            </header>

            <div className="movie-info__body">
                <div className="movie-info__content">
                    <section>
                        <h2 className="movie-info__label">О фильме</h2>
                        <p className="movie-info__overview">
                            {movie?.overview}
                        </p>
                    </section>

                    <section>
                        <h2 className="movie-info__label">В ролях</h2>
                        <div className="movie-info__cast">

                            {mainActors.map(({id, name, character, profile_path}) => (
                            <Link key={id} to={`/person/${id}`} className="film-list__link">
                            <div key={id} className="movie-info__actor">
                                <div className="movie-info__photo">
                                    <img src={`https://image.tmdb.org/t/p/w200${profile_path}`} alt="actor" />
                                </div>
                                <div className="movie-info__actor-name">{name}</div>
                                <div className="movie-info__actor-role">{character}</div>
                            </div>
                            </Link>
                            ))}
                        </div>
                    </section>
                </div>

                <aside className="movie-info__facts">
                    <div className="movie-info__fact">
                        <span className="movie-info__fact-label">Режиссёр</span>
                        <span className="movie-info__fact-value">{director ? director.name : 'Неизвестно'}</span>
                    </div>
                    <div className="movie-info__fact">
                        <span className="movie-info__fact-label">Оригинальное название</span>
                        <span className="movie-info__fact-value">{movie?.original_title}</span>
                    </div>
                    <div className="movie-info__fact">
                        <span className="movie-info__fact-label">Страна</span>
                        <span className="movie-info__fact-value">{movie?.production_countries.map(i => i.name).join(', ') }</span>
                    </div>
                    <div className="movie-info__fact">
                        <span className="movie-info__fact-label">Язык</span>
                        <span className="movie-info__fact-value">{movie?.spoken_languages.map(l => l.name).join(', ') }</span>
                    </div>
                    <div className="movie-info__fact">
                        <span className="movie-info__fact-label">Бюджет</span>
                        <span className="movie-info__fact-value">{formatMoney(movie?.budget)}</span>
                    </div>
                    <div className="movie-info__fact">
                        <span className="movie-info__fact-label">Сборы</span>
                        <span className="movie-info__fact-value">{formatMoney(movie?.revenue)}</span>
                    </div>
                </aside>
            </div>
            <div className="movie-info__similar">
                <h2 className="movie-info__subtitle">Похожие фильмы</h2>

                <section className="film-list" aria-label="Похожие фильмы">
                    {recommends.length ? (
                        recommends.map(({ id, ...film }) => (
                            <Link key={id} to={`/movie/${id}`} className="film-list__link">
                                <FilmItem {...film} />
                            </Link>
                        ))
                    ) : (
                        <p className="film-list__message">Похожих фильмов не нашлось.</p>
                    )}
                </section>
            </div>
        </article>
    );
};

export default MovieInfo;