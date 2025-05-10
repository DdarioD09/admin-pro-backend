const { Router } = require('express');
const { check } = require('express-validator');


const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospital-controller');
const { fieldValidation } = require('../middlewares/field-validation');
const { JWTValidation } = require('../middlewares/jwt-validation');

const router = Router();

router.get('/', getHospitals);

router.post('/',
    [
        JWTValidation,
        check('name', 'hospital name is required').not().isEmpty(),
        fieldValidation
    ],
    createHospital);

router.put('/:id',
    [
        // JWTValidation,
        check('name', 'Hospital name is required').notEmpty(),
        fieldValidation
    ],
    updateHospital);

router.delete('/:id', JWTValidation, deleteHospital);

module.exports = router;