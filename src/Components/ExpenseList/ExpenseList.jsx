//src/Components/ExpenseList/ExpenseList

import React, { useEffect, useState } from 'react';
import './ExpenseList.css';

const ExpenseList = ({ isAuthenticated }) => {
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isEditing, setIsEditing] = useState(null);
  const [editForm, setEditForm] = useState({ categoryGroups: '', categories: '', amount: '', date: '', dueDate: '' });

  const categoryGroups = ['Housing', 'CreditCard', 'Transportation', 'Food', 'Utilities', 'Insurance', 'Healthcare', 'Savings', 'Entertainment', 'PayIn4'];
  const categories = {
    Housing: ['Rent', 'Mortgage', 'Property Tax', 'Home Phone Bill', 'Gas', 'Water', 'Sewer', 'Supplies', 'Other'],
    CreditCard: [ 'Capital One', 'Bank of America', 'Bank of America', 'Wells Fargo', 'Citi','American Express', 'Discover',
       'Credit One', 'Credit One', 'Chase', 'Chase Business','Chase Business'],
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
        calculateTotal(data);
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

        setExpenses(expenses.filter(expense => expense._id !== id));
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
      setExpenses(expenses.map(expense => (expense._id === isEditing ? data : expense)));
      setIsEditing(null); // Exit editing mode
    } catch (error) {
      console.error('Error editing expense:', error);
    }
  };

  return (
    <div className="expense-list">
      <h2>Expenses Dashboard</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {isEditing === expense._id ? (
              <form onSubmit={handleEditSubmit}>
                <select name="categoryGroups" value={editForm.categoryGroups} onChange={handleEditChange}>
                  {categoryGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
                <select name="categories" value={editForm.categories} onChange={handleEditChange}>
                  {categories[editForm.categoryGroups]?.map(categories => (
                    <option key={categories} value={categories}>{categories}</option>
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
      <h3>Total Expense Amount: ${totalAmount.toFixed(2)}</h3>
    </div>
  );
};

export default ExpenseList;
