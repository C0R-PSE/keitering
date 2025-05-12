import './HookahCard.css'
import { data } from '../../../db.js'
import Gallery from '../../Gallery/Gallery.jsx'
import { ReactComponent as InfoIcon } from '../../../media/website_media/icons/icon.svg'
import { useContext } from 'react'
import { Context } from '../../../App.tsx'
import InfoBox from '../../Infobox/Infobox.tsx'
import React from 'react'



function HookahCard({ id }) {
  const context = useContext(Context)
  const hookah = data.hookahs[id]
  var img_src = null
  if (hookah.photos.length > 0) { img_src = process.env.PUBLIC_URL + '/' + hookah.photos[0] }
  function HookahPreview({ id }) {
    return (
      <Context.Provider value={context}>
        <InfoBox>
          <Gallery withSections={true} id={id} />
          <div className='footer'>
            <div className='label'>{data.hookahs[id].name}</div>
          </div>
        </InfoBox>
      </Context.Provider>
    )
  }
  return (
    <div onClick={() => context.show_info(<HookahPreview id={id} />)} className="hookah_card">
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