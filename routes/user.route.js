var express = require('express')
var router = express.Router();

var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create); 

router.post('/create', validate.postCreate, controller.postCreate);

 router.get('/:id', controller.viewId);

module.exports = router;