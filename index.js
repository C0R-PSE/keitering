const menu_button_top = document.querySelector('.menu_button_top')
const menu = document.querySelector('.menu_top')
const tabs = [...document.querySelector('.navigation').children]
const content_grid = document.querySelector('.content_grid')
const hookahs = content_grid.querySelector('.hookahs')
const info_sheet = document.querySelector('.info_sheet')

const data = await fetch('./data.json').then(resp => resp.json())
console.log(data)

function toggle_menu() {
    menu.classList.toggle('active')
    menu.style.bottom = "calc(100% - " + (menu.classList.contains('active')*menu.clientHeight + 50) + "px)"
}
function hide_menu() {
    menu.classList.remove('active')
    menu.style.bottom = ""
}
function open_tab(tab){
    content_grid.setAttribute('active', tab.getAttribute('tag'))
}
function checkGridWidth() {
    const contentWidth = Math.min(window.innerWidth - 100, 1600) - 325
    if (contentWidth >= 1150) {
        hookahs.style.width = "1150px"
    } else if (contentWidth >= 850) {
        hookahs.style.width = "850px"
    } else if (contentWidth >= 550) {
        hookahs.style.width = "550px"
    } else {
        hookahs.style.width = "250px"
    }
}
function show_info(hookah) {
    info_sheet.classList.add('active')
}

for (var i in data.hookahs) {
    console.log(data.hookahs[i])
    const hookah_card = document.createElement('div')
    hookah_card.classList.add('hookah_card')
    hookah_card.setAttribute('hookahId', i)
    hookahs.appendChild(hookah_card)
    const card_image = document.createElement('div')
    card_image.classList.add("card_image")
    hookah_card.appendChild(card_image)
    const card_footer = document.createElement('div')
    card_footer.classList.add("card_footer")
    card_footer.innerText = data.hookahs[i].name
    hookah_card.appendChild(card_footer)
    hookah_card.addEventListener('click', (e) => {show_info(e.target)})
}

menu_button_top.addEventListener('click', () => {toggle_menu()})
window.addEventListener('scroll', () => {hide_menu()})
for (var i in tabs) {
    tabs[i].addEventListener('click', (e) => {open_tab(e.target)})
}
checkGridWidth()
window.addEventListener('resize', () => {checkGridWidth()})
info_sheet.addEventListener('click', (e) => {
    if (e.target==info_sheet) {info_sheet.classList.remove('active')}
})
