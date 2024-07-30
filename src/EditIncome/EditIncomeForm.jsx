// src/components/EditIncomeForm.jsx
import React, { useState, useEffect } from 'react';

const EditIncomeForm = ({ currentIncome, onUpdateIncome }) => {
  const [income, setIncome] = useState(currentIncome.amount);

  useEffect(() => {
    setIncome(currentIncome.amount);
  }, [currentIncome]);

  const handleIncomeChange = (e) => {
    setIncome(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/income/${currentIncome._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: parseFloat(income) }),
      });

      if (response.ok) {
        const updatedIncome = await response.json();
        onUpdateIncome(updatedIncome);
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'An error occurred');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="income">Edit Income:</label>
      <input
        type="number"
        id="income"
        value={income}
        onChange={handleIncomeChange}
        required
      />
      <button type="submit">Update Income</button>
    </form>
  );
};

export default EditIncomeForm;
