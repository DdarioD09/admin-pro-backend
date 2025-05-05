const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/user-controller');
const { fieldValidation } = require('../middlewares/field-validation');
const { JWTValidation } = require('../middlewares/jwt-validation');

const router = Router();

router.get('/', JWTValidation, getUsers);

router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        fieldValidation
    ],
    createUser);

router.put('/:id',
    [
        JWTValidation,
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('role', 'Role is required').not().isEmpty(),
        fieldValidation
    ],
    updateUser);

router.delete('/:id', JWTValidation, deleteUser);

module.exports = router;