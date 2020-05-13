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
    console.log(req.cookies);
    res.render('users/create')
}

module.exports.postCreate = (req, res) => {
    //tao id random cho user vua tao
   req.body.id = shortid.generate();
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
 