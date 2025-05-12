import { useGSAP } from "@gsap/react"
import React, { useRef } from "react"
import "./Accordion.css"


function Tab({ children }) {
  return (
    <div className="tab">
      {children}
    </div>
  )
}

function Heading({ children }) {

  return (
    <div className="heading" onClick={(e) => {
      const tab = (e.target as Element).closest('.tab')!
      Array.from(tab.closest(".accordion")!.querySelectorAll(".tab")).forEach((tab) => { tab.classList.remove("active") })
      tab.classList.add("active")
    }}>
      {children}
    </div>
  )
}

function Content({ children }) {

  return (
    <div className="content-wrapper">
      <div className="content">
        {children}
      </div>
    </div>
  )
}
const Accordion: (props: { children?: any, height?: string | undefined }) => React.JSX.Element = function ({ children, height }) {
  const accordion: React.Ref<HTMLDivElement> = useRef(null)
  useGSAP(() => {
    (accordion.current as Element).children[0].classList.add("active")
  })
  return (
    <div className={"accordion " + (height || "")} ref={accordion}>
      {children}
    </div>
  )
}

export { Accordion, Content, Tab, Heading }
