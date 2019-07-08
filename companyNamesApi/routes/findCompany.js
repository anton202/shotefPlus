const express = require('express');
const router = express.Router();
const findCompany = require('../controllers/findCompany');

router.get('/byName/:name', findCompany.byName)
router.get('/byNumber/:number',findCompany.byNumber)

module.exports = router;