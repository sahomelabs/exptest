// src/components/ExpenseForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ExpenseForm.css';

const ExpenseForm = ({ addExpense }) => {
  const [expense, setExpense] = useState({
    amount: '',
    categoryGroup: '',
    category: '',
    date: '',
    dueDate: '',
  });
  const navigate = useNavigate();

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
        navigate('/expenses');
      } else {
        const data = await response.json();
        alert(data.message || 'An error occurred');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Expense</h2>
      
      <select name="categoryGroup" value={expense.categoryGroup} onChange={handleChange} required>
        <option value="">Select Category Group</option>
        <option value="HOUSING">HOUSING</option>
        <option value="FOOD">FOOD</option>
        <option value="CREDIT CARD">CREDIT CARD</option>
        <option value="TRANSPORT">TRANSPORT</option>
        <option value="PAY-IN-4">PAY-IN-4</option>
        <option value="ENTERTAINMENT">ENTERTAINMENT</option>
      </select>
      <select name="category" value={expense.category} onChange={handleChange} required>
        <option value="">Select Category</option>
        {expense.categoryGroup === 'HOUSING' && (
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
        {expense.categoryGroup === 'FOOD' && (
          <>
            <option value="Food and Drink">Food and Drink</option>
            <option value="Dining out">Dining out</option>
            <option value="Other">Other</option>
          </>
        )}
        {expense.categoryGroup === 'CREDIT CARD' && (
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
        {expense.categoryGroup === 'TRANSPORT' && (
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
        {expense.categoryGroup === 'PAY-IN-4' && (
          <>
            <option value="Affirm">Affirm</option>
            <option value="Klarna">Klarna</option>
            <option value="Paypal">Paypal</option>
            <option value="Afterpay">Afterpay</option>
            <option value="Other">Other</option>
          </>
        )}
        {expense.categoryGroup === 'ENTERTAINMENT' && (
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
      <input type="date" name="date" value={expense.date} onChange={handleChange} required />
      <input type="date" name="dueDate" value={expense.dueDate} onChange={handleChange} required />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;