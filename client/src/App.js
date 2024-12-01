import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';

function App() {
  const [token, setToken] = useState(null);

  return (
    <div style={{ padding: '20px' }}>
      {!token ? (
        <>
          <h1>Регистрация</h1>
          <RegistrationForm />
          <hr />
          <h1>Вход</h1>
          <LoginForm setToken={setToken} />
        </>
      ) : (
        <Dashboard token={token} setToken={setToken} />
      )}
    </div>
  );
}

export default App;