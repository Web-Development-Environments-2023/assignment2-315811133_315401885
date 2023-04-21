var currentUser;


window.addEventListener(
    "keydown",
    (event) => {
        if(event.code == "Escape" && aboutModal.style.display == ""){
            aboutToggle();
        }

        else if(event.code == "Escape" && scoreboardDisplay.style.display == ""){
            scoreboardToggle();
        }
            
    });

const getAccounts = function() {
    return JSON.parse(localStorage.getItem("Accounts"));
}

Storage.prototype.setAccount = function(username, account) {
    const accounts = getAccounts();
    accounts.push(account);
    this.setItem("Accounts", JSON.stringify(accounts));
}

Storage.prototype.getAccount = function(username){
    const findAccount = (account) => {
        return account.username == username;
    } ;
    
    const accounts = getAccounts();
    const foundAccount = accounts.find(findAccount);
    if(foundAccount){
        return foundAccount;
    }else{
        return null;
    }
}


const Connect = () => {
    const username = document.getElementById("connect-username");
    const password = document.getElementById("connect-password");
    const msg = document.getElementById("login-msg");
    const hello = document.getElementById("hello-user");

    var span=""

    var account = localStorage.getAccount(username.value);
    if(!account || account.password != password.value){
        span = "<span style='color: red;'>Username or Passwords are incorrect</span>"
        msg.innerHTML = "" + span;
        return;
    }

    msg.innerHTML = "";
    currentUser = account;
    hello.innerText = `Hello, ${username.value}`;
    $('#scoreboard-tb tr:not(:first)').remove();
    scoreboard = [];
    configureToggle();
    loginToggle();
}

const Register = () => {
    acceptForm = true;

    check_username();
    check_password();
    verify_password();
    check_firstName();
    check_lastname();
    check_email();

    if (!acceptForm) {
        return false;
    }

    var username = document.querySelector('#username-input');
    var password1 = document.querySelector('#password1-input');
    var firstName = document.querySelector('#first-name-input');
    var lastName = document.querySelector('#last-name-input');
    var birthdate = document.querySelector('#MoveInDate');
    var email = document.querySelector('#email-input');

    
    const account = {
        username: username.value,
        password: password1.value,
        firstname: firstName.value,
        lastname: lastName.value,
        birthdate: birthdate.value,
        email: email.value
    }
    
    localStorage.setAccount(username.value, account);

    username .innerHTML = '';
    password1.innerHTML = '';
    firstName.innerHTML = '';
    lastName .innerHTML = '';
    birthdate.innerHTML = ''; 
    email.innerHTML = '';

    // localStorage.setItem(account.username, JSON.stringify(account));
    loginToggle();
    signInToggle();
    return false;
}

var check_email = () => {
    const emailIn = document.querySelector("#email-input");
    const emailLb = document.querySelector("#email-label");

    var span = "";

    
}

var check_username = () => {
    const usernameIn = document.querySelector("#username-input");
    const usernameLb = document.querySelector("#username-label");

    var span = ""

    if (usernameIn.value.length < 1) {
        var span = "<span style='color: red;'>Please Insert Valid Username</span>"
        acceptForm = acceptForm && false;
    }
    else if(localStorage.getItem(usernameIn.value)){
        var span = "<span style='color: red;'>Username already Taken!</span>"
        acceptForm = acceptForm && false;
    }
    usernameLb.innerHTML = "Username: " + span;
}

var check_password = () => {
    const passwordIn = document.querySelector("#password1-input");
    const passwordLb = document.querySelector("#password1-label");

    var span = "";

    if (passwordIn.value.length == 0) {
        span = "<span style='color: red;'>Password must contain atleast 8 charcters</span>"
        acceptForm = acceptForm && false;
    } else if (!passwordIn.value.match("\\d") || !passwordIn.value.match("[a-zA-Z]")) {
        span = "<span style='color:red;'>Password must contain Digits and Letters</span>"
        acceptForm = acceptForm && false;
    }

    passwordLb.innerHTML = "Password: " + span;
}

function configure(){
    var color = document.getElementById("spaceship-color").value;
    var timer = document.getElementById("timer-setup").value;

    setSpaceshipColor(color);
    setTimer(timer)

    configureToggle();
    menuToggle(true);
}

var verify_password = () => {
    const passwordInVerify = document.querySelector("#password2-input");
    const passwordVerifyLb = document.querySelector("#password2-label");
    const passwordIn = document.querySelector("#password1-input");

    var span = "";

    if (passwordInVerify.value != passwordIn.value) {
        span = "<span style='color: red;'>Password doesn't match</span>"
        acceptForm = acceptForm && false;
    }
    passwordVerifyLb.innerHTML = "Verify Password: " + span;
};

var check_firstName = () => {

    const firstNameIn = document.querySelector("#first-name-input");
    const firstNameLb = document.querySelector("#first-name-label");
    var span = "";

    if (firstNameIn.value.match("\\d")) {
        span = "<span style='color:red;'>First name must contain only letters</span>"
        acceptForm = acceptForm && false;
    }

    firstNameLb.innerHTML = "First Name: " + span;
}

var check_lastname = () => {
    const lastnameIn = document.querySelector("#last-name-input");
    const lastnameLb = document.querySelector("#last-name-label");
    var span = "";

    if (lastnameIn.value.match("\\d")) {
        span = "<span style='color:red;'>Last name must contain only letters</span>"
        acceptForm = acceptForm && false;
    }
    lastnameLb.innerHTML = "Last Name: " + span;
}


function menuToggle(state) {
    var main_menu = document.getElementById("main-menu");
    if(state){
        main_menu.style.display = "";
        return;
    }
    if (main_menu.style.display === "none") {
        main_menu.style.display = "";
    } else {
        main_menu.style.display = "none";
    }
}

function signInToggle() {
    var signIn = document.getElementById("sign-in-screen");
    if (signIn.style.display === "none") {
        signIn.style.display = "";
    } else {
        signIn.style.display = "none";
    }
}

function loginToggle(){
    var login = document.getElementById("login-screen");
    if (login.style.display === "none") {
        login.style.display = "";
    } else {
        login.style.display = "none";
    }
}

function aboutToggle(){
    var about = document.getElementById("about-modal");
    if (about.style.display === "none") {
        about.style.display = "";
    } else {
        about.style.display = "none";
    }
}

function scoreboardToggle(){
    var scoreboard = document.getElementById("scoreboard");
    if (scoreboard.style.display === "none") {
        scoreboard.style.display = "";
    } else {
        scoreboard.style.display = "none";
    }
}


function welcomeToggle(){
    var welcome = document.getElementById("welcome-screen");
    if (welcome.style.display === "none") {
        welcome.style.display = "";
    } else {
        welcome.style.display = "none";
    }
}

function containerToggle(){
    var container = document.getElementById("container");
    if (container.style.display === "none") {
        container.style.display = "";
    } else {
        container.style.display = "none";
    }
}


function configureToggle(){
    var about = document.getElementById("configure");
    if (about.style.display === "none") {
        about.style.display = "";

        var keyConfig = document.getElementById("fire-input")
        keyConfig.addEventListener(
            "keyup",
            (event) => {
                keyConfig.value = event.code;
                setFireButton(event.key);
            }
        )
    } else {
        about.style.display = "none";
    }
}

function backLoginScreen(){
    loginToggle();
    signInToggle();
}
