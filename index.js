var express = require('express')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');

var authMiddleware = require('./middlewares/auth.middleware');

var app = express();
var port = 3000;


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser('asdsadjk2132lj'))

app.use(express.static('public'))

app.set('view engine','pug')
app.set('views', './views');

app.get('/', (req, res) => res.render('index',{
     name: 'AAA'
}));

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))