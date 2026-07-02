const mongoose = require('mongoose');
const {transaction} = require('../models/transactionsModel');

// Add expense
async function addExpense(req, res){
    try{
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
            // "data": new_transaction,
            "success": true,
        });
    }
    catch(err){
        return res.status(400).json({
            "message": "There was an error whilst trying to add the transaction",
            "success": false,
        });
    }
}

// Edit expense
async function editExpense(req, res){
    try{
        const {expenditureCategory, amount, category, date, note} = req.body;

        const new_transaction = await transaction.create({
            expenditureCategory,
            amount,
            category,
            date,
            note,
        });
    
        return res.status(200).json({
            "message": "Transaction updated successfully",
            "data": new_transaction,
            "success": true,
        });
    }
    catch(err){
        return res.status(400).json({
            "message": "Error in editing the logged transaction",
            "success": false,
        })
    }
}

// Delete expense
async function deleteExpense(req, res){
    try{
        const {id} = req.params;
        const deletedTransaction = await transaction.findByIdAndDelete(id);
    
        return res.status(200).json({
            "message": "Transaction delete successfully",
            "data": deletedTransaction,
            "success": true,
        });
    }
    catch(err){
        return res.status(400).json({
            "message": "Error whilst deleting the logged transaction",
            "success": false,
        })
    }
}


module.exports = {
    addExpense,
    editExpense,
    deleteExpense,
};