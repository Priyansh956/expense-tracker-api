const {transaction} = require('../models/transactionsModel');
const {asyncWrapper} = require('../services/asyncWrapper');
const {NotFoundError} = require('../services/errorHandlers');

// Add expense
const addExpense = asyncWrapper(async(req, res, next) => {
    
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
        userId: req.user._id,
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
})

// Edit expense
const editExpense = asyncWrapper(async(req, res, next) => {
    const {id} = req.params;
    const {expenditureCategory, amount, category, date, note} = req.body;

    const updated_transaction = await transaction.findOneAndUpdate(
        { _id: id, userId: req.user._id },
        { expenditureCategory, amount, category, date, note },
        { new: true, runValidators: true }
    );

    if (!updated_transaction) {
        return res.status(404).json({ message: "Transaction not found", success: false });
    }

    return res.status(200).json({
        "message": "Transaction updated successfully",
        "data": updated_transaction,
        "success": true,
    });
    
})

// Delete expense
const deleteExpense = asyncWrapper(async(req, res, next)=> {try{
        const {id} = req.params;
        const deletedTransaction = await transaction.findOneAndDelete({ _id: id, userId: req.user._id});
    
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
})

const getAllTransactions = asyncWrapper(async (req, res, next) => {    
    const allTransactions = await transaction.find({userId: req.user._id});
    return res.status(200).json({
        "message": "All transactions fetched",
        "success": true,
        "data": allTransactions,
    });
})

const getTransactionsById = asyncWrapper(async (req, res, next) => {
    const {id} = req.params;    

    const transactionFetched = await transaction.findOne({
        userId: req.user._id,
        _id: id,
    });

    if (!transactionFetched) {
        throw new NotFoundError("Transaction"); 
    }
    
    return res.status(200).json({
        "message": "Transactions fetched",
        "success": true,
        "data": transactionFetched  ,
    });
})

module.exports = {
    addExpense,
    editExpense,
    deleteExpense,
    getAllTransactions,
    getTransactionsById,
};