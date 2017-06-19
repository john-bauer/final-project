// $(function() {
//   var socket = io();
//   $('form').submit(function() {
//     socket.emit('chat message', $('#m').val());
//     $('#m').val('');
//     return false;
//   });
//   socket.on('chat message', function(msg) {
//     $('#messages').append($('<li>').text(msg));
//   });
// });

/*=========================*/
const socket = io();
const messages = document.querySelector('#messages');
const input = document.querySelector('#m');
const form = document.querySelector('form');
let source;
let target;

/*========= publishing =========*/
publish = () => {
  source = input.value
  socket.emit('chat message', input.value);
  input.value = ''
  return false;
}

socket.on('chat message', function(msg){
  let message = document.createElement('li');
  message.innerHTML = msg;
  messages.appendChild(message);
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
