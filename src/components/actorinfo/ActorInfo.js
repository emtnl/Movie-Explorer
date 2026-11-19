import { Link } from 'react-router-dom';
import './ActorInfo.scss';
import {useGetPersonDetailsQuery} from '../../api/ApiSlice';



const ActorInfo = () => {
    const {data} = useGetPersonDetailsQuery(287);
    console.log(data);
    
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
                            <span className="actor-info__fact-value">Чикаго, Иллинойс, США</span>
                        </div>
                        <div className="actor-info__fact">
                            <span className="actor-info__fact-label">Дата смерти</span>
                            <span className="actor-info__fact-value"></span>
                        </div>
                        <div className="actor-info__fact">
                            <span className="actor-info__fact-label">Возраст</span>
                            <span className="actor-info__fact-value">71 год</span>
                        </div>
                        <div className="actor-info__fact">
                            <span className="actor-info__fact-label">Карьера</span>
                            <span className="actor-info__fact-value">Актёр, режиссёр</span>
                        </div>
                        <div className="actor-info__fact">
                            <span className="actor-info__fact-label">Фильмов</span>
                            <span className="actor-info__fact-value">61</span>
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
                            <span>1948 — 2019</span>
                            <span className="actor-info__dot" aria-hidden="true">·</span>
                            <span>прожил 71 год</span>
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
                        <button type="button" className="actor-info__more-btn">Читать полностью</button>
                    </section>

                    <section id="filmography">
                        <div className="actor-info__films-head">
                            <div>
                                <div className="actor-info__films-count">Всего: 61</div>
                                <h2 className="actor-info__films-title">Фильмография</h2>
                            </div>

                            <div className="actor-info__sort">
                                <button type="button" className="sort-pill sort-pill--active">По рейтингу</button>
                                <button type="button" className="sort-pill">По году</button>
                            </div>
                        </div>

                        <div className="film-list" aria-label="Фильмография">
                            {/* сюда карточки фильмов, как в «Похожих фильмах» */}
                        </div>

                        <div className="actor-info__more">
                            <button type="button" className="actor-info__btn">Показать ещё</button>
                        </div>
                    </section>

                </div>
            </div>
        </article>
    );
};

export default ActorInfo;