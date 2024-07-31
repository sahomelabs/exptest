//src/Components/ExpenseList/ExpenseList
import React, { useEffect, useState } from 'react';
import './ExpenseList.css';

const ExpenseList = ({isAuthenticated}) => {
  const [expenses, setExpenses] = useState([]);

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
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);


  const handleDelete = async (id) => {
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
  };

  const handleEdit = async (id, updatedExpense) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/expenses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedExpense),
      });

      const data = await response.json();
      setExpenses(expenses.map(expense => (expense._id === id ? data : expense)));
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
            Category Group: {expense.categoryGroup} <br />
            Category: {expense.category} <br />
            Date: {new Date(expense.date).toLocaleDateString()} <br />
            Due Date: {new Date(expense.dueDate).toLocaleDateString()} <br />
            Amount: ${expense.amount.toFixed(2)} 
            {isAuthenticated && (
             <>
             <button onClick={() => handleEdit(expense._id, expense)}>Edit</button>
             <button onClick={() => handleDelete(expense._id)}>Delete</button>
           </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;