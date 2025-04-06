import './HookahCard.css'
import { data } from '../../../db'
import { show_info } from '../../../App'
import Gallery from '../../Gallery/Gallery'
import { ReactComponent as InfoIcon } from '../../../media/website_media/icons/icon.svg'

function buildHookahPreview(id) {
    return(
        <div className="info_box">
          <Gallery withSections={true} id={id} />
          <div className='footer'><div className='label'>{data.hookahs[id].name}</div></div>
        </div>
    )
}

function HookahCard({id}) {
    const hookah = data.hookahs[id]
    var img_src = null
    if (hookah.photos.length > 0) { img_src = process.env.PUBLIC_URL + '/' + hookah.photos[0] }
    return(
        <div onClick={() => show_info(buildHookahPreview(id))} className="hookah_card">
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