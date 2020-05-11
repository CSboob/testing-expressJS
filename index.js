var express = require('express')
var bodyParser = require('body-parser');

var userRoute = require('./routes/user.route');

var app = express();
var port = 3000;


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine','pug')
app.set('views', './views');

app.get('/', (req, res) => res.render('index',{
     name: 'AAA'
}));

app.get('/users', userRoute);
app.get('/users/search', userRoute);
app.get('/users/create', userRoute);
app.post('/users/create', userRoute);
app.get('/users/:id', userRoute);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))