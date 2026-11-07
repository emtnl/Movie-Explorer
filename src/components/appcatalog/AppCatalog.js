import './AppCatalog.scss';

const sortOptions = [
    { id: 'rating', label: 'По рейтингу' },
    { id: 'year', label: 'По году' },
    { id: 'title', label: 'По названию' },
];

const AppCatalog = () => {
    const activeSort = 'rating'; // позже заменишь на состояние

    return (
        <section className="app-catalog" id="top">
            <div className="app-catalog__head">
                <div>
                    <div className="app-catalog__label">Каталог</div>
                    <h2 className="app-catalog__title">Популярные фильмы</h2>
                </div>

                <div className="app-catalog__sort">
                    <span className="app-catalog__sort-label">Сортировка</span>
                    {sortOptions.map(({ id, label }) => (
                        <button
                            key={id}
                            type="button"
                            className={`sort-pill${id === activeSort ? ' sort-pill--active' : ''}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AppCatalog;