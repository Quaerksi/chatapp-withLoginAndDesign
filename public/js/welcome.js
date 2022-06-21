
var infoMessage = document.getElementById('infoMessage');
var welcomePageFormELement = document.getElementById('formLogin');
var loginAlertWelcomePage = document.getElementById('loginAlertWelcomePage');

    //   loginAlert.style.display = 'none';
      const urlParams = new URLSearchParams(window.location.search);
      const myParams = urlParams.get('error');
      if(myParams == "Incorrect_Credential") {
        loginAlertWelcomePage.style.display = 'block';
      }

