import React from 'react';
import Calculator from './components/Calculator';
import './App.css';

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-600">
      <Calculator />
    </div>
  );
};

export default App;