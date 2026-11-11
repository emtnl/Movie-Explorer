import Card from 'react-bootstrap/Card';
import './FilmItem.scss';
import { useGetFilmGenresQuery } from '../../api/ApiSlice';



const FilmItem = ({ title, overview, poster_path, vote_average, release_date, genre_ids}) => {
    const overviewText = typeof overview === 'string'
        ? (overview.length > 41 ? overview.slice(0, 90) + '...' : overview)
        : 'Описание фильма пока недоступно.';

    const {data} = useGetFilmGenresQuery();

    return (
        <Card className="film-card">
            {poster_path ? (
                <Card.Img
                    className="film-card__poster"
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={`Постер фильма «${title}»`}
                />
            ) : (
                <div className="film-card__poster-placeholder">Постер недоступен</div>
            )}
            <span className="film-card__rating">
                {Number.isFinite(vote_average) ? vote_average.toFixed(1) : '—'}
            </span>
            <Card.Body className="film-card__body">
                <Card.Title className="film-card__title">{title}</Card.Title>
                <Card.Text className="film-card__overview">
                    {overviewText}
                </Card.Text>
            <div className="film-card__meta">
                <span className="film-card__year">{release_date?.slice(0, 4)}</span>
                {/* <span className="film-card__genre">{data?.genres.find(genre => genre.id === genre_ids[0])?.name || 'Жанр неизвестен'}</span>
                <span className="film-card__genre">{data?.genres.find(genre => genre.id === genre_ids[1])?.name || 'Жанр неизвестен'}</span> */}
                {genre_ids?.slice(0, 2).map(id => {
                const genreName = data?.genres?.find(g => g.id === id)?.name;
                
                return genreName ? (
                    <span key={id} className="film-card__genre">{genreName}</span>
                ) : null;
            })}
            </div>
            </Card.Body>
        </Card>
    );
};

export default FilmItem;