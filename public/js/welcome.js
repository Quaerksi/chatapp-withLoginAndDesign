//welcome page
var listUserNames = document.getElementById('listUserNames');
var infoMessage = document.getElementById('infoMessage');

// formLogin
var welcomePageFormELement = document.getElementById('formLogin');

//at the welcome page
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


var loginAlertWelcomePage = document.getElementById('loginAlertWelcomePage');

    //   loginAlert.style.display = 'none';
      const urlParams = new URLSearchParams(window.location.search);
      const myParams = urlParams.get('error');
      if(myParams == "Incorrect_Credential") {
        loginAlertWelcomePage.style.display = 'block';
      }

