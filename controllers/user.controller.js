var shortid = require('shortid');
var bodyParser = require('body-parser');

var db = require('../db');

module.exports.index = (req, res) => {
        res.render('users/index',{
            users:db.get('users').value()
    });
}

module.exports.search = (req, res) => {
    //  gia tri search cua query
     var q = req.query.q;
     // nhung user tim dc ung voi gia tri q
     var matchedUsers = db.get('users').value().filter((user) => {
         return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
     })
     // truy cap users/index cho tham so mang users la matchedUsers
     res.render('users/index',{
         users: matchedUsers
    });
}

module.exports.create = (req, res) => {
    res.render('users/create')
}

module.exports.postCreate = (req, res) => {
    //tao id random cho user vua tao
   req.body.id = shortid.generate();
   var errors = [];

   if (!req.body.name){
       errors.push('Name is required');
   }
   if (!req.body.phone){
       errors.push('Phone is required');
   }

   if (errors.length) {
    res.render('users/create', {
        errors: errors,
        values: req.body
    });   
    return;
   }
   //push user do vao db va tro lai  list users
    db.get('users').push(req.body).write();
    res.redirect('/users');
}

module.exports.viewId = (req, res) => {
    var id = req.params.id;
    //get key users trong db.json theo id dong tren
    var userViewing = db.get('users').find({id: id}).value();
 
    res.render('users/view',{
        user: userViewing
    });
 }
 