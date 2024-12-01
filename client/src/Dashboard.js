import React from 'react';

function Dashboard({ token, setToken }) {
  const handleLogout = () => {
    setToken(null);
    alert('Вы вышли из системы');
  };

  return (
    <div>
      <h1>Добро пожаловать!</h1>
      <p>Ваш токен: {token}</p>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}

export default Dashboard;