/*===============================
          DEPENDENCIES
================================*/
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const logger = require('morgan');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const watson = require('watson-developer-cloud');
const language_translator = watson.language_translator({
  url: "https://gateway.watsonplatform.net/language-translator/api",
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  version: "v2"
});

/*================================
            ROUTES
================================*/

app.get('/', function(req, res){
  res.send('hello express');
});

/*===============================
        SERVER LISTENING
===============================*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
  console.log(`listening on port ${PORT}`);
});