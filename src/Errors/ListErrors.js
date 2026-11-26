import { Link } from 'react-router-dom';
import './ListErrors.scss';

const ListErrors = ({ onRetry, code = 500 }) => {
    return (
        <section className="list-errors" role="alert">
            <div className="list-errors__icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M2 8.5a15 15 0 0 1 20 0" />
                    <path d="M5.5 12a10 10 0 0 1 13 0" />
                    <path d="M9 15.5a5 5 0 0 1 6 0" />
                    <circle cx="12" cy="19" r="1" fill="currentColor" />
                    <path d="M3 3l18 18" />
                </svg>
            </div>

            <h2 className="list-errors__title">Не удалось загрузить список</h2>
            <p className="list-errors__text">
                Что-то пошло не так на стороне сервера или пропал интернет.
                Проверьте соединение и попробуйте ещё раз.
            </p>

            <div className="list-errors__actions">
                <button type="button" className="list-errors__btn list-errors__btn--primary" onClick={onRetry}>
                    Повторить
                </button>
                <Link to="/" className="list-errors__btn list-errors__btn--outline">
                    На главную
                </Link>
            </div>

            <div className="list-errors__code">Код ошибки: {code}</div>
        </section>
    );
};

export default ListErrors;