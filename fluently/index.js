/********************************
********* ENVIRONMENT ***********
********************************/
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
  url: "https://gateway.watsonplatform.net/language-translator/api",
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  version: "v2"
});

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

routes.post('/', (req, res) => {
  console.log(req.body);
})

app.use('/', routes);

/*======== SERVER LISTENING ======*/
const PORT = process.env.PORT || 3000;
http.listen(PORT, function(){
  console.log(`listening on port ${PORT}`);
});

/*********************************
**********************************/
/*================================
          USER DATA
================================*/



/*================================
          CHAT SERVER
================================*/



/*================================
          CHAT SERVER
================================*/





/*======== CATCHING 404 =========*/
app.get('*', function(req, res){
  res.status(404).send({message: 'oops! Not found.'});
})
