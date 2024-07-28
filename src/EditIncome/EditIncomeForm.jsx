// src/components/EditIncomeForm.jsx
import React, { useState, useEffect } from 'react';

const EditIncomeForm = ({ userId, currentIncome, onUpdateIncome }) => {
  const [income, setIncome] = useState(currentIncome);

  useEffect(() => {
    setIncome(currentIncome);
  }, [currentIncome]);

  const handleIncomeChange = (e) => {
    setIncome(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/income/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ income }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        onUpdateIncome(updatedUser.income);
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
      />
      <button type="submit">Update Income</button>
    </form>
  );
};

export default EditIncomeForm;
