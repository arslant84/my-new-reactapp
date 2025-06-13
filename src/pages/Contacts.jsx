import React, { useState } from 'react';
import styles from './Contacts.module.css';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This is just a placeholder for form submission
    alert('Сообщение отправлено!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className={styles.contactsContainer}>
      <h1 className={styles.contactsTitle}>Контакты</h1>
      <p className={styles.contactsText}>Свяжитесь с нами, используя форму ниже:</p>
      <form onSubmit={handleSubmit} className={styles.contactForm} autoComplete="off">
        <div className={styles.formGroup}>
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">Сообщение:</label>
          <textarea
            id="message"
            name="message"
            className={styles.textarea}
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>
        <button type="submit" className={styles.submitBtn}>Отправить</button>
      </form>
    </div>
  );
};

export default Contacts;
