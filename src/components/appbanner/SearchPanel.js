import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Инструмент для перехода
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './SearchPanel.scss';

const SearchPanel = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate(); // 2. Инициализация

    const handleSearch = (e) => {
        e.preventDefault(); // Останавливаем перезагрузку формы
        if (query.trim()) {
            navigate(`/search/${query}`); // 3. Переход на страницу поиска
        }
    };

    return (
        <Form className="d-flex gap-2" onSubmit={handleSearch} role="search">
            <Form.Control
                type="search"
                placeholder="Фильмы, актеры..."
                className="color-search-panel"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit" variant="dark">Найти</Button>
        </Form>
    );
};

export default SearchPanel;