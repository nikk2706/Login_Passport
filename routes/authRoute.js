const express = require('express');
const authController = require('../controllers/authController');
const {auth_Token} = require('../middleware/authToken');
const hashPasswordMiddleware = require('../middleware/Hashpassword');
const {isAuth} = require('../middleware/authentication');
const router = express.Router();

router.post('/register', hashPasswordMiddleware, authController.registerUser);
router.post('/login', authController.login);
router.get('/usersdata', isAuth,  authController.getUsersData);
router.get('/profile/:id', auth_Token, authController.getprofile);

module.exports = router;
