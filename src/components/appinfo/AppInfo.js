import './AppInfo.scss';

const AppInfo = () => {
    return (
        <section className="app-info">
            <div className="app-info__sphere" aria-hidden="true"></div>
            <div className="app-info__ring" aria-hidden="true"></div>

            <div className="app-info__content">
                <h1 className="app-info__title">Найди свой следующий фильм</h1>
                <p className="app-info__text">
                    Сортируй по рейтингу, году и жанру. Только кино, без лишнего шума.
                </p>
                <a className="app-info__btn" href="#top">
                    Смотреть топ
                </a>
            </div>
        </section>
    );
};

export default AppInfo;