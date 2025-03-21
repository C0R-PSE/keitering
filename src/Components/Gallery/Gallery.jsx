import './Gallery.css'
import { useEffect, useState } from 'react'
import { hookahs_images_data } from '../../github.js'
import { dataLocal } from '../../db.js'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/all';
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollToPlugin)

function Gallery() {
    const [currentSection, updateSection] = useState(0)
    function scroll_gallery(e) {
        console.log(e.deltaY)
        const gallery = e.target.closest('.gallery')
        const sections = [...gallery.children]
        var inc = 1*(e.deltaY > 0) - 1*(e.deltaY < 1)
        var offset = 0
        const wrapperWidth = gallery.closest('.wrapper').clientWidth
        const next_section = currentSection + inc
        if (next_section >= 0 && next_section <= sections.length - 1) {
            updateSection(next_section)
            gsap.to(".gallery", {
                duration: 1,
                scrollTo: {x: "#section_" + next_section, offsetX: offset}
            })
        }
    }

    let result = []
    const hookah_data = dataLocal.hookahs[0]
    for (var i in hookah_data.photos) {
        for (var k = 0; k < 10; k++) {
            result.push(
                <img key={k} id={"section_" + k} 
                className='preview_hookah_image' 
                src={process.env.PUBLIC_URL + '/' + hookah_data.photos[i]} />
            )
        }
    }

    return(
        <div onWheel={(e) => scroll_gallery(e)} className="gallery">
            {result}
        </div>
    )
}

export default Gallery