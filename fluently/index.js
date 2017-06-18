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

/*===== HANDLE USER SUBMISSION ===*/
routes.post('/', (req, res) => {
  let userInput = req.body;
  createUser(userInput);
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
translate = (msg, source, target) => {
  language_translator.translate({
    text: msg,
    source: source,
    target: target
  }, function(err, translation) {
    if (err){
      console.log(err);
    }
    else {
      console.log(translation.translations[0].translation);
    }
  });
}

/*=================================
        USER DATA HANDLING
=================================*/
let userData = [];
let userCount = (userData.length + 1);

createUser = (userInput) =>{
  userData.push(userInput);
  console.log('ADDING USER...');
  console.log(userData);
  console.log('GETTING NEW USER COUNT')
  console.log(userData.length);
}

/*=================================
        CHAT SERVER
=================================*/




/*======== CATCHING 404 =========*/
app.get('*', function(req, res){
  res.status(404).send({message: 'oops! Not found.'});
})