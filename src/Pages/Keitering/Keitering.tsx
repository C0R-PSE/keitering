import './Keitering.css';
import { useGSAP } from '@gsap/react';
import HookahGrid from '../../Components/HookahGrid/HookahGrid.jsx';
import { Instructions, Questions } from '../../Components/Instructions/Instructions.jsx';
import React, { Suspense, useContext } from 'react';
import Prices from '../../Components/Prices/Prices.tsx';
import gsap from 'gsap';
import { Context } from '../../App.tsx';
gsap.registerPlugin(useGSAP);

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    active?: string;
    tag?: string;
  }
}

const menu_tl = gsap.timeline({
  paused: true, onReverseComplete: () => {
    document.querySelector('.menu_top')?.removeAttribute('style')
  }
})


function Keitering() { // Главная страница
  console.log('Keitering rendered')
  const {dataPromise, show_info, info_tl} = useContext(Context)

  function open_tab(tab: String) {
    const content_grid = document.querySelector('.content_grid')!
    const navigation = content_grid.querySelector('.navigation')!
    const currently_active = [...content_grid.getElementsByClassName('active')]
    for (var i in currently_active) {
      currently_active[i].classList.remove('active')
    }
    navigation.querySelector('[tag="' + tab + '"]')!.classList.add("active")
    content_grid.querySelector('.content')!.querySelector('.' + tab)!.classList.add("active")
  }


  useGSAP(() => { // onload events
    //open_tab('hookahs')
    menu_tl.to(document.querySelector('.menu_top'), { bottom: "unset", top: "50px", duration: 0.25 })
  })
  return (
    <Context value={{dataPromise, open_tab, show_info, info_tl}}>
      <div className="sticky_sheet">
        <div className="menu_top"></div>
        <div className="top_bar">
          <div className="browse_button" style={{ width: "100px", backgroundColor: "brown" }}></div>
          <div className="menu_button_top" onClick={
            () => {
              const menu = document.querySelector('.menu_top')!
              menu.classList.toggle('active')
              menu_tl[menu.classList.contains('active') ? "play" : "reverse"]();
            }
          }></div>
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
          <Suspense fallback={<div className="hookahs"></div>}><HookahGrid /></Suspense>
          <div className="tobacco"></div>
          <div className="prices"><Prices /></div>
          <Instructions />
          <Questions />
        </div>
      </div>
    </Context>
  )
}

export default Keitering;