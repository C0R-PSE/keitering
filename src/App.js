import './App.css';
import { data } from './db';
import { useGSAP } from '@gsap/react';
import HookahGrid from './Components/HookahGrid/HookahGrid';
import { Instructions, Questions } from './Components/Instructions/Instructions';
import { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Prices from './Components/Prices/Prices';

//console.log(dataLocal)


function open_tab(tab){
  const content_grid = document.querySelector('.content_grid')
  const navigation = content_grid.querySelector('.navigation')
    const currently_active = [...content_grid.getElementsByClassName('active')]
    for (var i in currently_active) {
        currently_active[i].classList.remove('active')
    }
    navigation.querySelector('[tag="' + tab + '"]').classList.add("active")
    content_grid.querySelector('.content').querySelector('.' + tab).classList.add("active")
}

var info_sheet
var info_sheet_wrapper
export function show_info(content) {
  info_sheet_wrapper = createRoot(info_sheet.querySelector('.wrapper'))
  info_sheet_wrapper.render(content)
  info_sheet.classList.add('active')
}
function checkGridWidth() {
  const hookahs = document.querySelector('.content .hookahs')
  //console.log(hookahs)
    const contentWidth = Math.min(window.innerWidth - 100, 1600) - 325
    const max_columns = Math.floor((contentWidth - 250) / 300) + 1
    //console.log(contentWidth, max_columns)
    if (max_columns <= 1) {
        hookahs.style.width = "250px"
    } else if (max_columns > Object.keys(data.hookahs).length) {
        hookahs.style.width = (Object.keys(data.hookahs).length*300 - 50) + "px"
    } else {
        hookahs.style.width = (250 + 300*(max_columns - 1)) + "px"
    }
}
function App() { // Главная страница
  useGSAP(() => { // onload events
    open_tab('hookahs')
    checkGridWidth(); window.onresize = () => checkGridWidth()

    info_sheet = document.querySelector('.info_sheet')
  })
  return (
    <>
      <div className="info_sheet" onClick={(e) => {
        if (e.target.classList.contains('wrapper')) {
          e.target.closest('.info_sheet').classList.remove('active')
          info_sheet_wrapper.unmount()
        }
      }}>
        <div className='wrapper'></div>
      </div>
      <div className="sticky_sheet">
        <div className="menu_top"></div>
        <div className="top_bar">
          <div className="browse_button" style={{width: "100px", backgroundColor: "brown"}}></div>
          <div className="menu_button_top"></div>
        </div>
      </div>
      <div className="content_grid" active="Наши кальяны">
        <div className="left_panel">
          <div className="navigation">
            <div onClick={() => open_tab('hookahs')} tag="hookahs"><div className="label">Кальяны</div></div>
            {/*<div onClick={() => open_tab('tobacco')} tag="tobacco"><div className="label">Табаки</div></div>*/}
            <div onClick={() => open_tab('prices')} tag="prices"><div className="label">Услуги и тарифы</div></div>
            <div onClick={() => open_tab('instructions')} tag="instructions"><div className="label">Инструкции</div></div>
            <div onClick={() => open_tab('questions')} tag="questions"><div className="label">ЧаВо</div></div>
          </div>
        </div>
        <div className="content">
          <div className="hookahs"><HookahGrid /></div>
          <div className="tobacco"></div>
          <div className="prices"><Prices /></div>
          <Instructions />
          <Questions />
        </div>
      </div>
    </>
  );
}

/*function App() {
  return (
    <div className='info_sheet active'>
      <div className='info_box'>
        <Gallery withSections={true}/>
        <div className='footer'></div>
      </div>
    </div>
  )
}*/

export default App;