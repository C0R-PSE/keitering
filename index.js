const menu_button_top = document.querySelector('.menu_button_top')
const menu = document.querySelector('.menu_top')
function toggle_menu() {
    menu.classList.toggle('active')
    menu.style.bottom = "calc(100% - " + (menu.classList.contains('active')*menu.clientHeight + 50) + "px)"
}
function hide_menu() {
    menu.classList.remove('active')
    menu.style.bottom = ""
}
menu_button_top.addEventListener('click', () => {toggle_menu()})
window.addEventListener('scroll', () => {hide_menu()})
const tabs = [...document.querySelector('.navigation').children]
console.log(tabs)
const content_grid = document.querySelector('.content_grid')
for (var i in tabs) {
    tabs[i].addEventListener('click', (e) => {open_tab(e.target)})
}
function open_tab(tab){
    content_grid.setAttribute('active', tab.getAttribute('tag'))
}