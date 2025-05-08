const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/update-chips', authController.updateChips)
router.post('/register', authController.register);

module.exports = router;