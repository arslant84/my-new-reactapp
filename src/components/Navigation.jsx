import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <div className={styles.navContainer}>
        <NavLink to="/home" className={styles.logo}>
          ReactRouter
        </NavLink>
        <ul className={styles.navLinks}>
          <li>
            <NavLink 
              to="/home" 
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
            >
              О нас
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contacts" 
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
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
