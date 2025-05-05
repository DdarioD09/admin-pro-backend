const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, createUser, updateUser, deleteUser } = require('../controlles/user-controller');
const { fieldValidation } = require('../middlewares/field-validation');

const router = Router();

router.get('/', getUsers);

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
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('role', 'Role is required').not().isEmpty(),
        fieldValidation
    ],
    updateUser);

router.delete('/:id', deleteUser);

module.exports = router;