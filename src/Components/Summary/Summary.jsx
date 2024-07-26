// summary.jsx
import React, { useEffect, useState } from 'react';
import './Summary.css';

const Summary = ({ income, expenses }) => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);

  useEffect(() => {
    const calculateTotalExpenses = () => {
      const total = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
      setTotalExpenses(total);
    };

    const calculateRemainingBalance = () => {
      const balance = income - totalExpenses;
      setRemainingBalance(balance);
    };

    calculateTotalExpenses();
    calculateRemainingBalance();
  }, [income, expenses]);

  const balanceClass = remainingBalance >= 0 ? 'positive' : 'negative';

  return (
    <div className="summary">
      <h2>Total Income: ${income.toFixed(2)}</h2>
      <h2>Total Expenses: ${totalExpenses.toFixed(2)}</h2>
      <h2 className={balanceClass}>Remaining Balance: ${remainingBalance.toFixed(2)}</h2>
    </div>
  );
};

export default Summary;
