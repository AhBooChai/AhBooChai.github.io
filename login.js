const passwordInput = document.getElementById('passwordInput');
const reenterPassword = document.getElementById('reenterPassword');
const submitButton = document.getElementById('submit-button');
const errorMsg = document.getElementById('error-message');

passwordInput.addEventListener('input', ($event) => {
    if($event.target.value.length >= 6 && $event.target.value.length <= 12){
        submitButton.removeAttribute('disabled');
    } else {
        submitButton.setAttribute('disabled', 'true');
    }
});

reenterPassword.addEventListener('blur', ()=> {
    if(passwordInput.value === reenterPassword.value) {
        passwordInput.style.border = 'thin solid green';
        reenterPassword.style.border = 'thin solid green';
        errorMsg.style.display = 'none';
    } else {
        passwordInput.style.border = 'thin solid red';
        reenterPassword.style.border = 'thin solid red';
        errorMsg.style.display = 'inline';
    }
});

function Toggle(){
    if(passwordInput.type === "password"){
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}