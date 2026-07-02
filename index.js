// Importing modules
require('dotenv').config();
require('./config/db'); 
const express = require('express');
const authRouter = require('./routes/auth/user');
const transactionRouter = require('./routes/transactions/transactions');

const app = express();

// Mongoose connection and schema building for database


// Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Mounting user router
app.use('/auth', authRouter);
app.use('/transactions', transactionRouter);

app.listen(process.env.PORT, () => {console.log(`Served successfully started at PORT number: ${process.env.PORT}`)});