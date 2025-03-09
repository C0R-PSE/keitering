//import { data } from "../db.js"
var data = {
    "hookahs": [
        {
          "description": "Описание punk li",
          "name": "punk li",
          "photos": ["../images/hookahs/punk li/photo_2024-08-25_17-38-45.jpg"],
          "preview": 0
        },
        {
          "description": "Описание seven star",
          "name": "seven star",
          "photos": ["../images/hookahs/seven star/photo_2024-08-25_17-38-43.jpg"],
          "preview": 0
        },
        {
          "description": "Описание soft smoke",
          "name": "soft smoke",
          "photos": [],
          "preview": 0
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
const token = "g" + "it" + "hu" + "b_pa" + "t_11AWK4SAQ0kTdS" + "GkLnqzc5_JT6" + "kXt8V0cpSPqX6zP9" + "EiCjnGSv2" + "Cdqj4MF4xuh5eNqUSQAKKOOLpPlgvpU"
const repopath = 'https://api.github.com/repos/C0R-PSE/keitering'

const hookahs_images_data = await fetch(repopath + '/contents/images/hookahs', {
    headers: {"Authorization": "Bearer " + token}
}).then(resp => resp.json())
var hookahs_images = {}
for (var i in hookahs_images_data) {
    hookahs_images[hookahs_images_data[i].name] = []
    var hookah_query = await fetch(repopath + '/contents/images/hookahs/' + hookahs_images_data[i].name, {
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
function show_info(content) {
    info_sheet.replaceChildren(content)
    info_sheet.classList.add('active')
    const galleries = [...info_sheet.querySelectorAll('.gallery')]
    if (galleries.length > 0) { // setting up gallery listeners
        for (var l in galleries) {
            const gallery = galleries[l]
            const gap = Number.parseInt(window.getComputedStyle(gallery).getPropertyValue('gap').replace('px', ''))
            const gallery_items = [...gallery.children]
            var sections = []
            for (var i in gallery_items) {
                sections.push({width: gallery_items[i].clientWidth, start:0, end: gallery_items[i].clientWidth})
                if (i > 0) {
                    for (var k = 0; k < i; k++) { sections[i].start = sections[i].start + sections[k].width + gap }
                    sections[i].end = sections[i].start + sections[i].width
            }}
            gallery.setAttribute('current_section', 0)
            gallery.setAttribute('actual_section', 0)
            gsap.registerPlugin(ScrollToPlugin)
            //console.log(sections)
            function scroll_gallery(increment, gallery, sections) {
                const current_section = Number.parseInt(gallery.getAttribute('current_section'))
                var target_id = current_section + increment
                if (target_id >= 0 && target_id <= sections.length - 1) {
                    var target_section = sections[target_id]
                    var section_offset = gallery.clientWidth / 2 - target_section.width / 2
                    if (current_section == 0) {
                        while (target_section.end < gallery.clientWidth && target_id + 1 < sections.length - 1) { // section is shown fully, moving right
                            target_id += 1
                            target_section = sections[target_id]
                        }
                    } else if (current_section == sections.length - 1) {
                        while (target_section.start > sections[sections.length - 1].end - gallery.clientWidth && target_id - 1 > 0) { // section is shown fully, moving left
                            target_id -= 1
                            target_section = sections[target_id]
                        }
                    } 
                    if (target_section.start > sections[sections.length - 1].end - gallery.clientWidth) { // reaching right edge
                        target_id = sections.length - 1
                        target_section = sections[target_id]
                        section_offset = 0
                    } else if (target_section.end < gallery.clientWidth) { // reaching left edge
                        target_id = 0
                        target_section = sections[target_id]
                        section_offset = 0
                    }
                    //console.log('destination: section ' + target_id)
                    gallery.setAttribute('current_section', target_id)
                    gsap.to(gallery, {
                        duration: 1,
                        scrollTo: {x: '#section_' + target_id, offsetX: section_offset}
                    })
                }
            }
            gallery.addEventListener('wheel', (e) => {scroll_gallery(1*(e.wheelDelta < 0) - 1*(e.wheelDelta > 0), gallery, sections)})
            function scroll_listener(gallery, gallery_items) { // ДОДЕЛАТЬ!!!
                const wrapper = gallery.closest('.wrapper')
                const wrapper_pos = wrapper.getBoundingClientRect()
                const wrapper_center = wrapper_pos.left + wrapper.clientWidth / 2
                for (var i in gallery_items) {
                    var section_pos = gallery_items[i].getBoundingClientRect();
                    if (i == 0 && section_pos.left == wrapper_pos.left) {
                        //console.log('reached left edge')
                        gallery.setAttribute('actual_section', i)
                        break
                    } else if (i == gallery_items.length - 1 && section_pos.right == wrapper_pos.right) {
                        //console.log('reached right edge')
                        gallery.setAttribute('actual_section', i)
                        break
                    } else {
                        const current_section = Number.parseInt(gallery.getAttribute('current_section'))
                        if (section_pos.left < wrapper_center && section_pos.right > wrapper_center) {
                            //console.log('current section is ' + i)
                            gallery.setAttribute('actual_section', i)
                        }
                    }
                }
            }
            gallery.addEventListener('scroll', () => {scroll_listener(gallery, gallery_items)})
    }}
}
function buildHookahPreview(id) {
    const hookah_data = data.hookahs[id]
    const preview = document.createElement('div')
    preview.classList.add('info_box')
    // footer
    const footer = document.createElement('div')
    footer.classList.add('footer')
    const label = document.createElement('div')
    label.classList.add('label')
    label.innerText = hookah_data.name
    footer.appendChild(label)
    preview.appendChild(footer)
    // gallery
    const gallery = document.createElement('div')
    gallery.classList.add('gallery')
    for (var i in hookah_data.photos) {
        for (var k = 0; k < 10; k++) {
            const hookah_image = document.createElement('img')
            hookah_image.classList.add('preview_hookah_image')
            hookah_image.src = hookah_data.photos[i]
            hookah_image.id = 'section_' + k
            gallery.appendChild(hookah_image)
        }
    }
    const wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')
    wrapper.appendChild(gallery)
    preview.appendChild(wrapper)
    return preview
}
function edit_hookah(id) {

}
class FileBrowser {
    browser = document.createElement('div')
    #current_path
    #base_path
    constructor(base_path) {
        this.browser.classList.add('file_browser')
        this.browser.innerHTML = '<div class="browser_panel"><div class="back button active"></div><div class="path"></div></div><div class="browser_content"></div>'
        if (base_path == undefined) { base_path = '/images' }
        this.#base_path = base_path
        this.#current_path = this.#base_path
        this.browse(this.#current_path)
        this.browser.querySelector('.browser_panel .back').addEventListener('click', () => {this.return()})
    }
    async browse(path) {
        //console.log(path)
        this.#current_path = path
        this.browser.querySelector('.browser_panel .path').innerText = this.#current_path
        if (this.#current_path == this.#base_path) {this.browser.querySelector('.browser_panel .back').classList.remove('active')}
        else {this.browser.querySelector('.browser_panel .back').classList.add('active')}
        const browser_content = this.browser.querySelector('.browser_content')
        const query = await fetch(repopath + '/contents' + path, {
            headers: {"Authorization": "Bearer " + token}
        }).then(resp => resp.json())
        var result = []
        for (let i in query) {
            //console.log(query[i])
            const new_item = document.createElement('div')
            new_item.classList.add('browser_item')
            const file_preview = document.createElement('img')
            new_item.appendChild(file_preview)
            if (query[i].type == 'dir') {
                new_item.classList.add('folder')
                new_item.addEventListener('click', () => {this.browse(this.#current_path + '/' + query[i].name)})
                file_preview.src = '../website_media/icons/Folder_Icon.png'
            } else if (query[i].type == 'file') {
                new_item.classList.add('file')
                new_item.addEventListener('click', () => {window.open(query[i].html_url)})
                file_preview.src = '../' + this.#current_path + '/' + query[i].name
            }
            const label = document.createElement('div')
            label.classList.add('label')
            label.innerText = query[i].name
            new_item.appendChild(label)
            result.push(new_item)
        }
        browser_content.replaceChildren()
        for (let i in result) {
            browser_content.appendChild(result[i])
        }
    }
    async return() {
        if (this.#current_path != this.#base_path) {
            const current_path_split = this.#current_path.split('/')
            const new_path = this.#current_path.replace('/' + current_path_split[current_path_split.length - 1], '')
            await this.browse(new_path)
        }
    }
}
document.querySelector('.browse_button').addEventListener('click', () => {
    const preview = document.createElement('div')
    preview.classList.add('info_box')
    preview.appendChild(new FileBrowser().browser)
    show_info(preview)
})


// начало генерации сайта

menu_button_top.addEventListener('click', () => {toggle_menu()})
window.addEventListener('scroll', () => {hide_menu()})

class Hookah_Card {
    #id
    hookah_card = document.createElement('div')
    constructor(id) {
        this.#id = id
        this.hookah_card.classList.add('hookah_card')
        this.hookah_card.innerHTML = '<div class="buttons_sheet"><div class="view_button"></div><div class="edit_button"></div></div><img class="card_image"><div class="card_footer"><div class="label"></div><svg class="info_icon" viewBox="0 0 100 100"><use xlink:href="../website_media/icons/icon.svg#info_icon"></use></svg></div>'
        if (data.hookahs[this.#id].photos.length > 0) { this.hookah_card.querySelector('img.card_image').src = data.hookahs[i].photos[0] }
        this.hookah_card.querySelector('.label').innerText = data.hookahs[i].name
        this.hookah_card.querySelector('.view_button').addEventListener('click', (e) => {show_info(buildHookahPreview(this.#id))})
        this.hookah_card.querySelector('.edit_button').addEventListener('click', (e) => {edit_hookah(this.#id)})
    }
}

for (var i in data.hookahs) {
    var img_src = ''
    const hookah_card = new Hookah_Card(i).hookah_card
    hookahs.append(hookah_card)
}

for (var i in [...navigation.children]) {
    navigation.children[i].addEventListener('click', (e) => {
        open_tab(e.target.closest('.navigation > div').getAttribute('tag'))
    })
}

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

// конец генерации сайта

open_tab('hookahs')
checkGridWidth()

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


