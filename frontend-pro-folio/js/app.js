$(document).foundation();

const menuUl = document.querySelector(".menu").children
const home = menuUl[0]
const skills = menuUl[1]
const projects = menuUl[2]
const contact = menuUl[3]




document.addEventListener("DOMContentLoaded", () => {
    addEventListenersToButtons();
})

function addEventListenersToButtons() {
    console.log("")
    home.addEventListener("click", () => {});
    skills.addEventListener("click", () => {});
    projects.addEventListener("click", () => {});
    contact.addEventListener("click", () => {
        console.log("test")
    });
}