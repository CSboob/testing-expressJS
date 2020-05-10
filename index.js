const express = require('express')
const app = express()
const port = 3000

var users1 =[
    {id: 1, name: 'Huy' },
    {id: 2, name: 'Thinh' }
];

app.set('view engine','pug')
app.set('views', './views');

 app.get('/', (req, res) => res.render('index',{
     name: 'AAA'
 }));
 
 app.get('/users',(req, res) => res.render('users/index',{users: users1}));

 app.get('/users/search', (req, res) => {
    //  gia tri search cua query
     var q = req.query.q;
     // nhung user tim dc ung voi gia tri q
     var matchedUsers = users1.filter((user) => {
         return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
     })
     // truy cap users/index cho tham so mang users la matchedUsers
     res.render('users/index',{
         users: matchedUsers
    });

 });

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))