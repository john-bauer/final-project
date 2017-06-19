const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const env = require('dotenv').config();
const routes = express.Router();
const watson = require('watson-developer-cloud');
const language_translator = watson.language_translator({
  url: 'https://gateway.watsonplatform.net/language-translator/api',
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  version: 'v2'
});

/********************************
********* ENVIRONMENT ***********
********************************/

/*========== STATIC FILE ==========*/
app.use('/static', express.static(path.join(__dirname, 'public')));

/*========== VIEWS SETUP ==========*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*============ LOGGER =============*/
app.use(logger('dev'));

/*= BODY PARSER & METHOD OVERRIDE =*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

/*============ ROUTES =============*/
app.get('/', function(req, res) {
  res.render('index', {
    documentTitle: 'Fluently'
  });
});

app.get('/chat', function(req, res) {
  res.render('chat', {
    documentTitle: 'Fluently | Chat'
  });
});

/*===== HANDLE USER SUBMISSION ===*/
routes.post('/', (req, res) => {
  let userInput = req.body;
  createUser(userInput);
  res.redirect('/chat');
})

app.use('/', routes);

/*======== SERVER LISTENING ======*/
const PORT = process.env.PORT || 3000;
http.listen(PORT, function(){
  console.log(`listening on port ${PORT}`);
});

/*********************************
**********************************/

/*=================================
    WATSON TRANSLATE FUNCTION
=================================*/
const translate = function (msg, callback) {
    language_translator.translate({
    text: msg,
    source: "en",
    target: "it",
  }, function(err, translation) {
    let output;
    if (err){
      output = "error";
      console.log(output);
      callback(err);
    }
    else {
      output = (translation.translations[0].translation);
      callback(null, output);
    }
  });
};

/*=================================
        USER DATA HANDLING
=================================*/
let userData = [];
let userCount = 0;

createUser = (userInput) =>{
  userData.push(userInput);
  console.log(`userData: ${JSON.stringify(userData)}`);
  userCount++;
  console.log(`userCount: ${userCount}`);
}

/*=================================
        CHAT SERVER
=================================*/
/*------ log "a user connected"-------*/
io.on('connection', function(socket){
  console.log('a user connected');
  /*------ log "user disconnected"----*/
  socket.on('disconnect', function(){
    console.log('user disconnected');
    socket.emit
  })
});

/*------- emit message to channel ---*/
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    userMessage = "Name:" + msg;
    io.sockets.emit('chat message', userMessage);
    translate(msg, function (err, output) {
      if (err) {
        console.log('error')
        return;
      } else {
      io.sockets.emit('chat message', output);
      }
    });
  });
});



/*======== CATCHING 404 =========*/
app.get('*', function(req, res){
  res.status(404).send({message: 'oops! Not found.'});
})