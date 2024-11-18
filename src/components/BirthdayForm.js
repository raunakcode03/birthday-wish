import React, { useState } from 'react';
import './BirthdayForm.css';

const BirthdayForm = ({ onGenerate }) => {
  // State variables for form fields
  const [yourName, setYourName] = useState('');
  const [birthdayName, setBirthdayName] = useState('');
  const [message, setMessage] = useState('');
  const [photos, setPhotos] = useState([]);

  // Handle photo uploads incrementally
  const handlePhotoUpload = (event) => {
    const newFiles = Array.from(event.target.files); // Get newly selected files
    const newPhotoURLs = newFiles.map((file) => URL.createObjectURL(file)); // Convert to URLs
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotoURLs].slice(0, 5)); // Combine with existing photos, limit to 5
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form action
    onGenerate({ yourName, birthdayName, message, photos }); // Pass data to parent component
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Create a Birthday Wish</h1>
      <form onSubmit={handleSubmit} className="birthday-form">
        {/* Name of the sender */}
        <label>Your Name (Optional):</label>
        <input
          type="text"
          value={yourName}
          onChange={(e) => setYourName(e.target.value)}
          placeholder="Your Name"
        />

        {/* Name of the birthday person */}
        <label>Name of Birthday Person:</label>
        <input
          type="text"
          value={birthdayName}
          onChange={(e) => setBirthdayName(e.target.value)}
          placeholder="Name of the Birthday Person"
          required
        />

        {/* Message field */}
        <label>Your Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your birthday message..."
          required
        />

        {/* Photo upload field */}
        <label>Upload Photos (Max 5):</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
        />

        {/* Preview selected photos */}
        {photos.length > 0 && (
          <div className="photo-preview">
            <h3>Preview Photos:</h3>
            <div className="preview-container">
              {photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Preview ${index + 1}`}
                  className="preview-img"
                />
              ))}
            </div>
          </div>
        )}

        {/* Submit button */}
        <button type="submit" className="generate-button">
          Generate Wish
        </button>
      </form>
    </div>
  );
};

export default BirthdayForm;
