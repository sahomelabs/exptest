//src/Components/ExpenseList/ExpenseList

import React, { useEffect, useState } from 'react';
import './ExpenseList.css';

const ExpenseList = ({ isAuthenticated }) => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [income, setIncome] = useState(0);
  const [isEditing, setIsEditing] = useState(null);
  const [editForm, setEditForm] = useState({ categoryGroups: '', categories: '', amount: '', date: '', dueDate: '' });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Default to current month

  const categoryGroups = ['Housing', 'CreditCard', 'Transportation', 'Food', 'Utilities', 'Insurance', 'Healthcare', 'Savings', 'Entertainment', 'PayIn4'];
  const categories = {
    Housing: ['Rent', 'Mortgage', 'Property Tax', 'Home Phone Bill', 'Gas', 'Water', 'Sewer', 'Supplies', 'Other'],
    CreditCard: [ 'CapitalOne', 'Bank of America', 'Bank of America', 'Wells Fargo', 'Citi','American Express', 'Discover', 'Credit One', 'Credit One', 'Chase', 'Chase Business','Chase Business'],
    Transportation: ['Car Payment', 'Fuel', 'Public Transport', 'Other'],
    Food: ['Groceries', 'Dining Out'],
    Utilities: ['Electricity', 'Internet', 'Internet/Cable', 'Other'],
    Insurance: ['Health Insurance', 'Car Insurance', 'Life Insurance', 'Other'],
    Healthcare: ['Doctor', 'Pharmacy', 'Other'],
    Savings: ['Emergency Fund', 'Retirement', 'Other'],
    Entertainment: ['Movies', 'Concerts', 'Other'],
    PayIn4: ['Affirm', 'Klarna', 'Afterpay', 'PayPal-Pay-In-4', 'Splitit', 'Sezzle', 'Zip', 'Other']
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = token ? JSON.parse(atob(token.split('.')[1]))._id : null;
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/expenses/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setExpenses(data);
        setFilteredExpenses(data);
        calculateTotal(data);
        calculateMonthlyTotal(data, selectedMonth); // Calculate initial monthly total
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  const calculateTotal = (expenses) => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalAmount(total);
  };

  const calculateMonthlyTotal = (expenses, month) => {
    const monthlyTotal = expenses
      .filter(expense => new Date(expense.date).getMonth() === month)
      .reduce((sum, expense) => sum + expense.amount, 0);
    setMonthlyTotal(monthlyTotal);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this expense?');
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        await fetch(`${process.env.REACT_APP_API_URL}/api/expenses/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const updatedExpenses = expenses.filter(expense => expense._id !== id);
        setExpenses(updatedExpenses);
        setFilteredExpenses(updatedExpenses);
        calculateTotal(updatedExpenses);
        calculateMonthlyTotal(updatedExpenses, selectedMonth); // Recalculate monthly total after delete
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    }
  };

  const handleEditClick = (expense) => {
    setIsEditing(expense._id);
    setEditForm(expense);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/expenses/${isEditing}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      const data = await response.json();
      const updatedExpenses = expenses.map(expense => (expense._id === isEditing ? data : expense));
      setExpenses(updatedExpenses);
      setFilteredExpenses(updatedExpenses);
      calculateTotal(updatedExpenses);
      calculateMonthlyTotal(updatedExpenses, selectedMonth); // Recalculate monthly total after edit
      setIsEditing(null); // Exit editing mode
    } catch (error) {
      console.error('Error editing expense:', error);
    }
  };

  const handleMonthChange = (e) => {
    const month = parseInt(e.target.value, 10);
    setSelectedMonth(month);

    // Filter expenses based on the selected month
    const filtered = expenses.filter(expense => new Date(expense.date).getMonth() === month);
    setFilteredExpenses(filtered);
    calculateMonthlyTotal(filtered, month); // Update monthly total
  };

  return (
    <div className="expense-list">
      <h2>Expenses Dashboard</h2>
      <div className="month-selector">
        <label>Select Month: </label>
        <select value={selectedMonth} onChange={handleMonthChange}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {filteredExpenses.map((expense) => (
          <li key={expense._id}>
            {isEditing === expense._id ? (
              <form onSubmit={handleEditSubmit}>
                <select name="categoryGroups" value={editForm.categoryGroups} onChange={handleEditChange}>
                  {categoryGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
                <select name="categories" value={editForm.categories} onChange={handleEditChange}>
                  {categories[editForm.categoryGroups]?.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <input type="number" name="amount" value={editForm.amount} onChange={handleEditChange} />
                <label>
                  Date Added: {new Date(expense.date).toLocaleDateString()}
                  <input type="date" name="date" value={editForm.date} onChange={handleEditChange} />
                </label>
                <label>
                  Due Date: {new Date(expense.dueDate).toLocaleDateString()}
                  <input type="date" name="dueDate" value={editForm.dueDate} onChange={handleEditChange} />
                </label>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setIsEditing(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <div>Category Group: {expense.categoryGroups}</div>
                <div>Category: {expense.categories}</div>
                <div>Amount: ${expense.amount.toFixed(2)}</div>
                <div>Date Added: {new Date(expense.date).toLocaleDateString()}</div>
                <div>Due Date: {new Date(expense.dueDate).toLocaleDateString()}</div>
                {isAuthenticated && (
                  <div className='button-container'>
                    <button onClick={() => handleEditClick(expense)}>Edit</button>
                    <button onClick={() => handleDelete(expense._id)}>Delete</button>
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
      <div className="summary">
        <h3>Total Income: ${income.toFixed(2)}</h3>
        <h3>Total Expenses (All Time): ${totalAmount.toFixed(2)}</h3>
        <h3>Total Expenses for Selected Month: ${monthlyTotal.toFixed(2)}</h3>
        <h3>Remaining Amount: ${(income - monthlyTotal).toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default ExpenseList;