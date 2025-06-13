import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/home">ReactRouter</NavLink>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink 
              to="/home" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              О нас
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contacts" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Контакты
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
