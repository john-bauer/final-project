/*=========================*/
const socket = io();
const messages = document.querySelector('#messages');
const input = document.querySelector('#m');
const form = document.querySelector('form');
let source;
let target;
let userId = window.userId

/*========= get user details =========*/
socket.on('getUserDetails', function(userId){
  console.log(userId);
  userId = window.userId;
})

/*========= publishing =========*/
publish = (userId) => {
  console.log(userId);
  source = input.value
  console.log(input.value);
  socket.emit('chat message',`${input.value}`);
  input.value = '';
  return false;
}

socket.on('chat message', function(msg){
  let message = document.createElement('li');
  message.innerHTML = msg;
  messages.appendChild(message);
})

socket.on('news', function(news){
  let alert = document.createElement('li');
  alert.innerHTML = news;
  alert.setAttribute('class', 'alert');
  messages.appendChild(alert);
})



/*===========================
      EVENT LISTENERS
===========================*/

window.onload = () => {
  form.onsubmit = submitted.bind(form);
}

function submitted(event) {
    publish();
    event.preventDefault();
}
