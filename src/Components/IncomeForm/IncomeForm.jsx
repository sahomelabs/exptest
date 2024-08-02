import React, { useState, useEffect } from 'react';
import './IncomeForm.css';

const IncomeForm = ({ setIncome, userId, isAuthenticated }) => {
  const [incomeInput, setIncomeInput] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      console.error('User is not authenticated');
      return;
    }

    const fetchIncome = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage or context
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/income/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setIncomeInput(data.income || '');
        setIncome(data.income || 0);
      } catch (error) {
        console.error('Error fetching income:', error);
      }
    };

    fetchIncome();
  }, [userId, setIncome, isAuthenticated]);

  const handleChange = (e) => {
    setIncomeInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      console.error('User is not authenticated');
      return;
    }

    const incomeValue = parseFloat(incomeInput);
    setIncome(incomeValue);

    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage or context
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/income/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount: incomeValue })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Income updated:', data);
    } catch (error) {
      console.error('Error updating income:', error);
    }
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
      <button type="submit" disabled={!isAuthenticated}>
        {incomeInput ? 'Update Income' : 'Add Income'}
      </button>
    </form>
  );
};

export default IncomeForm;
