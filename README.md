# Expense Tracker App
# Working on new branch  envnew

Overview
The Expense Tracker App is a web application designed to help users manage their monthly income and expenses. Users can track their expenses by category, view summaries, and authenticate to save their data. This application is built with React for the frontend and Node.js with Express for the backend, utilizing MongoDB for data storage.

Features
User Authentication: Users can sign up, sign in, and sign out to manage their data securely.
Income Management: Users can enter and track their income.
Expense Management: Users can add, edit, and delete expenses categorized by different groups.
Expense Summary: Users can view a summary of their income, total expenses, and remaining balance.
Responsive Design: The application is designed to work on various screen sizes.
Technology Stack
Frontend: React, CSS
Backend: Node.js, Express
Database: MongoDB
Folder Structure
project-root/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── App.css
│   ├── .env
│   ├── package.json
│   └── README.md
├── .gitignore
└── README.md
Getting Started
Prerequisites
Node.js and npm (Node Package Manager)
MongoDB
Backend Setup
Navigate to the backend directory:

bash
Copy code
cd backend
Install dependencies:

bash
Copy code
npm install
Create a .env file in the backend directory with the following content:

env
Copy code
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret Key>
Start the server:

bash
Copy code
npm start
Frontend Setup
Navigate to the frontend directory:

bash
Copy code
cd frontend
Install dependencies:

bash
Copy code
npm install
Create a .env file in the frontend directory with the following content:

env
Copy code
REACT_APP_API_URL=http://localhost:5000
Start the development server:

bash
Copy code
npm start
Running the Application
The frontend will be accessible at http://localhost:3000.
The backend will be accessible at http://localhost:5000.
Usage
Sign Up: Navigate to the Sign Up page and create a new account.
Sign In: After signing up, sign in to access your dashboard.
Add Income: Enter your income details in the Income Form.
Add Expense: Use the Expense Form to track your expenses. Select the category group and category, then enter the amount and dates.
View Summary: The Summary section will display your total income, total expenses, and remaining balance.
Edit/Delete Expenses: Access the Expense List to edit or delete individual expenses.
Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. For major changes, open an issue to discuss your proposed changes.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
React for the frontend framework
Node.js and Express for the backend
MongoDB for the database
