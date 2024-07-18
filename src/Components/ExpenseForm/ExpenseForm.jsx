// ExpenseForm.jsx
import React, { useState } from 'react';

const ExpenseForm = ({ addExpense }) => {
  const [expense, setExpense] = useState({ name: '', amount: '', category: '', date: '', dueDate: '' });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(expense);
    setExpense({ name: '', amount: '', category: '', date: '', dueDate: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <select
        name="category"
        value={expense.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        <optgroup label="HOUSING">
          <option value="Mortgage">Mortgage</option>
          <option value="Rent">Rent</option>
          <option value="Phone Number">Phone Number</option>
          <option value="Electricity">Electricity</option>
          <option value="Gas">Gas</option>
          <option value="Water and sewer">Water and sewer</option>
          <option value="Cable">Cable</option>
          <option value="Waste removal">Waste removal</option>
          <option value="Maintenance or repairs">Maintenance or repairs</option>
          <option value="Supplies">Supplies</option>
          <option value="Other">Other</option>
        </optgroup>
        <optgroup label="ENTERTAINMENT"> 
            <option value="Netflixt">Netflix</option> 
            <option value="Hulu">Hulu</option> 
            <option value="Amazon Prime">Amazon Prime</option> 
            <option value="Disney Plus">Disney Plus"</option> 
            <option value="Apple TV Plus">Apple TV Plus"</option> 
            <option value="Paramount">Paramount</option> 
            <option value="YouTube Premium">YouTube Premium</option> 
            <option value="YouTube Tv">YouTube Tv</option> 
            <option value="Other">Other</option> 
        </optgroup>


      </select>
      
      <input
        type="text"
        name="name"
        value={expense.name}
        onChange={handleChange}
        placeholder="Expense Name"
        required
      />
      <input
        type="number"
        name="amount"
        value={expense.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
      />
      <input
        type="date"
        name="date"
        value={expense.date}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="dueDate"
        value={expense.dueDate}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
