socket = io();

//rooms seen on index page
const roomContainer = document.getElementById('roomContainer');

socket.on('new room created', (room) => {
    console.log(`Create new room: ${room}, ${user}`)
    let newElement = document.createElement('div');
    newElement.innerText = room;
    let newLink = document.createElement('a');
    newLink.href = `http://localhost:8080/room/${room}/user/${user}`;
    newLink.innerText = 'Join';
    roomContainer.append(newElement);
    roomContainer.append(newLink);
});



    






