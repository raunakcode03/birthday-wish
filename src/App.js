import React, { useState } from 'react';
import './App.css';
import BirthdayForm from './components/BirthdayForm';
import WishDisplay from './components/WishDisplay';

function App() {
  const [wishData, setWishData] = useState(null);

  const handleGenerate = (data) => {
    setWishData(data);
  };

  return (
    <div className="app-container">
      {!wishData ? (
        <BirthdayForm onGenerate={handleGenerate} />
      ) : (
        <WishDisplay
          yourName={wishData.yourName}
          birthdayName={wishData.birthdayName}
          message={wishData.message}
          photos={wishData.photos}
        />
      )}
    </div>
  );
}

export default App;

