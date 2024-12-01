import React, { useState } from 'react';
import axios from 'axios';

function LoginForm({ setToken }) {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4444/login', form);
      setToken(response.data.token);
      alert('Вход выполнен успешно!');
      setForm({ username: '', password: '' });
    } catch (error) {
      alert('Ошибка при входе');
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
      <button type="submit">Войти</button>
    </form>
  );
}

export default LoginForm;