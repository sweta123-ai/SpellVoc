const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/contactController');

router.post('/', ctrl.createContact);
router.get('/', ctrl.listContacts);

module.exports = router;
