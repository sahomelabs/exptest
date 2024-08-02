import React, { useState, useEffect } from 'react';
import './IncomeForm.css';

const IncomeForm = ({ setIncome, initialIncome }) => {
  const [incomeInput, setIncomeInput] = useState('');

  useEffect(() => {
    if (initialIncome !== undefined) {
      setIncomeInput(initialIncome);
    } else {
      // Load income from local storage if it exists
      const savedIncome = localStorage.getItem('income');
      if (savedIncome) {
        setIncomeInput(savedIncome);
      }
    }
  }, [initialIncome]);

  const handleChange = (e) => {
    setIncomeInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const incomeValue = parseFloat(incomeInput);
    setIncome(incomeValue);
    // Save income to local storage
    localStorage.setItem('income', incomeValue);
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
