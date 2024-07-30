import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
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
import HomePage from './Components/HomePage/HomePage';
import EditIncomeForm from './EditIncome/EditIncomeForm';
import AboutUs from './Pages/AboutUs/AboutUs';
import './App.css';

const App = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');


  // Check if token exists in localStorage and update authentication state
 
  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const id = localStorage.getItem('userId');
    if (token) {
      setIsAuthenticated(true);
      setUserEmail(email);
      setUserId(id);
    }
  }, []);

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


  const handleUpdateIncome = (updatedIncome) => {
    setIncome(updatedIncome);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} userEmail={userEmail} />
      <div className="App">
        {isAuthenticated && userEmail && <p>Welcome, {userEmail.split('@')[0]}!</p>}
        <Routes>
          <Route path="/" element={
            isAuthenticated ? (
              <>
                <IncomeForm setIncome={setIncome} />
                <EditIncomeForm userId={userId} currentIncome={income} onUpdateIncome={handleUpdateIncome} /> 
                <ExpenseForm addExpense={addExpense} />
                <ExpenseList expenses={expenses} editExpense={editExpense} deleteExpense={deleteExpense} />
                <Summary income={income} expenses={expenses} />
              </>
            ) : (
              <HomePage />
            )
          } />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/about-us" element={<AboutUs/>} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/signin" element={isAuthenticated ? <Navigate to="/" /> : <SignIn setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signout" element={<SignOut setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/expenses" element={isAuthenticated ? <ExpenseList expenses={expenses} editExpense={editExpense} deleteExpense={deleteExpense} /> : <Navigate to="/signin" />} />
          <Route path="/add-expense" element={isAuthenticated ? <ExpenseForm addExpense={addExpense} /> : <Navigate to="/signin" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
