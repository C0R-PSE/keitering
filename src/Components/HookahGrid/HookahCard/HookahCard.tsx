import './HookahCard.css'
import Gallery from '../../Gallery/Gallery'
import { ReactComponent as InfoIcon } from '../../../media/website_media/icons/icon.svg'
import { Suspense, use, useContext } from 'react'
import { Context } from '../../../App'
import InfoBox from '../../Infobox/Infobox'

function HookahCard({ id, hookah }: { id: number, hookah: {photos: string[], name: string} }) {
  const { dataPromise, show_info, info_tl } = useContext(Context)
  const { data } = use(dataPromise!)
  var img_src: string | undefined
  if (hookah.photos.length > 0) { img_src = process.env.PUBLIC_URL + '/' + hookah.photos[0] }
  function HookahPreview({ id }) {
    return (

      <Context value={{ info_tl }}>
        <InfoBox>
          <Gallery withSections={true} id={id} />
          <div className='footer'>
            <div className='label'>{data.hookahs[id].name}</div>
          </div>
        </InfoBox>
      </Context>
    )
  }
  return (
    <Suspense>
      <div onClick={() => show_info!(<HookahPreview id={id} />)} className="hookah_card">
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
    </Suspense>
  )
}
export default HookahCard