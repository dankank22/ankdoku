"use client"
import React from 'react';
import Link from 'next/link';
import Carousel from './carousel';

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    color: 'white',
    position: 'relative' // Ensure positioning context for absolute positioning
  },
  backButton: {
    position: 'absolute',
    top: '10px',
    left: '20px',
    fontSize: '15px',
    color: 'white',
    fontWeight: 'bold',
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  contentContainer: {
    textAlign: 'center',
    padding: '20px'
  },
  whiteRectangle: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px' // Space below the white rectangle
  },
  readyButton: {
    padding: '10px 20px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px'
  }
};

const Home = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white" style={styles.container}>
      <Link href="/">
        <div style={styles.backButton}>← Back</div>
      </Link>
      <div className="welcomeUserName" style={{ position: "absolute", top: "10px", right: "20px", display: "flex", alignItems: "center" }}>
        <div style={{ fontSize: "15px", color: "white" }}>Welcome, </div>
        <Link href="/stats">
          <div style={{ fontSize: "15px", color: "white", fontWeight: "bold", textDecoration: "underline", marginLeft: "5px" }}>dankank22</div>
        </Link>
      </div>
      <div style={styles.contentContainer}>
        <div style={styles.whiteRectangle}>
          <Carousel />
        </div>
        <Link href="/mode">
          <button
            type="button"
            className="p-2 bg-blue-500 text-white rounded"
            style={styles.readyButton}
          >
            I'm Ready!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
