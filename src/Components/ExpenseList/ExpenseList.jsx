//ExpenseList.jsx
import React from 'react';

const ExpenseList = ({ expenses }) => {
  return (
    <ul>
      {expenses.map((expense, index) => (
        <li key={index}>
          {expense.name} - ${expense.amount} - {expense.category} - {expense.date}
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
