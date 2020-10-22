$(document).foundation();

/*************************************** GLOBALS ********************************************/ 
//url stuff 
const URL = "http://localhost:4000/users"
//navbar
const menuUl = document.querySelector(".menu").children
const home = menuUl[0]
const skills = menuUl[1]
const projects = menuUl[2]
const contact = menuUl[3]
let user = {}
//minibar
const minibar = () => document.querySelector(".top-list-right")

//login
const form = document.querySelector("#signin")

//check if a form is on the screen
let formUp = false

//main container
const mainContainer = document.querySelector("#cellwall")


/*******************************************************************************************/ 



/************************************* EVENT LISTENERS *************************************/ 

document.addEventListener("DOMContentLoaded", () => {
    miniBarConfig();
    addNavBarListeners();
    loadUserInfo()
})


//navbar events
function addNavBarListeners() {
    home.addEventListener("click", () => {
        removeNewSkillButton()
        homePageConfig();
    });
    skills.addEventListener("click", () => {
        let homePage = document.querySelector("#cellwall")
        homePage.innerHTML = ""
        addSkillToBar()
        handleSkillsButton()
    });
    projects.addEventListener("click", () => {
        removeNewSkillButton()
        handleProjectsButton()
    });
    contact.addEventListener("click", () => {
        removeNewSkillButton()
        handleContactButton()
    });
    
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
    let editSkills = document.querySelector(".top-list-right").children[1]
    let editProjects = document.querySelector(".top-list-right").children[2]

    logout.addEventListener("click", () => {
        userLogout()
    });
    editSkills.addEventListener("click", () => {
        makeSkill()
    });
    editProjects.addEventListener("click", () => {
        projectsForm()
    
    });
}

function loadUserInfo() {
    if(sessionStorage.getItem("currentUser")) {
        fetch(URL + "/" + sessionStorage.getItem("currentUser"))
        .then(r => r.json())
        .then(data => {
            user = data
        })
    }
}

/*******************************************************************************************/ 

/*************************************** login *******************************************/ 

function userLogin() {
    form.innerHTML = ""
    mainContainer.innerHTML = ""

    form.innerHTML = `
    <form class="login">
     <div class="sign-in-form">
       <h4 class="text-center">login</h4>
       <label for="sign-in-form-username">Username</label>
       <input type="text" class="sign-in-form-username" id="sign-in-form-username">
       <label for="sign-in-form-password">Password</label>
       <input type="password" class="sign-in-form-password" id="sign-in-form-password">
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

function handleLogin(e) {
    let uName = e.target[0].value
    let password = e.target[1].value
    
    let userObj = {
        username: uName,
        password: password
    }

    let meta = {
        method: "POST",
        headers: {"Content-Type":"application/json"}, 
        body: JSON.stringify(userObj)
    }
    showUrl = URL + "/" + uName
    fetch(showUrl, meta)
    .then(r => r.json())
    .then(data => {
        sessionStorage.setItem("currentUser", data.username);
        user = data
        completedLogin();
        
        
    })
    .catch(error => {
        failedFetch()
    })
}

/*******************************************************************************************/ 


/************************************** sign up ***********************************************/ 

function signUp() {
    form.innerHTML = ""
    mainContainer.innerHTML = ""
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
       <input type="password" class="sign-in-form-password" id="sign-in-form-password">
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
        user = data
        sessionStorage.setItem("currentUser", data.username);
        completedLogin();

    })
    .catch(error => {
        failedFetch()
    })
}


/*******************************************************************************************/ 


/*************************************** after login or sign-up *******************************************/ 

function userLogout() {
    sessionStorage.removeItem("currentUser")
    window.location.reload();
}

function userInfo() {
    
}


function failedFetch() {
    console.log("failure")
}


function completedLogin() {
    //remove form 
    form.innerHTML = ""

    // rename and relisten to buttons
    miniBarConfig()
    
}


function miniBarConfig() {
    let welcomeMessage = document.querySelector(".welcome")
    
    if(sessionStorage.getItem("currentUser")){      //if currentuser exist return true
        welcomeMessage.innerText = "Hello, " + sessionStorage.getItem("currentUser")
        minibar().innerHTML = `
        <li>Logout</li>
        <li></li>
        <li></li>
        `
        loggedInMiniBarListener();
        homePageConfig()
    }
    else {
        welcomeMessage.innerText = ""
        minibar().innerHTML = `
        <li>Client Login</li>
        <li>Sign-up</li>
        <li>Support</li>
        `
        notLoggedInMiniBarListener();
    }
}

//****************************************************** HOME PAGE  *********************************************************************************/ 

function homePageConfig() {
    form.innerHTML = ""

    mainContainer.innerHTML = `
    <div class="grid-x grid-padding-x small-up-1 medium-up-3 large-up-3 firstRow">
      <div class="cell auto cell-style">
        <div class="margin-items" id="profile-pic">
          <div class="card pic">
            <img src="https://www.likemind.media/wp-content/uploads/2017/06/Profile-Photo.png">
          </div>
        </div>
      </div>
      <div class="cell auto cell-style margins">cell</div>
      <div class="cell auto cell-style margins">cell</div>
    </div>

    <br>
    <br>
        
    <div class="grid-x grid-padding-x small-up-1 medium-up-3 large-up-3 secondRow">
      <div class="cell auto cell-style margins">cell</div>
      <div class="cell auto cell-style margins">cell</div>
    </div>
    `

}
//****************************************************************************************************/

//********************************** SKILLS ****************************************/
function addSkillToBar() {
    minibar().innerHTML = `
        <li>Logout</li>
        <li>Add Skills</li>
        <li></li>
        `
        loggedInMiniBarListener();
       
}

function removeNewSkillButton () {
    minibar().innerHTML = `
    <li>Logout</li>
    <li></li>
    <li></li>
    `
    loggedInMiniBarListener();
}

// function skillsForm() {
//     form.innerHTML = ""
//     form.innerHTML = `

//     `
// }

function handleSkillsButton() {
    form.innerHTML = ""
   
    mainContainer.innerHTML = `
    <div class="grid-x grid-padding-x small-up-1 medium-up-3 large-up-3 firstRow">
      <div class="cell auto cell-style">
        
      </div>
      <div class="cell auto cell-style margins">cell</div>
      <div class="cell auto cell-style margins">cell</div>
    </div>

    <br>
    <br>
        
    <div class="grid-x grid-padding-x small-up-1 medium-up-3 large-up-3 secondRow">
      <div class="cell auto cell-style margins">cell</div>
      <div class="cell auto cell-style margins">cell</div>
    </div>
    `


}


function makeSkill() {
    mainContainer.innerHTML = ""
    form.innerHTML = ""
    if (formUp){
        form.innerHTML = ""
        formUp = false
        handleSkillsButton()
        return
    }    
    formUp = true
    form.innerHTML = 
    `
        <form class="newSkill">
            <div class="sign-in-form">
                <h4 class="text-center">Add a Skill</h4>
        
                <label>Skill name</label>
                <input type="text" class="sign-in-form-username" id="skill-name">

                <label>Skill Description</label>
                <input type="text" class="sign-in-form-username" id="skill-description" style="margin: 0px 0px 16px; height: 120px; width: 100%;" >
                
                <button type="submit" class="sign-in-form-button">Create Page</button>
            </div>
        </form>
    `
    
    let newPage = document.querySelector(".newSkill")
    newPage.addEventListener("submit", (e) => {
        e.preventDefault()
        fetchSkill(e)
    })
}

function fetchSkill(e){
    
    //handle the skill info

    homePageConfig();
}


//********************************************************************************************************/

/****************************************** PROJECTS ******************************************************/

function handleProjectsButton() {
    form.innerHTML = ""

    mainContainer.innerHTML = `
    <div class="grid-x grid-padding-x small-up-1 medium-up-3 large-up-3 firstRow">
      <div class="cell auto cell-style">
            
      </div>
      <div class="cell auto cell-style margins">cell</div>
      <div class="cell auto cell-style margins">cell</div>
    </div>

    <br>
    <br>
        
    <div class="grid-x grid-padding-x small-up-1 medium-up-3 large-up-3 secondRow">
      <div class="cell auto cell-style margins">cell</div>
      <div class="cell auto cell-style margins">cell</div>
    </div>
    `
}


/************************************************************************************************************/
/********************************************* CONTACTS *********************************************************/
function handleContactButton() {
    form.innerHTML = ""

    mainContainer.innerHTML = `
    <div class="grid-x grid-padding-x small-up-1 medium-up-3 large-up-3 firstRow">
      <div class="cell auto cell-style">

      </div>
      <div class="cell auto cell-style margins">cell</div>
      <div class="cell auto cell-style margins">cell</div>
    </div>

    <br>
    <br>
        
    <div class="grid-x grid-padding-x small-up-1 medium-up-3 large-up-3 secondRow">
      <div class="cell auto cell-style margins">cell</div>
      <div class="cell auto cell-style margins">cell</div>
    </div>
    `
}

/*****************************************************************************************************************/