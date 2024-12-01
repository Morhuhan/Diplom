import React, { useState } from 'react';
import axios from 'axios';

function RegistrationForm() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4444/register', form);
      alert('Регистрация прошла успешно!');
      setForm({ username: '', password: '', role: '' });
    } catch (error) {
      alert('Ошибка при регистрации');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Имя пользователя:</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Пароль:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Роль:</label>
        <input
          type="text"
          name="role"
          value={form.role}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}

export default RegistrationForm;