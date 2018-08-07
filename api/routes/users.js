const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const checkAuth = require('../middleware/check-auth')

const UserController = require('../controller/user')

router.post('/signup', UserController.user_signup);
router.post('/login', UserController.user_login)
router.delete('/:uderId', checkAuth, UserController.user_delete)

module.exports = router;