import React, { createContext, Suspense, use, useContext, useRef } from "react"
import { createRoot } from 'react-dom/client';
import './App.css';
import { Route, Routes, useLocation, useNavigate } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Admin, Orders, Keitering } from "./Pages/Pages";
import { loadData } from './db'


//gsap.registerPlugin(useGSAP, ScrollToPlugin);


const dataPromise = loadData()


export const Context = createContext<{
  info_sheet?: React.RefObject<any>,
  info_sheet_wrapper?: React.RefObject<any>,
  show_info?: (content: React.JSX.Element) => void,
  info_tl?: gsap.core.Timeline,
  dataPromise?: typeof dataPromise,
  open_tab?: (tab: string) => void
}>({})

function PageNotFound({ back }) {
  const navigate = useNavigate()
  return (
    <>
      <h1>404 Page Not Found</h1>
      <div onClick={() => navigate("../" + back)}>На главную</div>
    </>
  )
}

function Test() {
  const dataPromise = loadData()
  const data: { DBdata: {}, data: {} } = use(dataPromise)
  console.log(data)
  //<Suspense fallback={"loading"}><Test /></Suspense>

  return (<>
    <div>{JSON.stringify(data)}</div>
  </>)
}

function LocationHandler() {
  const location = useLocation()
  const { info_tl } = useContext(Context)

  useGSAP(() => {
    document.querySelector("html")?.setAttribute("page", location.pathname)
    info_tl!.reverse()
  }, [location])

  return null
}

function App() {
  console.log("app rendered")

  //const location = useLocation()  ---  влечёт ре-рендер App
  const info_sheet = useRef<any>(null)
  const info_sheet_wrapper = useRef<any>(null)
  const info_tl = gsap.timeline({
    paused: true, onReverseComplete: () => {
      info_sheet_wrapper.current.render(null);
      info_sheet.current.classList.remove('active');
      info_sheet.current.removeAttribute('style')
    }
  })

  function show_info(content: React.JSX.Element) {
    info_sheet_wrapper.current.render(content)
    info_sheet.current.classList.add('active')
    info_tl.play()
  }
  function hide_info() {
    info_tl.reverse()
  }

  useGSAP(() => {
    info_sheet_wrapper.current = createRoot(document.querySelector('.wrapper')!)
    info_tl
      .to(info_sheet.current, { zIndex: 1000, duration: 0 })
      .to(info_sheet.current, { opacity: 1, duration: .25 })
  })
  return (
    <Context value={{ show_info, info_tl, dataPromise }}>
      <LocationHandler />
      <div className="info_sheet" ref={info_sheet} onClick={(e) => {
        if ((e.target as Element).classList.contains('wrapper')) { hide_info() }
      }}>
        <div className='wrapper' ref={info_sheet_wrapper} />
      </div>
      <div className='content_wrapper'>
        <Routes>
          <Route path="" element={<Keitering />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/admin/*" element={<PageNotFound back={"admin"} />}></Route>
          <Route path="*" element={<PageNotFound back={""} />}></Route>
          <Route path="/admin/orders/:type" element={<Orders />}></Route>
        </Routes>
      </div>
    </Context >
  )
}

export default App