import './HookahCard.css'
import { data } from '../../../db'
import { info_tl, show_info } from '../../../App.tsx'
import Gallery from '../../Gallery/Gallery'
import { ReactComponent as InfoIcon } from '../../../media/website_media/icons/icon.svg'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'


function HookahPreview({ id }) {
  const info_box = useRef()
  useGSAP(() => {
    info_tl.from(info_box.current, {translateY: "20%", duration: .25}, "<")
    console.log('Hookah preview rendered')
    return(
      () => console.log('Hookah preview unmounted')
    )
  })
  return (
    <div className="info_box" ref={info_box}>
      <Gallery withSections={true} id={id} />
      <div className='footer'>
        <div className='label'>{data.hookahs[id].name}</div>
      </div>
    </div>
  )
}

function HookahCard({ id }) {
  const hookah = data.hookahs[id]
  var img_src = null
  if (hookah.photos.length > 0) { img_src = process.env.PUBLIC_URL + '/' + hookah.photos[0] }
  return (
    <div onClick={() => show_info(<HookahPreview id={id} />)} className="hookah_card">
      {/*<div className="buttons_sheet">
                <div className="view_button"></div>
                <div className="edit_button"></div>
            </div>*/}
      <img className='card_image' src={img_src} alt='' />
      <div className="card_footer">
        <div className="label">{hookah.name}</div>
        <InfoIcon />
      </div>
    </div>
  )
}
export default HookahCard