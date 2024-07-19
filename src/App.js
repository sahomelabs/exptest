// src/App.jsx
import React, {  useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import ExpenseForm from './Components/ExpenseForm/ExpenseForm';
import IncomeForm from './Components/IncomeForm/IncomeForm';
import ExpenseList from './Components/ExpenseList/ExpenseList';
import Summary from './Components/Summary/Summary';
import Footer from './Components/Footer/Footer';
import ContactUs from './Pages/ContactUs/ContactUs';
import TermsOfUse from './Pages/TermsofUse/TermsOfUse';
import Privacy from './Pages/Privacy/Privacy';
import './App.css';

const App = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(savedExpenses);
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const editExpense = (index, updatedExpense) => {
    const newExpenses = expenses.map((expense, i) => (i === index ? updatedExpense : expense));
    setExpenses(newExpenses);
  };


  const deleteExpense = (index) => {
    const updatedExpenses = expenses.filter((expense, i) => i !== index);
    setExpenses(updatedExpenses);
  };


  return (
    <Router>
    <div className="App">
      <Header />
      <Routes>

      <Route path="/" element={
        <div>
      
      <IncomeForm setIncome={setIncome} />
      <ExpenseForm addExpense={addExpense} />
      <ExpenseList expenses={expenses} editExpense={editExpense} deleteExpense={deleteExpense}/>
      <Summary income={income} expenses={expenses} />
      </div>
      }
      />
          
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      <Footer />
    </div>
    </Router>
  );
};

export default App;
