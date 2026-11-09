const Pagination = ({ page, onPrev, onNext }) => {
    const isFirst = page === 1;

    return (
        <div className={`film-list__flex${isFirst ? ' film-list__flex--first' : ''}`}>
            {!isFirst && (
                <div className="film-list__more">
                    <button type="button" className="film-list__more-btn" onClick={onPrev}>
                        Назад
                    </button>
                </div>
            )}

            <span className="film-list__page-num" aria-label={`Страница ${page}`}>
                {page}
            </span>

            <div className="film-list__more">
                <button type="button" className="film-list__more-btn" onClick={onNext}>
                    Вперед
                </button>
            </div>
        </div>
    );
};

export default Pagination;