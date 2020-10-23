$(document).foundation();

/*************************************** GLOBALS ********************************************/ 
//url stuff 
const URL = "http://localhost:4000/users"
const URLSKILLS = "http://localhost:4000/skills"
const URLPROJECTS = "http://localhost:4000/projects"

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
    loadUserInfo();
})


//navbar events
function addNavBarListeners() {
    home.addEventListener("click", () => {
        removeNewSkillButton()
        removeNewProjectButton()
        homePageConfig();
    });
    skills.addEventListener("click", () => {
        let homePage = document.querySelector("#cellwall")
        homePage.innerHTML = ""
        removeNewProjectButton()
        addSkillToBar()
        handleSkillsButton()
    });
    projects.addEventListener("click", () => {
        removeNewSkillButton()
        
        let homePage = document.querySelector("#cellwall")
        homePage.innerHTML = ""
        addProjectToBar()
        handleProjectsButton()
    });
    contact.addEventListener("click", () => {
        removeNewSkillButton()
        removeNewProjectButton()
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
            miniBarConfig()
            addNavBarListeners();
        })
    }
    else {
        miniBarConfig()
        addNavBarListeners();
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
    console.log(user);
    mainContainer.innerHTML = `
    <div class="card" style="width: 300px;">
        <div class="name">
            ${user.first_name} ${user.last_name}
        </div>
        <img src="https://www.likemind.media/wp-content/uploads/2017/06/Profile-Photo.png">
        <div class="card-section">
            <h4 class="status-name skill-name">Status header</h4>
            <p  class="status-description skill-description">Status description</p>
        </div>
        <span class= "buttonIcon" id="b3"><i class="far fa-edit profile-edit"></i></span>
    </div>
    `

}
//****************************************************************************************************/


{/* <div class="grid-x grid-padding-x small-up-1 medium-up-3 large-up-3 firstRow">
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
    </div> */}








//********************************** SKILLS ****************************************/
function addSkillToBar() {
    minibar().innerHTML = `
        <li>Logout</li>
        <li></li>
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
      <div class="cell auto cell-style shadow">
        <div class="skill-name">
            ${user.skills[0].name}
        </div>
        <div class="skill-description">
            ${user.skills[0].description}
        </div>
        <span class= "buttonIcon" id="b1"><i class="far fa-edit"></i></span>
        </div>
      <div class="cell auto cell-style margins">
      <div class="skill-name">
            ${user.skills[1].name}
        </div>
        <div class="skill-description">
            ${user.skills[1].description}
        </div>
        <span class= "buttonIcon" id="b2"><i class="far fa-edit"></i></span>
        </div>
      <div class="cell auto cell-style margins">
      <div class="skill-name">
            ${user.skills[2].name}
        </div>
        <div class="skill-description">
            ${user.skills[2].description}
        </div>
        <span class= "buttonIcon" id="b3"><i class="far fa-edit"></i></span>
      </div>
    </div>

    <br>
    <br>
        
    <div class="grid-x grid-padding-x small-up-1 medium-up-3 large-up-3 secondRow">
      <div class="cell auto cell-style margins">
        <div class="skill-name">
            ${user.skills[3].name}
        </div>
        <div class="skill-description">
            ${user.skills[3].description}
        </div>
        <span class= "buttonIcon" id="b4"><i class="far fa-edit"></i></span>
      </div>
      <div class="cell auto cell-style margins">
        <div class="skill-name">
            ${user.skills[4].name}
        </div>
        <div class="skill-description">
            ${user.skills[4].description}
        </div>
        <span class= "buttonIcon" id="b5"><i class="far fa-edit"></i></span>
      </div>
      <div class="cell auto cell-style margins">
        <div class="skill-name">
            ${user.skills[5].name}
        </div>
        <div class="skill-description">
            ${user.skills[5].description}
        </div>
        <span class= "buttonIcon" id="b6"><i class="far fa-edit"></i></span>
      </div>
    </div>
    `
    document.querySelector("#b1").addEventListener("click", () => {
        makeSkill(0)
    })
    document.querySelector("#b2").addEventListener("click", () => {
        makeSkill(1)
    })
    document.querySelector("#b3").addEventListener("click", () => {
        makeSkill(2)
    })
    document.querySelector("#b4").addEventListener("click", () => {
        makeSkill(3)
    })
    document.querySelector("#b5").addEventListener("click", () => {
        makeSkill(4)
    })
    document.querySelector("#b6").addEventListener("click", () => {
        makeSkill(5)
    })


}


function makeSkill(location) {
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
                <h4 class="text-center">Edit Skill</h4>
        
                <label>Skill name</label>
                <input type="text" class="sign-in-form-username" id="skill-name">

                <label>Skill Description</label>
                <input type="text" class="sign-in-form-username" id="skill-description" style="margin: 0px 0px 16px; height: 120px; width: 100%;" >

                <button type="submit" class="sign-in-form-button">Confirm changes</button>
            </div>
        </form>
    `
    
    let newPage = document.querySelector(".newSkill")
    newPage.addEventListener("submit", (e) => {
        e.preventDefault()
        pushSkill(e, location)
    })
}

function pushSkill(e, location){
    
    skillName = e.target[0].value
    skillDescription = e.target[1].value

    console.log("in the push");

    meta = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: skillName,
            description: skillDescription
        })
    }

    fetch(URLSKILLS + "/" + user.skills[location].id, meta)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        user.skills[location] = data
    })

    homePageConfig();
}


//********************************************************************************************************/




/****************************************** PROJECTS ******************************************************/

function addProjectToBar() {
    minibar().innerHTML = `
        <li>Logout</li>
        <li></li>
        <li></li>
        `
        loggedInMiniBarListener();
       
}

function removeNewProjectButton () {
    minibar().innerHTML = `
    <li>Logout</li>
    <li></li>
    <li></li>
    `
    loggedInMiniBarListener();
}


function handleProjectsButton() {
    form.innerHTML = ""
    

    mainContainer.innerHTML = `
    <div class="grid-x grid-padding-x small-up-1 medium-up-3 large-up-3 firstRow">
      <div class="cell auto cell-style shadow">
        <div class="skill-name">
            ${user.projects[0].name}
        </div>
        <div class="skill-description">
            ${user.projects[0].description}
        </div>
        <span class= "buttonIcon" id="b1"><i class="far fa-edit"></i></span>
        </div>
      <div class="cell auto cell-style margins">
      <div class="skill-name">
            ${user.projects[1].name}
        </div>
        <div class="skill-description">
            ${user.projects[1].description}
        </div>
        <span class= "buttonIcon" id="b2"><i class="far fa-edit"></i></span>
        </div>
      <div class="cell auto cell-style margins">
      <div class="skill-name">
            ${user.projects[2].name}
        </div>
        <div class="skill-description">
            ${user.projects[2].description}
        </div>
        <span class= "buttonIcon" id="b3"><i class="far fa-edit"></i></span>
      </div>
    </div>

    <br>
    <br>
        
    <div class="grid-x grid-padding-x small-up-1 medium-up-3 large-up-3 secondRow">
      <div class="cell auto cell-style margins">
        <div class="skill-name">
            ${user.projects[3].name}
        </div>
        <div class="skill-description">
            ${user.projects[3].description}
        </div>
        <span class= "buttonIcon" id="b4"><i class="far fa-edit"></i></span>
      </div>
      <div class="cell auto cell-style margins">
        <div class="skill-name">
            ${user.projects[4].name}
        </div>
        <div class="skill-description">
            ${user.projects[4].description}
        </div>
        <span class= "buttonIcon" id="b5"><i class="far fa-edit"></i></span>
      </div>
      <div class="cell auto cell-style margins">
        <div class="skill-name">
            ${user.projects[5].name}
        </div>
        <div class="skill-description">
            ${user.projects[5].description}
        </div>
        <span class= "buttonIcon" id="b6"><i class="far fa-edit"></i></span>
      </div>
    </div>
    `
    document.querySelector("#b1").addEventListener("click", () => {
        makeProject(0)
    })
    document.querySelector("#b2").addEventListener("click", () => {
        makeProject(1)
    })
    document.querySelector("#b3").addEventListener("click", () => {
        makeProject(2)
    })
    document.querySelector("#b4").addEventListener("click", () => {
        makeProject(3)
    })
    document.querySelector("#b5").addEventListener("click", () => {
        makeProject(4)
    })
    document.querySelector("#b6").addEventListener("click", () => {
        makeProject(5)
    })


}


function makeProject(location) {
    mainContainer.innerHTML = ""
    form.innerHTML = ""
    if (formUp){
        form.innerHTML = ""
        formUp = false
        handleProjectsButton()
        return
    }    
    formUp = true
    form.innerHTML = 
    `
        <form class="newProject">
            <div class="sign-in-form">
                <h4 class="text-center">Edit Project</h4>
        
                <label>Project name</label>
                <input type="text" class="sign-in-form-username" id="skill-name">

                <label>Project Description</label>
                <input type="text" class="sign-in-form-username" id="skill-description" style="margin: 0px 0px 16px; height: 120px; width: 100%;" >

                <button type="submit" class="sign-in-form-button">Confirm changes</button>
            </div>
        </form>
    `
    
    let newPage = document.querySelector(".newProject")
    newPage.addEventListener("submit", (e) => {
        e.preventDefault()
        pushProject(e, location)
    })
}

function pushProject(e, location){
    
    projectName = e.target[0].value
    projectDescription = e.target[1].value

    console.log("in the push");

    meta = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: projectName,
            description: projectDescription
        })
    }

    fetch(URLPROJECTS + "/" + user.projects[location].id, meta)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        user.projects[location] = data
    })

    homePageConfig();
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