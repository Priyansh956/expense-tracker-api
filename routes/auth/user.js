const express = require('express');

const {restrictToLoggedInUsersOnly} = require('../../middleware/auth');
const {signUp, userLogin} = require('../../controllers/authController');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', userLogin);

router.use(restrictToLoggedInUsersOnly);


module.exports = router;