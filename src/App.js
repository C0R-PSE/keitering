import './App.css';
import { data } from './db';
import { useGSAP } from '@gsap/react';
import HookahGrid from './Components/HookahGrid/HookahGrid';
import { Instructions, Questions } from './Components/Instructions/Instructions';
import { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Prices from './Components/Prices/Prices';
import gsap from 'gsap';

//console.log(dataLocal)

var info_sheet
var info_sheet_wrapper
const tl = gsap.timeline({ paused: true, onReverseComplete: () => info_sheet_wrapper.render() })
export function show_info(content) {
  tl.play()
  info_sheet_wrapper.render(content)
  info_sheet.classList.add('active')
}

function App() { // Главная страница
  console.log('app rendered')

  function open_tab(tab) {
    const content_grid = document.querySelector('.content_grid')
    const navigation = content_grid.querySelector('.navigation')
    const currently_active = [...content_grid.getElementsByClassName('active')]
    for (var i in currently_active) {
      currently_active[i].classList.remove('active')
    }
    navigation.querySelector('[tag="' + tab + '"]').classList.add("active")
    content_grid.querySelector('.content').querySelector('.' + tab).classList.add("active")
  }

  function hide_info() {
    tl.reverse()
    info_sheet.classList.remove('active')
  }
  useGSAP(() => { // onload events
    open_tab('hookahs')
    info_sheet = document.querySelector('.info_sheet')
    info_sheet_wrapper = createRoot(info_sheet.querySelector('.wrapper'))
    tl.to(info_sheet, { zIndex: 1000, duration: 0 })
      .to(info_sheet, { opacity: 1, duration: 0.25 })
  })
  return (
    <>
      <div className="info_sheet" onClick={(e) => {
        if (e.target.classList.contains('wrapper')) { hide_info() }
      }}>
        <div className='wrapper'></div>
      </div>
      <div className="sticky_sheet">
        <div className="menu_top"></div>
        <div className="top_bar">
          <div className="browse_button" style={{ width: "100px", backgroundColor: "brown" }}></div>
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
          <HookahGrid />
          <div className="tobacco"></div>
          <div className="prices"><Prices /></div>
          <Instructions />
          <Questions />
        </div>
      </div>
    </>
  );
}

export default App;