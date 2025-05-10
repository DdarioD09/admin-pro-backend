const { Router } = require('express');
const { check } = require('express-validator');


const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctor-controller');
const { fieldValidation } = require('../middlewares/field-validation');
const { JWTValidation } = require('../middlewares/jwt-validation');

const router = Router();

router.get('/', getDoctors);

router.post('/',
    [
        JWTValidation,
        check('name', 'Doctor name is required').not().isEmpty(),
        check('hospital', 'Hospital should be valid').isMongoId(),
        fieldValidation,
    ],
    createDoctor);

router.put('/:id',
    [
        JWTValidation,
        check('name', 'Doctor name is required').not().isEmpty(),
        check('hospital', 'Hospital should be valid').isMongoId(),
        fieldValidation,
    ],
    updateDoctor);

router.delete('/:id', JWTValidation, deleteDoctor);

module.exports = router;