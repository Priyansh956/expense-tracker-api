const express = require('express');
const {addExpense, editExpense, deleteExpense} = require('../../controllers/transactionsController');

const router = express.Router();


router.post('/expenditure', addExpense);
router.patch('/expenditure', editExpense);
router.delete('/expenditure', deleteExpense);

module.exports = router;