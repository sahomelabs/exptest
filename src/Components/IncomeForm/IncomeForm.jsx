//IncomeForm.jsx
import React, { useState, useEffect } from 'react';
import './IncomeForm.css';

const IncomeForm = ({ setIncome, initialIncome }) => {
  const [incomeInput, setIncomeInput] = useState('');

  useEffect(() => {
    if (initialIncome !== undefined) {
      setIncomeInput(initialIncome);
    }
  }, [initialIncome]);

  const handleChange = (e) => {
    setIncomeInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIncome(parseFloat(incomeInput));
  };

  return (
    <form className="income-form" onSubmit={handleSubmit}>
      <input 
        type="number" 
        value={incomeInput} 
        onChange={handleChange} 
        placeholder="Enter your income" 
        required 
      />
      <button type="submit">{initialIncome ? 'Update Income' : 'Add Income'}</button>
    </form>
  );
};

export default IncomeForm;
