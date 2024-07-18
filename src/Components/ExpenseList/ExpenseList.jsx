// src/components/ExpenseList.jsx
import React, { useState } from 'react';

const ExpenseList = ({ expenses, editExpense, deleteExpense }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentExpense, setCurrentExpense] = useState({ name: '', amount: '', category: '', date: '', dueDate: '' });

  const startEditing = (index, expense) => {
    setEditingIndex(index);
    setCurrentExpense(expense);
  };

  const handleChange = (e) => {
    setCurrentExpense({ ...currentExpense, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    editExpense(editingIndex, currentExpense);
    setEditingIndex(null);
    setCurrentExpense({ name: '', amount: '', category: '', date: '', dueDate: '' });
  };

  const handleDelete = (index) => {
  deleteExpense(index);
  };

  return (
    <ul>
      {expenses.map((expense, index) => (
        <li key={index}>
          {editingIndex === index ? (
            <div>
              <input type="text" name="name" value={currentExpense.name} onChange={handleChange} placeholder="Expense Name" required />
              <input type="number" name="amount" value={currentExpense.amount} onChange={handleChange} placeholder="Amount" required />
              <input type="text" name="category" value={currentExpense.category} onChange={handleChange} placeholder="Category" required />
              <input type="date" name="date" value={currentExpense.date} onChange={handleChange} required />
              <input type="date" name="dueDate" value={currentExpense.dueDate} onChange={handleChange} required />
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div>
              <strong>{expense.name}</strong> - ${expense.amount} - {expense.category}
              <div>Added Date: <strong>{expense.date}</strong></div>
              <div>Due Date: <strong>{expense.dueDate}</strong></div>
              <button onClick={() => startEditing(index, expense)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
