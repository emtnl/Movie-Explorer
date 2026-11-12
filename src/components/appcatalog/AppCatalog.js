import { useDispatch, useSelector } from 'react-redux';
import { sortChange } from '../../reducer/MovieSlice';
import './AppCatalog.scss';

const AppCatalog = () => {
    const dispatch = useDispatch();
    const activeFilter = useSelector(state => state.movie.activeFilter);

    return (
        <section className="app-catalog" id="top">
            <div className="app-catalog__head">
                <div>
                    <div className="app-catalog__label">Каталог</div>
                    <h2 className="app-catalog__title">Популярные фильмы</h2>
                </div>

                <div className="app-catalog__sort">
                    <span className="app-catalog__sort-label">Сортировка</span>

                    <button
                        type="button"
                        className={`sort-pill${activeFilter === 'vote_average.desc' ? ' sort-pill--active' : ''}`}
                        onClick={() => dispatch(sortChange('vote_average.desc'))}
                    >
                        По рейтингу
                    </button>

                    <button
                        type="button"
                        className={`sort-pill${activeFilter === 'primary_release_date.desc' ? ' sort-pill--active' : ''}`}
                        onClick={() => dispatch(sortChange('primary_release_date.desc'))}
                    >
                        По году
                    </button>

                    <button
                        type="button"
                        className={`sort-pill${activeFilter === 'original_title.asc' ? ' sort-pill--active' : ''}`}
                        onClick={() => dispatch(sortChange('original_title.asc'))}
                    >
                        По названию
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AppCatalog;