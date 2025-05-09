const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleLogIn, renewToken } = require('../controllers/login-controller');
const { fieldValidation } = require('../middlewares/field-validation');
const { JWTValidation } = require('../middlewares/jwt-validation');

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

router.get('/renew', JWTValidation, renewToken);

module.exports = router;