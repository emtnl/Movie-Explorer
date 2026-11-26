import { useNavigate } from 'react-router-dom';
import './ComponentError.scss';

const ComponentError = ({
    title = 'Не найдено',
    text = 'Возможно, ссылка устарела или данные не удалось получить. Попробуйте обновить страницу или воспользуйтесь поиском.',
    code,
    onRetry,
}) => {
    const navigate = useNavigate();

    return (
        <section className="component-error" role="alert">
            <div className="component-error__glow" aria-hidden="true" />

            <div className="component-error__poster">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M3 9h18M8 4v5M16 4v5" />
                    <path d="M9 14l6 4M15 14l-6 4" />
                </svg>
                <span>Изображение недоступно</span>
            </div>

            <div className="component-error__content">
                {code && <span className="component-error__badge">Ошибка {code}</span>}
                <h2 className="component-error__title">{title}</h2>
                <p className="component-error__text">{text}</p>

                <div className="component-error__actions">
                    {onRetry && (
                        <button type="button" className="component-error__btn component-error__btn--primary" onClick={onRetry}>
                            Попробовать снова
                        </button>
                    )}
                    <button type="button" className="component-error__btn component-error__btn--outline" onClick={() => navigate(-1)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor"
                            strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M10 3L5 8l5 5" />
                        </svg>
                        Назад
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ComponentError;