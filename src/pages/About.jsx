import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.aboutTitle}>О нас</h1>
      <p className={styles.aboutText}>
        Мы — компания, которая специализируется на разработке веб-приложений с использованием современных технологий.
      </p>
      <p className={styles.aboutText}>
        Наша команда состоит из опытных разработчиков, дизайнеров и менеджеров проектов.
      </p>
      <p className={styles.aboutText}>
        Мы стремимся создавать качественные и удобные приложения для наших клиентов.
      </p>
    </div>
  );
};

export default About;
