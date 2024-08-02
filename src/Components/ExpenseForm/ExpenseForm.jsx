// src/components/ExpenseForm.jsx

import React, { useState } from 'react';
import './ExpenseForm.css';

const ExpenseForm = ({ addExpense }) => {
  const [expense, setExpense] = useState({
    amount: '',
    categoryGroups: '',
    categories: '',
    date: '',
    dueDate: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const userId = token ? JSON.parse(atob(token.split('.')[1]))._id : null;

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body: JSON.stringify({ ...expense, userId }),
      });

      if (response.status === 201) {
        const newExpense = await response.json();
        addExpense(newExpense);
        setExpense({
          amount: '',
          categoryGroups: '',
          categories: '',
          date: '',
          dueDate: '',
        });
        setError('');
      } else {
        const data = await response.json();
        setError(data.message || 'An error occurred');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Expense</h2>
      
      <select name="categoryGroups" value={expense.categoryGroups} onChange={handleChange} required>
        <option value="">Select Category Group</option>
        <option value="HOUSING">Housing</option>
        <option value="FOOD">Food</option>
        <option value="CREDIT CARD">Credit Card</option>
        <option value="TRANSPORT">Transportation</option>
        <option value="PAY-IN-4">PayIn4</option>
        <option value="ENTERTAINMENT">Entertainment</option>
      </select>
      <select name="categories" value={expense.categories} onChange={handleChange} required>
        <option value="">Select Category</option>
        {expense.categoryGroups === 'HOUSING' && (
          <>
            <option value="Mortgage">Mortgage</option>
            <option value="Rent">Rent</option>
            <option value="Internet">Internet</option>
            <option value="Phone Bill">Phone Bill</option>
            <option value="Electricity">Electricity</option>
            <option value="Gas">Gas</option>
            <option value="Water and sewer">Water and sewer</option>
            <option value="Cable">Cable</option>
            <option value="Waste removal">Waste removal</option>
            <option value="Maintenance or repairs">Maintenance or repairs</option>
            <option value="Supplies">Supplies</option>
            <option value="Other">Other</option>
          </>
        )}
        {expense.categoryGroups === 'FOOD' && (
          <>
            <option value="Food and Drink">Food and Drink</option>
            <option value="Dining out">Dining out</option>
            <option value="Other">Other</option>
          </>
        )}
        {expense.categoryGroups === 'Credit Card' && (
          <>
            <option value="Capital One">Capital One</option>
            <option value="Bank of America">Bank of America</option>
            <option value="Wells Fargo">Wells Fargo</option>
            <option value="Citi">Citi</option>
            <option value="American Express">American Express</option>
            <option value="Discover">Discover</option>
            <option value="Credit One">Credit One</option>
            <option value="Chase">Chase</option>
            <option value="Chase Business">Chase Business</option>
          </>
        )}
        {expense.categoryGroups === 'TRANSPORT' && (
          <>
            <option value="Auto loan">Auto loan</option>
            <option value="Car Insurance">Car Insurance</option>
            <option value="Gas/Fuel">Gas/Fuel</option>
            <option value="Maintenance">Car Maintenance</option>
            <option value="EzPass">EzPass</option>
            <option value="Public Transport">Public Transport</option>
            <option value="Others">Others</option>
          </>
        )}
        {expense.categoryGroups === 'PAY-IN-4' && (
          <>
            <option value="Affirm">Affirm</option>
            <option value="Klarna">Klarna</option>
            <option value="Paypal">Paypal</option>
            <option value="Afterpay">Afterpay</option>
            <option value="Other">Other</option>
          </>
        )}
        {expense.categoryGroups === 'ENTERTAINMENT' && (
          <>
            <option value="Netflix">Netflix</option>
            <option value="Hulu">Hulu</option>
            <option value="Amazon Prime">Amazon Prime</option>
            <option value="Disney Plus">Disney Plus</option>
            <option value="Apple TV Plus">Apple TV Plus</option>
            <option value="Paramount">Paramount</option>
            <option value="YouTube Premium">YouTube Premium</option>
            <option value="YouTube TV">YouTube TV</option>
            <option value="Other">Other</option>
          </>
        )}
      </select>
    <div className="amount-input-container">
        <input type="number" name="amount" value={expense.amount} onChange={handleChange} placeholder="Amount" required className="amount-input" />
      </div>
      <div className="date-inputs">
        <div className="date-input-container">
          <label htmlFor="date">Date Added</label>
          <input id="date" type="date" name="date" value={expense.date} onChange={handleChange} required />
        </div>
        <div className="date-input-container">
          <label htmlFor="dueDate">Due Date</label>
          <input id="dueDate" type="date" name="dueDate" value={expense.dueDate} onChange={handleChange} required />
        </div>
      </div>
      <button type="submit">Add Expense</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ExpenseForm;