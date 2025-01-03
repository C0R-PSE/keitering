const hookahs_images_data = await fetch('https://api.github.com/repos/C0R-PSE/keitering/contents/images/hookahs', {
    headers: {"Authorization": "Bearer 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"}
}).then(resp => resp.json())
var hookahs_images = {}
for (var i in hookahs_images_data) {
    hookahs_images[hookahs_images_data[i].name] = []
    var hookah_query = await fetch('https://api.github.com/repos/C0R-PSE/keitering/contents/images/hookahs/' + hookahs_images_data[i].name, {
        headers: {"Authorization": "Bearer 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"}
    }).then(resp => resp.json())
    for (var k in hookah_query) {
        hookahs_images[hookahs_images_data[i].name].push(hookah_query[k].name)
    }
}
const menu_button_top = document.querySelector('.menu_button_top')
const menu = document.querySelector('.menu_top')
const content_grid = document.querySelector('.content_grid')
const hookahs = content_grid.querySelector('.hookahs')
const info_sheet = document.querySelector('.info_sheet')
const navigation = content_grid.querySelector('.navigation')
const instructions = content_grid.querySelector('.instructions')
const data = await fetch('https://keitering.d-b-17f.workers.dev/', {
    method:"POST",
    body:JSON.stringify({
        query:"get_data"
    })
}).then(resp => resp.json())
console.log(data)
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
    content_grid.querySelector('.content').querySelector('.' + tab).classList.add("active")
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

menu_button_top.addEventListener('click', () => {toggle_menu()})
window.addEventListener('scroll', () => {hide_menu()})

for (var i in data.hookahs) {
    const hookah_card = document.createElement('div')
    hookah_card.classList.add('hookah_card')
    hookah_card.setAttribute('hookahId', i)
    hookahs.appendChild(hookah_card)
    const card_image = document.createElement('img')
    if (typeof(hookahs_images[data.hookahs[i].name]) != "undefined") {
        card_image.src = "./images/hookahs/" + data.hookahs[i].name + "/" + hookahs_images[data.hookahs[i].name][0]
        //card_image.style.backgroundImage = "url('./images/hookahs/" + data.hookahs[i].name + "/" + hookahs_images[data.hookahs[i].name][0] + "')"
    }
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
    const info_icon_buffer = document.createElement('div')
    info_icon_buffer.innerHTML = '<svg viewBox="0 0 100 100"><use xlink:href="./icon.svg#info_icon"></use></svg>'
    card_footer.append(info_icon_buffer.querySelector('svg'))
    hookah_card.addEventListener('click', (e) => {
        if (!e.target.hasAttribute('contenteditable')) {
            show_info(e.target.closest('.hookah_card'))
        }
    })
}

for (var i in data.navbar) {
    const tab = document.createElement('div')
    tab.setAttribute('tag', data.navbar[i].tag)
    const label = document.createElement('div')
    label.classList.add('label')
    label.innerText = data.navbar[i].name
    tab.appendChild(label)
    tab.addEventListener('click', (e) => {
        if (!e.target.hasAttribute('contenteditable')) {
            open_tab(e.target.closest('.navigation > div').getAttribute('tag'))
        }
    })
    if (admin_rights) {
        label.setAttribute('contenteditable', '')
    }
    navigation.appendChild(tab)
}

for (var i in [...instructions.children]) {
    instructions.children[i].querySelector('.instruction_header').addEventListener('click', (e) => {
        e.target.closest('.instruction').classList.toggle('active')
    })
}
open_tab('hookahs')
checkGridWidth()




window.addEventListener('resize', () => {checkGridWidth()})
info_sheet.addEventListener('click', (e) => {
    if (e.target==info_sheet) {info_sheet.classList.remove('active')}
})
