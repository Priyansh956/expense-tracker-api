const mongoose = require('mongoose');
const {transaction} = require('../models/transactionsModel');

// Add expense

async function addExpense(req, res){
    const {expenditureCategory, amount, category, date, note} = req.body;

    if(!expenditureCategory) return res.status(400).json({
        "message": "Choose the expenditure type",
        "success": false,
    });
    
    if(!amount) return res.status(400).json({
        "message": "Enter the amount",
        "success": false,
    });

    if(!category) return res.status(400).json({
        "message": "Choose the category",
        "success": false,
    });

    if(!date) return res.status(400).json({
        "message": "Enter the date",
        "success": false,
    });

    const new_transaction = await transaction.create({
        expenditureCategory,
        amount,
        category,
        date,
        note,
    });

    return res.status(201).json({
        "message": "Transaction logged successfully",
        "data": new_transaction,
        "success": true,
    });
}

// Edit expense


// Delete expense

module.exports = addExpense;