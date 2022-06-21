//message form in chat
var form = document.getElementById('form');
var input = document.getElementById('input');
var message = document.getElementById('messages');

//send the name of the new member
socket.emit('new chat member', room, user);
appendMessage('You joined')

//append a message to the message area
function appendMessage(msg) {
    var item = document.createElement('li');
    item.textContent = `${msg}`;
    message.appendChild(item);
}

//a member left the room
socket.on('member gone', function(member){
    appendMessage(`${member} has left`);
})

// receive message and print it to screen in chatroom
socket.on('chat message', function(msg) {
    appendMessage(msg);
    window.scrollTo(0, document.body.scrollHeight);
});

// ********************************* DOM  *********************************//
//event listener for input button
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        //send message to server
        socket.emit('chat message', room, user, input.value);
        appendMessage(`You: ${input.value}`);
        input.value = '';
    }
});
// }

// ********************************* db chat message filling *********************************//

if(messageDB && messageDB.length > 1){
    console.log(`index.js 0: ${messageDB}`)
    let escapedString = messageDB.replace(/\&#34;/g, '"')
    escapedString = escapedString.replace(/\&#39;/g, "'")
    console.log(`index.js 2: ${escapedString}`)
    let escapedArray = JSON.parse(escapedString);
    escapedArray.forEach(msg => appendMessage(`Old message from ${msg}`) )
} else if (form != null && messageDB.length == 0){
     appendMessage(`No old messages`)
}

