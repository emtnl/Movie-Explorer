import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetFilmGenresQuery } from '../../api/ApiSlice';
import { setFilters } from '../../reducer/MovieSlice';
import './ModalBanner.scss';

const MIN_YEAR = 1930;
const MAX_YEAR = new Date().getFullYear();

const validate = ({ yearFrom, yearTo }) => {
    const errors = {};
    const outOfRange = (y) => y && (Number(y) < MIN_YEAR || Number(y) > MAX_YEAR);

    if (outOfRange(yearFrom) || outOfRange(yearTo)) {
        errors.years = `Год должен быть от ${MIN_YEAR} до ${MAX_YEAR}`;
    } else if (yearFrom && yearTo && Number(yearFrom) > Number(yearTo)) {
        errors.years = 'Год «От» не может быть больше года «До»';
    }

    return errors;
};

const ModalBanner = ({ isOpen, onClose }) => {
    const [selectedGenre, setSelectedGenre] = useState([]);
    const [rating, setRating] = useState(0);
    const dispatch = useDispatch();
    const { data } = useGetFilmGenresQuery();
    const genres = data?.genres ?? [];

    const formik = useFormik({
        initialValues: {
            yearFrom: '',
            yearTo: '',
        },
        validate,
        onSubmit: (values) => {
            const filters = {
                genreId: selectedGenre.length > 0 ? selectedGenre.join(',') : null,
                yearFrom: values.yearFrom || null,
                yearTo: values.yearTo || null,
                minRating: Number(rating) > 0 ? Number(rating) : null,
            };

            dispatch(setFilters(filters));
            onClose();
        },
    });

    const toggleGenre = (id) => {
        if (selectedGenre.includes(id)) {
            setSelectedGenre(selectedGenre.filter((g) => g !== id));
        } else {
            setSelectedGenre([...selectedGenre, id]);
        }
    };

    return (
        <Modal
            show={isOpen}
            onHide={onClose}
            size="lg"
            centered
            contentClassName="filters-modal"
        >
            <form onSubmit={formik.handleSubmit} noValidate>
                <Modal.Header closeButton>
                    <Modal.Title>Фильтры</Modal.Title>
                </Modal.Header>

                <Modal.Body className="filters-modal__body">
                    <section>
                        <h3 className="filters-modal__label">Жанры</h3>
                        <div className="filters-modal__genres">
                            {genres.map(({ id, name }) => (
                                <button
                                    key={id}
                                    type="button"
                                    aria-pressed={selectedGenre.includes(id)}
                                    className={`filters-modal__chip ${selectedGenre.includes(id) ? 'filters-modal__chip--active' : ''}`}
                                    onClick={() => toggleGenre(id)}
                                >
                                    {name[0].toUpperCase() + name.slice(1)}
                                </button>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="filters-modal__label">Год выпуска</h3>
                        <div className="filters-modal__years">
                            <label>
                                От
                                <input
                                    type="number"
                                    name="yearFrom"
                                    placeholder="2000"
                                    className={formik.errors.years ? 'is-invalid' : ''}
                                    value={formik.values.yearFrom}
                                    onChange={formik.handleChange}
                                />
                            </label>
                            <span aria-hidden="true">—</span>
                            <label>
                                До
                                <input
                                    type="number"
                                    name="yearTo"
                                    placeholder="2026"
                                    className={formik.errors.years ? 'is-invalid' : ''}
                                    value={formik.values.yearTo}
                                    onChange={formik.handleChange}
                                />
                            </label>
                        </div>
                        {formik.errors.years && (
                            <div className="filters-modal__error" role="alert">
                                {formik.errors.years}
                            </div>
                        )}
                    </section>

                    <section>
                        <div className="filters-modal__row">
                            <label htmlFor="minRating" className="filters-modal__label">Рейтинг от</label>
                            <span className="filters-modal__badge">{Number(rating).toFixed(1)}</span>
                        </div>

                        <input
                            id="minRating"
                            type="range"
                            min="0"
                            max="10"
                            step="0.5"
                            className="filters-modal__range"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            style={{ '--fill': `${(rating / 10) * 100}%` }}
                        />

                        <div className="filters-modal__scale">
                            <span>0</span>
                            <span>10</span>
                        </div>
                    </section>
                </Modal.Body>

                <Modal.Footer>
                    <button type="button" className="filters-modal__btn" onClick={onClose}>
                        Закрыть
                    </button>
                    <button type="submit" className="filters-modal__btn filters-modal__btn--primary">
                        Показать фильмы
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default ModalBanner;