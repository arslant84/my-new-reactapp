import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="page-container not-found">
      <h1>404 - Страница не найдена</h1>
      <p>Извините, запрашиваемая страница не существует.</p>
      <Link to="/home" className="back-link">Вернуться на главную</Link>
    </div>
  );
};

export default NotFound;
