// summary.jsx

import React from 'react';

const Summary = ({ income, expenses }) => {
  const totalExpenses = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
  const remainingBalance = income - totalExpenses;

  return (
    <div>
      <h2>Total Income: ${income.toFixed(2)}</h2>
      <h2>Total Expenses: ${totalExpenses.toFixed(2)}</h2>
      <h2>Remaining Balance: ${remainingBalance.toFixed(2)}</h2>
    </div>
  );
};

export default Summary;
