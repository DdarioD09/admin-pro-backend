const { Router } = require('express');

const { JWTValidation } = require('../middlewares/jwt-validation');
const { getAll, getAllFromCollection } = require('../controllers/search-controller');

const router = Router();

router.get('/:search', JWTValidation, getAll);

router.get('/collection/:collection/:search', JWTValidation, getAllFromCollection);

module.exports = router;