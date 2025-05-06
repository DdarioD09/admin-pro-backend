const { Router } = require('express');
const { check } = require('express-validator');
const expressFileUpload = require('express-fileupload');

const { JWTValidation } = require('../middlewares/jwt-validation');
const { fileUpload, getImage } = require('../controllers/upload-file-controller');
const { fieldValidation } = require('../middlewares/field-validation');

const router = Router();

router.use(expressFileUpload());

router.put('/:type/:id',
    [
        JWTValidation,
        check('id', 'Id parameter must be valid').isMongoId(),
        fieldValidation
    ],
    fileUpload);

router.get('/:type/:image', getImage);

module.exports = router;