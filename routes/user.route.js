var express = require('express')


var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');
var authMiddleware = require('../middlewares/auth.middleware');

var router = express.Router();

router.get('/', authMiddleware.requireAuth, controller.index);

router.get('/cookies', (req, res, next) => {
    res.cookie('user-id', 12345);
    res.send('hello');
});

router.get('/search', controller.search);

router.get('/create', controller.create); 

router.post('/create', validate.postCreate, controller.postCreate);

router.get('/:id', controller.viewId);

module.exports = router;

// authMiddleware.requireAuth