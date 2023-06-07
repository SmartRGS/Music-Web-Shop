import React from 'react';
import { Navigate } from 'react-router-dom';

function MusicCatalog() {
  const sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    return <Navigate to="/login" />;
  }

  const music = [
    { title: 'Smooth Criminal', imageUrl: 'https://i.ytimg.com/vi/h_D3VFfhvs4/mqdefault.jpg', link: '/MJ' },
    { title: 'SOS', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/4/42/SOS_-_Man_In_The_Middle.jpg', link: '/Abba1'},
    { title: 'Money Money Money', imageUrl: 'https://i.ytimg.com/vi/ETxmCCsMoD0/mqdefault.jpg', link: '/Abba2' },
  ];

  const styles = {
    container: {
      textAlign: 'center',
      fontFamily: 'Montserrat, sans-serif',
      backgroundColor: '#1f2026',
      minHeight: '100vh',
      padding: '20px',
      color: '#fff',
    },
    title: {
      marginTop: '0',
      fontSize: '3rem',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '4px',
    },
    catalog: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: '30px',
    },
    song: {
      margin: '20px',
      transition: 'all 0.2s ease-in-out',
      boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
      borderRadius: '10px',
      overflow: 'hidden',
    },
    songHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
    },
    image: {
      width: '100%',
      height: 'auto',
    },
    songTitle: {
      padding: '10px',
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#2c2d35',
      color: '#fff',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  };

  const musicList = music.map((song, index) => (
    <div key={index} style={styles.song}>
      <a href={song.link}>
        <img src={song.imageUrl} alt={song.title} style={styles.image} />
        <div style={styles.songTitle}>{song.title}</div>
      </a>
    </div>
  ));

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Music Catalog</h1>
      <div style={styles.catalog}>{musicList}</div>
    </div>
  );
}

export default MusicCatalog;
