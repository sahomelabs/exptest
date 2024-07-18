// src/components/ExpenseForm.jsx
import React, { useState } from 'react';

const ExpenseForm = ({ addExpense }) => {
  const [expense, setExpense] = useState({ name: '', amount: '', category: '', date: '' });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(expense);
    setExpense({ name: '', amount: '', category: '', date: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={expense.name} onChange={handleChange} placeholder="Expense Name" required />
      <input type="number" name="amount" value={expense.amount} onChange={handleChange} placeholder="Amount" required />
      <input type="text" name="category" value={expense.category} onChange={handleChange} placeholder="Category" required />
      <input type="date" name="date" value={expense.date} onChange={handleChange} required />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
