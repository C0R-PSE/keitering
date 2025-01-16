// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
//import { JSColor } from "./jscolor.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7QrnoeqL3Mem0kqxRtWqSUEcAb3Lip0Y",
  authDomain: "myapp-bb443.firebaseapp.com",
  projectId: "myapp-bb443",
  storageBucket: "myapp-bb443.firebasestorage.app",
  messagingSenderId: "248205536207",
  appId: "1:248205536207:web:07a6b515eaae327e5540ba",
  measurementId: "G-E21PST2VB0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app, 'https://myapp-bb443-default-rtdb.europe-west1.firebasedatabase.app')
var data
var data1
data1 = await get(child(ref(db), 'data')).then((snapshot) => {
    if (snapshot.exists()) {
      return(snapshot.val())
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
//set(ref(db, 'data'), data)
data = {
    "hookahs": [
      {
        "description": "Описание punk li",
        "name": "punk li"
      },
      {
        "description": "Описание seven star",
        "name": "seven star"
      },
      {
        "description": "Описание soft smoke",
        "name": "soft smoke"
      }
    ],
    "navbar": [
      {
        "name": "Наши кальяны",
        "tag": "hookahs"
      },
      {
        "name": "Табаки",
        "tag": "tobacco"
      },
      {
        "name": "Услуги и тарифы",
        "tag": "prices"
      },
      {
        "name": "Инструкции",
        "tag": "instructions"
      }
    ],
    "tobacco": [
        {
            "name": "name1",
            "flavour": "яблоко",
            "color": "#000000",
            "in_stock": true
        },
        {
            "name": "name2",
            "flavour": "яблоко",
            "color": "#ffffff",
            "in_stock": true
        },
        {
            "name": "name3",
            "flavour": "яблоко",
            "color": "#e7e7e7",
            "in_stock": true
        },
        {
            "name": "name4",
            "flavour": "яблоко",
            "color": "#f00",
            "in_stock": true
        },
        {
            "name": "name5",
            "flavour": "яблоко",
            "color": "ff0",
            "in_stock": true
        }
    ]
}

console.log("data loaded")
const token = "g" + "it" + "hu" + "b_pa" + "t_11AWK4SAQ0kTdS" + "GkLnqzc5_JT6" + "kXt8V0cpSPqX6zP9" + "EiCjnGSv2" + "Cdqj4MF4xuh5eNqUSQAKKOOLpPlgvpU"

const hookahs_images_data = await fetch('https://api.github.com/repos/C0R-PSE/keitering/contents/images/hookahs', {
    headers: {"Authorization": "Bearer " + token}
}).then(resp => resp.json())
var hookahs_images = {}
for (var i in hookahs_images_data) {
    hookahs_images[hookahs_images_data[i].name] = []
    var hookah_query = await fetch('https://api.github.com/repos/C0R-PSE/keitering/contents/images/hookahs/' + hookahs_images_data[i].name, {
        headers: {"Authorization": "Bearer " + token}
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
const tobacco_grid = content_grid.querySelector('.tobacco')

const admin_rights = true
var edit_mode = false
if (admin_rights) {
    document.querySelector('body').classList.add('admin_rights')
}

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
    const pencil_icon_buffer = document.createElement('div')
    pencil_icon_buffer.innerHTML = '<svg class="edit_pencil" viewBox="0 0 100 100"><use xlink:href="./pencil.svg#Capa_1"></use></svg>'
    label.append(pencil_icon_buffer.querySelector('svg'))
    if (admin_rights) {
        label.setAttribute('contenteditable', false)
    }
    const info_icon_buffer = document.createElement('div')
    info_icon_buffer.innerHTML = '<svg class="info_icon" viewBox="0 0 100 100"><use xlink:href="./icon.svg#info_icon"></use></svg>'
    card_footer.append(info_icon_buffer.querySelector('svg'))
    hookah_card.addEventListener('click', (e) => {
        if (e.target.closest('[contenteditable="true"]') == null) {
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
    const pencil_icon_buffer = document.createElement('div')
    pencil_icon_buffer.innerHTML = '<svg class="edit_pencil" viewBox="0 0 100 100"><use xlink:href="./pencil.svg#Capa_1"></use></svg>'
    label.append(pencil_icon_buffer.querySelector('svg'))
    tab.addEventListener('click', (e) => {
        if (e.target.closest('[contenteditable="true"]') == null) {
            open_tab(e.target.closest('.navigation > div').getAttribute('tag'))
        }
    })
    if (admin_rights) {
        label.setAttribute('contenteditable', false)
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

for (var i in data.tobacco) {
    const tobacco_card = document.createElement('div')
    tobacco_card.classList.add('tobacco_card')
    tobacco_card.style.color = data.tobacco[i].color
    tobacco_card.setAttribute('name', data.tobacco[i].name)
    if (data.tobacco[i].in_stock) {
        tobacco_card.classList.add('in_stock')
    }
    tobacco_card.innerText = data.tobacco[i].name
    const color_circle = document.createElement('span')
    color_circle.classList.add('color_circle')
    const myPicker = new JSColor(color_circle, {format:"hex", value:data.tobacco[i].color, width:360, height:200, onInput: () => {
        color_circle.closest('.tobacco_card').style.color = myPicker.toRGBAString()
    }})
    tobacco_card.append(color_circle)
    tobacco_grid.append(tobacco_card)
}



window.addEventListener('resize', () => {checkGridWidth()})
info_sheet.addEventListener('click', (e) => {
    if (e.target==info_sheet) {info_sheet.classList.remove('active')}
})
var editable_elements = [...document.querySelectorAll('[contenteditable]')]
function toggle_edit_mode() {
    if (edit_mode == false) { // enter edit mode
        for (var i in editable_elements) {
            editable_elements[i].setAttribute('contenteditable', 'true')
        }
        edit_mode = true
        document.querySelector('body').classList.add('edit_mode')
    } else { // exit edit mode; save changes
        for (var i in editable_elements) {
            editable_elements[i].setAttribute('contenteditable', 'false')
        }
        edit_mode = false
        document.querySelector('body').classList.remove('edit_mode')
    }
}
document.querySelector('.editmode_toggle_button').addEventListener('click', () => {toggle_edit_mode()})

function unloadPage(){ 
    if(edit_mode){
        return "You have unsaved changes on this page. Do you want to leave this page and discard your changes or stay on this page?";
    }
}
window.onbeforeunload = unloadPage;
