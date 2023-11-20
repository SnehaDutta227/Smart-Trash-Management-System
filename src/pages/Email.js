// EmailValidationPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailValidationPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const nav = useNavigate();

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError('Invalid email address');
    } else {
      setError('');
      alert('Email submitted successfully: ' + email);
      // Navigate to the correct route (change '/mymap' to '/map')
      nav('/map');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="email">
          Enter your email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          type="button"
          onClick={validateEmail}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EmailValidationPage;
