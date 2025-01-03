const menu_button_top = document.querySelector('.menu_button_top')
const menu = document.querySelector('.menu_top')
const content_grid = document.querySelector('.content_grid')
const hookahs = content_grid.querySelector('[tag="hookahs"]')
const info_sheet = document.querySelector('.info_sheet')
const navigation = content_grid.querySelector('.navigation')
const tabs = [...navigation.children]
const instructions = [...content_grid.querySelector('.instructions').children]

const data = await fetch('./data.json').then(resp => resp.json())
//console.log(data)

const admin_rights = true

function toggle_menu() {
    menu.classList.toggle('active')
    menu.style.bottom = "calc(100% - " + (menu.classList.contains('active')*menu.clientHeight + 50) + "px)"
}
function hide_menu() {
    menu.classList.remove('active')
    menu.style.bottom = ""
}
function open_tab(tab){
    const currently_active = [...content_grid.getElementsByClassName('active')]
    for (var i in currently_active) {
        currently_active[i].classList.remove('active')
    }
    navigation.querySelector('[tag="' + tab + '"]').classList.add("active")
    content_grid.querySelector('.content').querySelector('[tag="' + tab + '"]').classList.add("active")
}
function checkGridWidth() {
    const contentWidth = Math.min(window.innerWidth - 100, 1600) - 325
    const max_columns = Math.floor((contentWidth - 250) / 300) + 1
    if (max_columns <= 1) {
        hookahs.style.width = "250px"
    } else if (max_columns > Object.keys(data.hookahs).length) {
        hookahs.style.width = Object.keys(data.hookahs).length*300 - 50
    } else {
        hookahs.style.width = 250 + 300*(max_columns - 1)
    }
}
function show_info(event, hookah) {
    info_sheet.classList.add('active')
}
Element.prototype.addEditableListener = function(type, func) {
    this.addEventListener('click', func)
}

menu_button_top.addEventListener('click', () => {toggle_menu()})
window.addEventListener('scroll', () => {hide_menu()})

for (var i in data.hookahs) {
    const hookah_card = document.createElement('div')
    hookah_card.classList.add('hookah_card')
    hookah_card.setAttribute('hookahId', i)
    hookahs.appendChild(hookah_card)
    const card_image = document.createElement('div')
    card_image.classList.add("card_image")
    hookah_card.appendChild(card_image)
    const card_footer = document.createElement('div')
    card_footer.classList.add("card_footer")
    hookah_card.appendChild(card_footer)
    const label = document.createElement('div')
    label.classList.add('label')
    label.innerText = data.hookahs[i].name
    card_footer.append(label)
    if (admin_rights) {
        label.setAttribute('contenteditable', '')
    }
    hookah_card.addEventListener('click', (e) => {
        if (!e.target.hasAttribute('contenteditable')) {
            show_info(e.target.closest('.hookah_card'))
        }
    })
}

for (var i in instructions) {
    instructions[i].querySelector('.instruction_header').addEventListener('click', (e) => {
        e.target.closest('.instruction_wrapper').classList.toggle('active')
    })
}

menu_button_top.addEventListener('click', () => {toggle_menu()})
window.addEventListener('scroll', () => {hide_menu()})
for (var i in tabs) {
    tabs[i].addEventListener('click', (e) => {open_tab(e.target.getAttribute('tag'))})
}
open_tab('hookahs')
checkGridWidth()




window.addEventListener('resize', () => {checkGridWidth()})
info_sheet.addEventListener('click', (e) => {
    if (e.target==info_sheet) {info_sheet.classList.remove('active')}
})
