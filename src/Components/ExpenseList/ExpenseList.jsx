//ExpenseList.jsx
import React from 'react';

const ExpenseList = ({ expenses }) => {
  return (
    <ul>
      {expenses.map((expense, index) => (
        <li key={index}>
          <strong>{expense.name} </strong> - ${expense.amount} - {expense.category}
          <div> Added Date: <strong>{expense.date}</strong></div> 
          <div>Bill Due Date: <strong>{expense.dueDate}</strong></div>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
