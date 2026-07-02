const express = require('express');
const {addExpense, editExpense, deleteExpense} = require('../../controllers/transactionsController');
const { restrictToLoggedInUsersOnly } = require('../../middleware/auth');

const router = express.Router();

router.use(restrictToLoggedInUsersOnly);

router.post('/expenditure', addExpense);
router.patch('/expenditure/:id', editExpense);
router.delete('/expenditure/:id', deleteExpense);

module.exports = router;