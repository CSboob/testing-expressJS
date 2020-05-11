const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var shortid = require('shortid');

db = low(adapter);
db.defaults({ users: []})
  .write()

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine','pug')
app.set('views', './views');

app.get('/', (req, res) => res.render('index',{
     name: 'AAA'
}));
 
 app.get('/users',(req, res) => res.render('users/index',{
     users: db.get('users').value()
}));

 app.get('/users/search', (req, res) => {

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
 });

//app truy cap vo /users/create res se render file create.pug
 app.get('/users/create', (req, res) => {
     res.render('users/create')
});    

 app.get('/users/:id', (req, res) => {
    var id = req.params.id;
    //get key users trong db.json theo id dong tren
    var userViewing = db.get('users').find({id: id}).value();
    console.log(userViewing);
    //render userViewing
    res.render('users/view',{
        user: userViewing
    });
 })

//req.body doc key va value sau do write vao db.json  
// sau do res chuyen nguoc ve /users
 app.post('/users/create', (req, res) => {
     //tao id random cho user vua tao
    req.body.id = shortid.generate();

    //push user do vao db va tro lai  list users
     db.get('users').push(req.body).write();
     res.redirect('/users');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))