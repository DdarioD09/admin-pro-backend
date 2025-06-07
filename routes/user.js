const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, createUser, updateUser, deleteUser, selfUpdateUser } = require('../controllers/user-controller');
const { fieldValidation } = require('../middlewares/field-validation');
const { JWTValidation, adminRoleValidation } = require('../middlewares/jwt-validation');

const router = Router();

router.get('/', [JWTValidation, adminRoleValidation], getUsers);

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
        adminRoleValidation,
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('role', 'Role is required').not().isEmpty(),
        fieldValidation
    ],
    updateUser);

router.put('/profile/:id',
    [
        JWTValidation,
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        // check('role', 'Role is required').not().isEmpty(),
        fieldValidation
    ],
    selfUpdateUser);

router.delete('/:id', [JWTValidation, adminRoleValidation], deleteUser);

module.exports = router;