socket = io();

//rooms seen on index page
const roomContainer = document.getElementById('roomContainer');

socket.on('new room created', (room) => {
    // console.log(`Create new room: ${room}, ${user}`)
    let newElement = document.createElement('div');
    newElement.innerText = room;
    let newLink = document.createElement('a');
    newLink.href = `http://localhost:8080/room/${room}/user/${user}`;
    newLink.innerText = 'Join';
    roomContainer.append(newElement);
    roomContainer.append(newLink);
});

//welcome page
var listUserNames = document.getElementById('listUserNames');

//at the index page
if(listUserNames){
    // console.log(`at welcome page`)
    socket.emit('send user names');
}

socket.on('user names', users => {

    // console.log(`In user  names ${users}`)
    while (listUserNames.lastElementChild) {
        listUserNames.removeChild(listUserNames.lastElementChild);
    }

    users.forEach(username => {
        let element = document.createElement('li');
        element.innerText = username;
        listUserNames.append(element);
    })
    
}); 


    






