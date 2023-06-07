import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function MJ({ songId }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCartItems(storedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    return <Navigate to="/login" />;
  }

  const song = {
    title: 'Smooth Criminal',
    singer: 'Michael Jackson',
    year: '1988',
    downloadname: 'Smooth Criminal full song',
    fullUrl: 'https://mp3-storer.m4axim.repl.co/MJ_full.mp3',
    demoUrl: 'https://mp3-storer.m4axim.repl.co/test.mp3',
    coverImage: 'https://i.ytimg.com/vi/h_D3VFfhvs4/mqdefault.jpg',
    price: 15,
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      minHeight: '100vh',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: '80px',
      borderBottom: '1px solid #DDDDDD',
      padding: '0 32px',
    },
    cartIcon: {
      fontSize: '36px',
      color: '#333',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
    },
    info: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      marginTop: '24px',
    },
    audio: {
      width: '100%',
      marginTop: '24px',
      borderRadius: '8px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    buy: {
      marginTop: '24px'
    },
    addToCartBtn: {
      backgroundColor: '#0000ff',
      color: '#fff',
      padding: '10px 20px',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '18px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }
  };

  const addToCart = () => {
    setCartItems([...cartItems, song]);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link to="/cart">
          <FaShoppingCart style={styles.cartIcon} />
        </Link>
        <div style={styles.cartIcon}>{cartItems.length}</div>
      </div>
      <div style={styles.info}>
        <h1>{song.title}</h1>
        <h2>{song.singer}</h2>
        <h2>{song.year}</h2>
        <audio controls style={styles.audio}>
          <source src={song.demoUrl} type="audio/mpeg" />
        </audio>
        <div style={styles.buy}>
          <div
            style={styles.addToCartBtn}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#555';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#0000ff';
            }}
            onClick={addToCart}
          >
            Buy for ${song.price}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MJ;
