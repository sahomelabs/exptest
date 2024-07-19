import React, { useState } from 'react';

const ExpenseList = ({ expenses, editExpense, deleteExpense }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentExpense, setCurrentExpense] = useState({ categoryGroup: '', category: '', amount: '', date: '', dueDate: '' });

  const startEditing = (index, expense) => {
    setEditingIndex(index);
    setCurrentExpense(expense);
  };

  const handleChange = (e) => {
    setCurrentExpense({ ...currentExpense, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    editExpense(editingIndex, currentExpense);
    setEditingIndex(null);
    setCurrentExpense({ categoryGroup: '', category: '', amount: '', date: '', dueDate: '' });
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete?')) {
      deleteExpense(index);
    }
  };

  return (
    <ul>
      {expenses.map((expense, index) => (
        <li key={index}>
          {editingIndex === index ? (
            <div>
              <select
                name="categoryGroup"
                value={currentExpense.categoryGroup}
                onChange={handleChange}
                required
              >
                <option value="">Select Category Group</option>
                <option value="HOUSING">HOUSING</option>
                <option value="FOOD">FOOD</option>
                <option value="CREDIT CARD">CREDIT CARD</option>
                <option value="TRANSPORT">TRANSPORT</option>
                <option value="PAY-IN-4">PAY-IN-4</option>
                <option value="ENTERTAINMENT">ENTERTAINMENT</option>
              </select>
              <select
                name="category"
                value={currentExpense.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {currentExpense.categoryGroup === 'HOUSING' && (
                  <>
                    <option value="Mortgage">Mortgage</option>
                    <option value="Rent">Rent</option>
                    <option value="Phone Number">Phone Number</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Gas">Gas</option>
                    <option value="Water and sewer">Water and sewer</option>
                    <option value="Cable">Cable</option>
                    <option value="Waste removal">Waste removal</option>
                    <option value="Maintenance or repairs">Maintenance or repairs</option>
                    <option value="Supplies">Supplies</option>
                    <option value="Other">Other</option>
                  </>
                )}
                {currentExpense.categoryGroup === 'FOOD' && (
                  <>
                    <option value="Food and Drink">Food and Drink</option>
                    <option value="Dining out">Dining out</option>
                    <option value="Other">Other</option>
                  </>
                )}
                {currentExpense.categoryGroup === 'CREDIT CARD' && (
                  <>
                    <option value="Capital One">Capital One</option>
                    <option value="Bank of America">Bank of America</option>
                    <option value="Wells Fargo">Wells Fargo</option>
                    <option value="Citi">Citi</option>
                    <option value="American Express">American Express</option>
                    <option value="Discover">Discover</option>
                    <option value="Credit One">Credit One</option>
                    <option value="Chase">Chase</option>
                    <option value="Chase Business">Chase Business</option>
                  </>
                )}
                {currentExpense.categoryGroup === 'TRANSPORT' && (
                  <>
                    <option value="Auto loan">Auto loan</option>
                    <option value="Car Insurance">Car Insurance</option>
                    <option value="Gas/Fuel">Gas/Fuel</option>
                    <option value="Maintenance">Car Maintenance</option>
                    <option value="Others">Others</option>
                    <option value="EzPass">EzPass</option>
                    <option value="Public Transport">Public Transport</option>
                  </>
                )}
                {currentExpense.categoryGroup === 'PAY-IN-4' && (
                  <>
                    <option value="Affirm">Affirm</option>
                    <option value="Klarna">Klarna</option>
                    <option value="Paypal">Paypal</option>
                    <option value="Afterpay">Afterpay</option>
                    <option value="Other">Other</option>
                  </>
                )}
                {currentExpense.categoryGroup === 'ENTERTAINMENT' && (
                  <>
                    <option value="Netflix">Netflix</option>
                    <option value="Hulu">Hulu</option>
                    <option value="Amazon Prime">Amazon Prime</option>
                    <option value="Disney Plus">Disney Plus</option>
                    <option value="Apple TV Plus">Apple TV Plus</option>
                    <option value="Paramount">Paramount</option>
                    <option value="YouTube Premium">YouTube Premium</option>
                    <option value="YouTube TV">YouTube TV</option>
                    <option value="Other">Other</option>
                  </>
                )}
              </select>
              <input
                type="number"
                name="amount"
                value={currentExpense.amount}
                onChange={handleChange}
                placeholder="Amount"
                required
              />
              <input
                type="date"
                name="date"
                value={currentExpense.date}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="dueDate"
                value={currentExpense.dueDate}
                onChange={handleChange}
                required
              />
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div>
              <div>
                <strong>Category Group:</strong> {expense.categoryGroup}
              </div>
              <div>
                <strong>Category:</strong> {expense.category}
              </div>
              <div>
                <strong>Amount:</strong> ${expense.amount}
              </div>
              <div>
                <strong>Date:</strong> {expense.date}
              </div>
              <div>
                <strong>Due Date:</strong> {expense.dueDate}
              </div>
              <button onClick={() => startEditing(index, expense)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
