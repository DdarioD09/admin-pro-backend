const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleLogIn } = require('../controllers/login-controller');
const { fieldValidation } = require('../middlewares/field-validation');

const router = Router();

router.post('/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        fieldValidation
    ],
    login
)

router.post('/google',
    [
        check('token', 'Google token is required').notEmpty(),
        fieldValidation
    ],
    googleLogIn
)

module.exports = router;