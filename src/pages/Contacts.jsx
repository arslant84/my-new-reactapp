import React, { useState } from 'react';

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
    console.log('Form submitted:', formData);
    alert('Сообщение отправлено!');
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="page-container">
      <h1>Контакты</h1>
      <p>Свяжитесь с нами, используя форму ниже:</p>
      
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Сообщение:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>
        
        <button type="submit" className="submit-btn">Отправить</button>
      </form>
    </div>
  );
};

export default Contacts;
