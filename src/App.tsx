import React, { useState } from 'react';
import Form from './components/Form/index';
import ThankYou from './components/ThankYou';

function App() {
  const [showThankYou, setShowThankYou] = useState(false);

  const handleFormSubmitSuccess = () => {
    setShowThankYou(true);
  };

  const handleBackToHome = () => {
    setShowThankYou(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {showThankYou ? (
        <ThankYou onBackToHome={handleBackToHome} />
      ) : (
        <Form onSubmitSuccess={handleFormSubmitSuccess} />
      )}
    </div>
  );
}

export default App;