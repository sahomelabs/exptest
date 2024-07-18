// summary.jsx
import React from 'react';

const Summary = ({ expenses }) => {
  const total = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);

  return (
    <div>
      <h2>Total Expenses: ${total.toFixed(2)}</h2>
    </div>
  );
};

export default Summary;
