import Card from 'react-bootstrap/Card';
import './FilmItem.scss';

const FilmItem = ({ title, overview, poster_path, vote_average }) => {
    const overviewText = typeof overview === 'string'
        ? (overview.length > 41 ? overview.slice(0, 90) + '...' : overview)
        : 'Описание фильма пока недоступно.';

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
            <Card.Body className="film-card__body">
                <Card.Title className="film-card__title">{title}</Card.Title>
                <Card.Text className="film-card__overview">
                    {overviewText}
                </Card.Text>
                <div className="film-card__rating">
                    <span>Рейтинг</span>
                    <strong>{Number.isFinite(vote_average) ? vote_average.toFixed(1) : '—'}</strong>
                </div>
            </Card.Body>
        </Card>
    );
};

export default FilmItem;