import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
    },
    title: {
      fontSize: '2rem',
      marginBottom: '1rem',
      color: '#333',
    },
    buttonContainer: {
      position: 'absolute',
      top: '20px',
      left: '20px',
    },
    button: {
      backgroundColor: 'blue',
      border: 'none',
      color: 'white',
      padding: '10px 20px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
      margin: '4px 2px',
      cursor: 'pointer',
      borderRadius: '4px',
    },
    buttonHover: {
      backgroundColor: 'red',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <Link to="/login" style={styles.button}>
          Login/Register
        </Link>
      </div>
      <h1 style={styles.title}>Welcome to Music Shop</h1>
    </div>
  );
}

export default App;
