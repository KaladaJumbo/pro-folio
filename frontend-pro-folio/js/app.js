$(document).foundation();

/*************************************** GLOBALS *******************************************/ 
//url stuff 
const URL = "http://localhost:4000/users"
//navbar
const menuUl = document.querySelector(".menu").children
const home = menuUl[0]
const skills = menuUl[1]
const projects = menuUl[2]
const contact = menuUl[3]
//minibar
const minibar = () => document.querySelector(".top-list-right")


//login
const form = document.querySelector("#signin")

/*******************************************************************************************/ 



/************************************* EVENT LISTENERS *************************************/ 

document.addEventListener("DOMContentLoaded", () => {
    miniBarConfig();
    addNavBarListeners();
})


function addNavBarListeners() {
    //navbar
    home.addEventListener("click", () => {});
    skills.addEventListener("click", () => {});
    projects.addEventListener("click", () => {});
    contact.addEventListener("click", () => {});
    
}

function notLoggedInMiniBarListener() {
    let bar = minibar().children
    let clientLogin = bar[0]
    let signup = bar[1]
    let support = bar[2]

    clientLogin.addEventListener("click", () => {
        userLogin()
    });
    signup.addEventListener("click", () => {
        signUp()
    });
    support.addEventListener("click", () => {});
}

function loggedInMiniBarListener() {
    let logout = document.querySelector(".top-list-right").children[0]
    let userInfo = document.querySelector(".top-list-right").children[1]
    let support = document.querySelector(".top-list-right").children[2]

    logout.addEventListener("click", () => {
        userLogout()
    });
    userInfo.addEventListener("click", () => {
        userInfo()
    });
    support.addEventListener("click", () => {
        console.log("support button logged in")
    });
}

/*******************************************************************************************/ 

function userLogin() {
    form.innerHTML = ""
    form.innerHTML = `
    <form class="login">
     <div class="sign-in-form">
       <h4 class="text-center">login</h4>
       <label for="sign-in-form-username">Username</label>
       <input type="text" class="sign-in-form-username" id="sign-in-form-username">
       <label for="sign-in-form-password">Password</label>
       <input type="text" class="sign-in-form-password" id="sign-in-form-password">
       <button type="submit" class="sign-in-form-button">Sign In</button>
     </div>
   </form>
    `
    let loginForm = document.querySelector(".login")
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        handleLogin(e)
    })
}

function signUp() {
    form.innerHTML = ""
    form.innerHTML = `
    <form class="sign-up">
     <div class="sign-in-form">
       <h4 class="text-center">Sign-Up</h4>

       <label for="sign-in-form-username">First Name</label>
       <input type="text" class="sign-in-form-username" id="sign-in-form-firstname">

       <label for="sign-in-form-username">Last Name</label>
       <input type="text" class="sign-in-form-username" id="sign-in-form-lastname">

       <label for="sign-in-form-username">Username</label>
       <input type="text" class="sign-in-form-username" id="sign-in-form-username">

       <label for="sign-in-form-password">Password</label>
       <input type="text" class="sign-in-form-password" id="sign-in-form-password">
       <button type="submit" class="sign-in-form-button">Create Account</button>
     </div>
   </form>
    `
    let signUpForm = document.querySelector(".sign-up")
    signUpForm.addEventListener("submit", (e) => {
        e.preventDefault();
        handleSignUp(e)
    })
}

function userLogout() {
    sessionStorage.removeItem("currentUser")
    window.location.reload();
}

function userInfo() {
    
}

function handleSignUp(e) {
    let fName = e.target[0].value
    let lName = e.target[1].value
    let uName = e.target[2].value
    let password = e.target[3].value

    let userObj = {
        first_name: fName,
        last_name: lName,
        username: uName,
        password: password
    }

    let meta = {
        method: "POST",
        headers: {"Content-Type":"application/json"}, 
        body: JSON.stringify(userObj)
    }

    fetch(URL, meta)
    .then(r => r.json())
    .then(data => {
        console.log(data); //dont forget to delete me after use 
        sessionStorage.setItem("currentUser", data.username);
        completedLogin();
    })
    // .catch(error => {
    //     console.log("failure")
    //     failedSignup(error)
    // })
}

function handleLogin(e) {
    
}

function completedLogin() {
    //remove form 
    form.innerHTML = ""

    // rename and relisten to buttons
    miniBarConfig()
}

function failedSignup(params) {
    //handle what happens if database rejects you
}

function miniBarConfig() {
    let welcomeMessage = document.querySelector(".welcome")
    
    if(sessionStorage.getItem("currentUser")){      //if currentuser exist return true
        welcomeMessage.innerText = "Hello, " + sessionStorage.getItem("currentUser")
        minibar().innerHTML = `
        <li>Logout</li>
        <li>Profile Information</li>
        <li>Support</li>
        `
        console.log("if");
        loggedInMiniBarListener();
    }
    else {
        console.log("else")
        welcomeMessage.innerText = ""
        minibar().innerHTML = `
        <li>Client Login</li>
        <li>Sign-up</li>
        <li>Support</li>
        `
        notLoggedInMiniBarListener();
    }
}



