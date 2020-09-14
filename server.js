

const express = require('express');
const users = require('./routes/users');
const profile = require('./routes/profile');
const posts = require('./routes/posts');
const category = require('./routes/category');
const bodyParser = require('body-parser')
let ejs = require('ejs');
const mongoose = require('./config/database');
const app_config = require('./config/app')

var jwt = require('jsonwebtoken');
var cors = require("cors");
const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors())
app.set('secretKey', 'md-test');

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.engine('.ejs', ejs.__express);
app.set('views', __dirname + '/views');


app.use('/users', cors(), users);
app.use('/profile', cors(),validateUser, profile);
app.use('/posts', cors(), posts);
app.use('/category', cors(), category);


app.get('/', function (req, res) {
  setTimeout(() => {
    res.json({status:200,data:"server is running"})
  }, 1000);
  
});


function validateUser(req, res, next) {
  jwt.verify(req.headers['token'], req.app.get('secretKey'), function (err, decoded) {
    if (err) {
      console.log(err);
      res.json({ status: 999, message: err.message, data: null });
    } else {
      req.body.userId = decoded.id;
      next();
    }
  });
}


// handle errors
app.use(function (err, req, res, next) {
  console.log(err);
  if (err.status === 404)
    res.status(404).json({ status: 404, message: "link is Not found" });
  else if (err.status === 405)
    res.status(405).json({ status: 500, message: "this api only access image types" });
  else
    res.status(500).json({ status: 500, message: "Something looks wrong :( !!!" });


});

var port = app_config.port;
app.listen(port, function () {
  console.log('Node server listening on port ' + port + '');
});

module.exports = app



