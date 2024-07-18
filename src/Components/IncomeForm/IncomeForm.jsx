//IncomeForm.jsx

import React, { useState } from 'react';

const IncomeForm = ({ setIncome }) => {
  const [incomeInput, setIncomeInput] = useState('');

  const handleChange = (e) => {
    setIncomeInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIncome(parseFloat(incomeInput));
    setIncomeInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="number" 
        value={incomeInput} 
        onChange={handleChange} 
        placeholder="Enter your income" 
        required 
      />
      <button type="submit">Set Income</button>
    </form>
  );
};

export default IncomeForm;
