// src/App.jsx
import React, {  useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Header from './Components/Header/Header';
import ExpenseForm from './Components/ExpenseForm/ExpenseForm';
import IncomeForm from './Components/IncomeForm/IncomeForm';
import ExpenseList from './Components/ExpenseList/ExpenseList';
import Summary from './Components/Summary/Summary';
import Footer from './Components/Footer/Footer';
import ContactUs from './Pages/ContactUs/ContactUs';
import TermsOfUse from './Pages/TermsofUse/TermsOfUse';
import Privacy from './Pages/Privacy/Privacy';
import SignIn from './Components/SignIn/SignIn';
import SignOut from './Components/SignOut/SignOut';
import SignUp from './Components/SignUp/SignUp';
import './App.css';

const App = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(savedExpenses);
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    if (isAuthenticated) {
      // backend save logic
      console.log('Saving data to backend...', expenses);
    }
  }, [expenses, isAuthenticated]);

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
      <Navbar isAuthenticated={isAuthenticated}/>
      <Routes>

      <Route path="/" element={
        <>
      <IncomeForm setIncome={setIncome} />
      <ExpenseForm addExpense={addExpense} />
      <ExpenseList expenses={expenses} editExpense={editExpense} deleteExpense={deleteExpense}/>
      <Summary income={income} expenses={expenses} />
      </>
            
      } />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signout" element={<SignOut setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} /> {/* Add the SignUp route */}
        </Routes>
      <Footer />
    </div>
    </Router>
  );
};

export default App;
