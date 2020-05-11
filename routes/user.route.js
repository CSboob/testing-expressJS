var express = require('express')
var shortid = require('shortid');

var router = express.Router();

var db = require('../db');


router.get('/users',(req, res) => res.render('users/index',{
    users:db.get('users').value()
}));

router.get('/users/search', (req, res) => {

   //  gia tri search cua query
    var q = req.query.q;
    console.log(q);
    // nhung user tim dc ung voi gia tri q
    var matchedUsers = db.get('users').value().filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    // truy cap users/index cho tham so mang users la matchedUsers
    res.render('users/index',{
        users: matchedUsers
   });
});

//router truy cap vo /create res se render file create.pug
router.get('/users/create', (req, res) => {
    res.render('users/create')
});    

router.get('/users/:id', (req, res) => {
   var id = req.params.id;
   //get key users trong db.json theo id dong tren
   var userViewing = db.get('users').find({id: id}).value();

   res.render('users/view',{
       user: userViewing
   });
})

//req.body doc key va value sau do write vao db.json  
// sau do res chuyen nguoc ve 
router.post('/users/create', (req, res) => {
    //tao id random cho user vua tao
   req.body.id = shortid.generate();

   //push user do vao db va tro lai  list users
    db.get('users').push(req.body).write();
    res.redirect('/users');
});

module.exports = router;