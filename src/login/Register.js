import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

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

function Register() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, email, username, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setIsRegistered(true);
      } else {
        throw new Error(data.error || 'Error registering user');
      }
    } catch (error) {
      setRegistrationError(error.message);
      console.error(error);
    }
  };

  if (isRegistered) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={containerStyle}>
      <div>
        <h1>Register</h1>
      </div>
      <form style={formStyle} onSubmit={handleSubmit}>
        <label htmlFor="name" style={labelStyle}>Name:</label>
        <input type="text" id="name" name="name" style={inputStyle} required value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="surname" style={labelStyle}>Surname:</label>
        <input type="text" id="surname" name="surname" style={inputStyle} required value={surname} onChange={(e) => setSurname(e.target.value)} />

        <label htmlFor="username" style={labelStyle}>Username:</label>
        <input type="text" id="username" name="username" style={inputStyle} required value={username} onChange={(e) => setUsername(e.target.value)} />

        <label htmlFor="email" style={labelStyle}>Email:</label>
        <input type="email" id="email" name="email" style={inputStyle} required value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password" style={labelStyle}>Password:</label>
        <input type="password" id="password" name="password" style={inputStyle} required value={password} onChange={(e) => setPassword(e.target.value)} />

        <label htmlFor="confirmPassword" style={labelStyle}>Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" style={inputStyle} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <button type="submit" style={buttonStyle}>Register</button>
        {registrationError && <p style={{ color: 'red' }}>{registrationError}</p>}
      </form>
    </div>
  );
}

export default Register;
