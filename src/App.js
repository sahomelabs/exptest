// src/App.jsx
import React, { useState } from 'react';
import Header from './Components/Header/Header';
import ExpenseForm from './Components/ExpenseForm/ExpenseForm';
import ExpenseList from './Components/ExpenseList/ExpenseList';
import Summary from './Components/Summary/Summary';
import Footer from './Components/Footer/Footer';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <div className="App">
      <Header />
      <ExpenseForm addExpense={addExpense} />
      <ExpenseList expenses={expenses} />
      <Summary expenses={expenses} />
      <Footer />
    </div>
  );
};

export default App;
