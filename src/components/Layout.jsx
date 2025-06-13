import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import '../styles/Layout.css';

const Layout = () => {
  return (
    <div className="app-layout">
      <Navigation />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} ReactRouter Demo. Все права защищены.</p>
      </footer>
    </div>
  );
};

export default Layout;
