import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Navigate } from 'react-router-dom';


function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  const sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    return <Navigate to="/login" />;
  }
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };  

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#F8F8F8'
    },
    header: {
      fontSize: '36px',
      fontWeight: 'bold',
      marginBottom: '24px'
    },
    item: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '12px',
      borderBottom: '1px solid #EEEEEE',
      width: '100%'
    },
    itemName: {
      fontSize: '18px'
    },
    removeButton: {
      backgroundColor: '#FF0000',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '4px',
      padding: '8px',
      cursor: 'pointer'
    },
    total: {
      fontSize: '24px',
      marginTop: '24px'
    },
    checkoutButton: {
      backgroundColor: '#0070BA',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '4px',
      padding: '12px 24px',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    checkoutButtonHover: {
      backgroundColor: '#005999',
    },  
  };

  const removeItem = (index) => {
    const items = [...cartItems];
    items.splice(index, 1);
    setCartItems(items);
  };
  
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalPrice.toFixed(2),
          },
        },
      ],
    });
  };


  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      alert('Transaction completed by ' + details.payer.name.given_name);
      cartItems.forEach((item) => {
        downloadSong(item.fullUrl, item.title);
      });
      localStorage.setItem('purchasedItems', JSON.stringify(cartItems));
      setCartItems([]);
    });
  };

  const downloadSong = (url, title, downloadname) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const mp3Blob = new Blob([blob], { type: 'audio/mpeg' });
        const url = window.URL.createObjectURL(mp3Blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = downloadname || title;
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Your Cart</h1>
      {cartItems.map((item, index) => (
        <div key={index} style={styles.item}>
          <p style={styles.itemName}>{item.title}</p>
          <button style={styles.removeButton} onClick={() => removeItem(index)}>Remove</button>
        </div>
      ))}
      <p style={styles.total}>Total: ${totalPrice.toFixed(2)}</p>
      {checkout ? (
  <PayPalScriptProvider options={{ "client-id": "replacewithyourid" }}>
    <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
  </PayPalScriptProvider>
) : (
  <button
    style={{ ...styles.checkoutButton, ...(isHovered && styles.checkoutButtonHover) }}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    onClick={() => setCheckout(true)}
  >
    Checkout
  </button>
)}
    </div>
  );
}

export default Cart;
