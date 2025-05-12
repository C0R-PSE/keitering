import { useGSAP } from "@gsap/react"
import React, { Children, useContext, useRef } from "react"
import { Context } from "../../App.tsx"
import "./Infobox.css"

function InfoBox({ children, type }: { children?: any, type?: string }) {
  const context = useContext(Context)
  const info_box = useRef<any>(null)
  useGSAP(() => {
    context.info_tl!.from(info_box.current, {
      translateY: "20%",
      duration: .25,
      onComplete: () => {
        info_box.current.removeAttribute('style')
      }
    }, "<")
  })
  return (
    <div className={"info_box " + type} ref={info_box}>
      {children}
    </div>
  )
}
export default InfoBox