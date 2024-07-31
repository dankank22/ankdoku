import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const styles = {
  carouselContainer: {
    display: 'flex',
    flexDirection: 'column', // To stack buttons and image vertically
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px'
  },
  carouselRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  carouselButton: {
    padding: '5px 10px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: '#ccc',
    margin: '10px',
    border: '2px solid black', 
    borderRadius: "5px",
    fontSize:"30px"
  },
  carouselImage: {
    maxWidth: '300px',
    maxHeight: '300px',
    height: 'auto',
    margin: '10px',
    border: '2px solid black', // Black border around the image
    borderRadius: '5px', // Optional: Rounded corners for the image
    transition: 'opacity 1s ease-in-out' // Transition for opacity change
  },
  imageDescription: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
    margin: '10px'
  },
};

const Carousel = () => {
  const images = [
    { src: '/pics/sudoku1.png', description: 'Make sure there is one of each number from 1-9 in each 3x3 grid...' },
    { src: '/pics/sudoku2.png', description: 'And one of each number from 1-9 in each row...' },
    { src: '/pics/sudoku3.png', description: 'And one of each number from 1-9 in every column!' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  const goToNextSlide = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  };

  // Automatic sliding every 7 seconds
  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div style={styles.carouselContainer}>
      <div style={styles.carouselRow}>
        <button style={styles.carouselButton} onClick={goToPrevSlide}>
          ⬅
        </button>
        <img
          src={images[currentIndex].src}
          alt={`Slide ${currentIndex + 1}`}
          style={styles.carouselImage}
        />
        <button style={styles.carouselButton} onClick={goToNextSlide}>
          ➡
        </button>
      </div>
      <p style={styles.imageDescription}>{images[currentIndex].description}</p>
    </div>
  );
};

export default Carousel;
