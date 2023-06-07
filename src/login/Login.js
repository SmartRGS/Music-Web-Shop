import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function Login() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f2f2f2',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  };

  const labelStyle = {};

  const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    marginBottom: '20px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#0000FF',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '10px',
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        console.log('Logged in!');
        const sessionId = Math.random().toString(36).substr(2, 9);
        localStorage.setItem('sessionId', sessionId);
        localStorage.setItem('loggedInUser', data.user._id);
        console.log(sessionId);
        setIsLoggedIn(true);
      } else {
        setLoginError(data.error);
      }
    } catch (error) {
      console.error(error);
      setLoginError('Error logging in user');
    }
  };  
  
  if (isLoggedIn) {
    return <Navigate to="/shop" />;
  }

  return (
    <div style={containerStyle}>
      <div>
        <h1>Login</h1>
      </div>
      <form style={formStyle} onSubmit={handleSubmit}>
        <label htmlFor="username" style={labelStyle}>
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          style={inputStyle}
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password" style={labelStyle}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          style={inputStyle}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" style={buttonStyle}>
          Login
        </button>
        <Link to="/register" style={buttonStyle}>
          Register
        </Link>
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      </form>
    </div>
  );
}

export default Login;