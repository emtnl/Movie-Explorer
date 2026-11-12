import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import { useGetFilmGenresQuery } from '../../api/ApiSlice';
import './ModalBanner.scss';
import { useState } from 'react';
const ModalBanner = ({ isOpen, onClose }) => {

    const parametrs = useFormik({
        values: {
            genres: '',
            year: '',
            rating: ''
        },
        onSubmit: values => console.log(JSON.stringify(values, null, 2))
    })

    const { data } = useGetFilmGenresQuery();
    const genres = data?.genres ?? [];
    const [selectedGenre, setSelectedGenre] = useState([]);
    return (
        <Modal
            show={isOpen}
            onHide={onClose}
            size="lg"
            centered
            contentClassName="filters-modal"
        >
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
                                 className={`filters-modal__chip ${selectedGenre === id ? 'filters-modal__chip--active' : ''}`}
                                 onClick={() => setSelectedGenre(id)}
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
                            <input type="number" placeholder="2000" />
                        </label>
                        <span aria-hidden="true">—</span>
                        <label>
                            До
                            <input type="number" placeholder="2026" />
                        </label>
                    </div>
                </section>

                <section>
                    <label htmlFor="minRating" className="filters-modal__label">Рейтинг от</label>
                    <input
                        id="minRating"
                        type="range"
                        min="0"
                        max="10"
                        step="0.5"
                        className="filters-modal__range"
                    />
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
        </Modal>
    );
};

export default ModalBanner;