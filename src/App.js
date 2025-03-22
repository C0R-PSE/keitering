import './App.css';
import Browser from './Components/Browser/Browser'
import {dataLocal} from './db'
import { useEffect, useState } from 'react'
import Gallery from './Components/Gallery/Gallery';

//console.log(dataLocal)

function App() { // Главная страница
  return (
    
    <div className='App'>
      <div className="info_sheet">
        <div className="info_box"></div>
      </div>
      <div className="sticky_sheet">
        <div className="menu_top"></div>
        <div className="top_bar">
          <div className="browse_button" style={{width: "100px", backgroundColor: "brown"}}></div>
          <div className="menu_button_top"></div>
        </div>
      </div>
      <div className="content_wrapper">
        <div className="content_grid" active="Наши кальяны">
          <div className="navigation">
            <div tag="hookahs" className="active"><div className="label">Кальяны</div></div>
            <div tag="tobacco"><div className="label">Табаки</div></div>
            <div tag="prices"><div className="label">Услуги и тарифы</div></div>
          </div>
          <div className="content">
            <div className="hookahs"></div>
            <div className="prices"></div>
            <div className="tobacco"></div>
          </div>
        </div>
      </div>
    </div>
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