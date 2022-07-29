const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

//On appelle les middlewares correspondantes aux routes utilisés 
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;