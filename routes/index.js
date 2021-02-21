const express = require('express');
const router = express.Router();
const suggerboxUser = require('../controller/suggerBoxUsers');
const validator = require('../middleware/apiValidator');


/**
 *  routes for creating user
 */

router.post('/user', suggerboxUser.userCreate);
router.post('/user-login/', suggerboxUser.userLogIn);
router.get('/users/', validator.tokenValidator, suggerboxUser.userList);
router.post('/create-task', validator.tokenValidator, suggerboxUser.createTask);
router.get('/users/:id', validator.tokenValidator, suggerboxUser.userTask);

module.exports = router;