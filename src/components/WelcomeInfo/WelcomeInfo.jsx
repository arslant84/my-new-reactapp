import React from 'react';
import styles from './WelcomeInfo.module.css';

const WelcomeInfo = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Unsplash Photo Search</h1>
    <p className={styles.subtitle}>
      Unsplash Photo Search — это ваш быстрый и удобный доступ к миллионам бесплатных, высококачественных фотографий от Unsplash.
    </p>
    <div className={styles.section}>
      <h2 className={styles.heading}>Возможности приложения</h2>
      <ul className={styles.list}>
        <li><b>Поиск по ключевым словам</b> — находите нужные изображения за секунды.</li>
        <li><b>Просмотр потрясающих фотографий</b> — вдохновляйтесь работами лучших фотографов мира.</li>
        <li><b>Загрузка фото в различных разрешениях</b> — используйте изображения для любых целей.</li>
      </ul>
    </div>
    <p className={styles.text}>
      Мы сделали Unsplash еще доступнее, чтобы вы могли легко находить идеальные визуальные материалы для своих проектов, презентаций и вдохновения.
    </p>
    <div className={styles.signature}>
      С любовью,<br />
      <b>Команда Unsplash Photo Search</b>
    </div>
  </div>
);

export default WelcomeInfo; 