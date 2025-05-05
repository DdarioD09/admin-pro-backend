const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controlles/login-controller');
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

module.exports = router;