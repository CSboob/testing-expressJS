var express = require('express')
var router = express.Router();

var controller = require('../controllers/user.controller');


router.get('/users', controller.index);

router.get('/users/search', controller.search);

router.get('/users/create', controller.create); 

router.post('/users/create',controller.postCreate);

 router.get('/users/:id', controller.viewId);

module.exports = router;