// src/App.jsx
import React, { useState } from 'react';
import Header from './Components/Header/Header';
import ExpenseForm from './Components/ExpenseForm/ExpenseForm';
import IncomeForm from './Components/IncomeForm/IncomeForm';
import ExpenseList from './Components/ExpenseList/ExpenseList';
import Summary from './Components/Summary/Summary';
import Footer from './Components/Footer/Footer';
import './App.css';

const App = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const editExpense = (index, updatedExpense) => {
    const newExpense = expenses.map((expense, i) => (i === index ? updatedExpense : expense));
    setExpenses(newExpense);
  };

  return (
    <div className="App">
      <Header />
      <IncomeForm setIncome={setIncome} />
      <ExpenseForm addExpense={addExpense} />
      <ExpenseList expenses={expenses} editExpense={editExpense}/>
      <Summary income={income} expenses={expenses} />
      <Footer />
    </div>
  );
};

export default App;
