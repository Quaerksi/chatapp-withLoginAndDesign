
var infoMessage = document.getElementById('infoMessage');
var welcomePageFormELement = document.getElementById('formLogin');
var loginAlertWelcomePage = document.getElementById('loginAlertWelcomePage');

// socket.emit('send user names');

    //   loginAlert.style.display = 'none';
      const urlParams = new URLSearchParams(window.location.search);
      const myParams = urlParams.get('error');
      if(myParams == "Incorrect_Credential") {
        loginAlertWelcomePage.style.display = 'block';
      }

var greeting = document.getElementById("tipping");
var i = 0;
var txt = 'Welcome to Juliettes Chat App';
var speed = 200;

var arrayGreetingText = txt.split('');

// arrayGreetingText.forEach(function(letter, index) {
//   setTimeout(function(){
//     greeting.innerHTML += letter
//   }, speed * (index + 1));
// })

var interval = setInterval(function(){
    greeting.innerHTML += arrayGreetingText[i]
    i++;
    if(i === arrayGreetingText.length) clearInterval(interval);
}, speed);
