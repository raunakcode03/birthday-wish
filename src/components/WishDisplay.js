import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import html2canvas from 'html2canvas';
import './WishDisplay.css';

const WishDisplay = ({ yourName, birthdayName, message, photos }) => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Download wish as an image
  const downloadWishAsImage = () => {
    const wishElement = document.getElementById('wish-container');
    html2canvas(wishElement, {
      useCORS: true,
      backgroundColor: '#000', // Explicitly set background to black
    }).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'birthday_wish.png';
      link.click();
    });
  };


  return (
    <div id="wish-container" className="wish-container">
      {/* Confetti Effect */}
      <Confetti
        width={windowDimensions.width}
        height={windowDimensions.height}
        numberOfPieces={300}
        recycle={false}
      />

      {/* Main Birthday Message */}
      <section className="greeting-section">
        <h1 className="birthday-text">🎉 Happy Birthday, {birthdayName}! 🎉</h1>
        <p className="from-text">From: {yourName || 'A Friend'}</p>
      </section>

      {/* Memories Section */}
      {photos.length > 0 && (
        <section className="gallery-section">
          <h2 className="section-title">Memories</h2>
          <div className="photo-gallery">
            {photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Memory ${index + 1}`}
                className="gallery-image"
              />
            ))}
          </div>
        </section>
      )}

      {/* Message Section */}
      <section className="message-section">
        <h2 className="section-title">A Special Message</h2>
        <p className="birthday-message">{message}</p>
      </section>

      {/* Download Buttons */}
      <div className="download-container">
        <button
          className="download-button"
          onClick={downloadWishAsImage}
        >
          Download as Image
        </button>
      </div>

      {/* Watermark */}
      <div className="watermark">Raunak Batra</div>
    </div>
  );
};

export default WishDisplay;
