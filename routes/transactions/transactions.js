const express = require('express');
const addExpense = require('../../controllers/transactionsController');

const router = express.Router();


router.post('/expenditure', addExpense);

module.exports = router;