//loginAlertRegisterPage
var loginAlertRegisterPage = document.getElementById('loginAlertRegisterPage');
//p-loginAlertRegisterPage
var ploginAlertRegisterPage = document.getElementById('ploginAlertRegisterPage');

const urlParam = new URLSearchParams(window.location.search);
const myParam = urlParam.get('error');
if(myParam) {
    ploginAlertRegisterPage.innerText = myParam.replace(/\_/g, " ");
    loginAlertRegisterPage.style.display = 'block';
}
