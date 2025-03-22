import './Gallery.css'
import { useEffect, useState } from 'react'
import { hookahs_images_data } from '../../github.js'
import { dataLocal } from '../../db.js'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/all';
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollToPlugin)

function Gallery(withSections) {
    const [currentSection, updateSection] = useState(0)
    function scroll_gallery(e) {
        const gallery = e.target.closest('.gallery')
        const images = [...gallery.children]
        var inc = 1*(e.deltaY > 0) - 1*(e.deltaY < 1)
        const wrapper = gallery.closest('.wrapper')
        const sections = [...wrapper.querySelector('.sections').children]
        var nextSection = currentSection + inc
        if (nextSection >= 0 && nextSection < images.length - 2) {
            var offset = 0
            var scrollTarget = images[nextSection] // first section
            if (nextSection == images.length - 3) { // last section
                scrollTarget = images[nextSection + 2]
            } else if (nextSection > 0) { // middle sections
                scrollTarget = images[nextSection + 1]
                offset = wrapper.clientWidth / 2 - images[nextSection + 1].clientWidth / 2
            } 

            // scrolling
            if (withSections) {
                sections[currentSection].classList.remove('active')
                sections[nextSection].classList.add('active')
            }
            updateSection(nextSection)
            gsap.to(".gallery", {
                duration: 1,
                scrollTo: {x: scrollTarget, offsetX: offset}
            })
        }
    }

    let result = []
    let progressBarSections = []
    let sectionsElem = ''
    const hookah_data = dataLocal.hookahs[0]
    for (var i in hookah_data.photos) {
        for (var k = 0; k <= 6; k++) {
            result.push(
                <img key={k} 
                className='preview_hookah_image' 
                src={process.env.PUBLIC_URL + '/' + hookah_data.photos[i]} />
            )
            if (k > 0 && k < 6) {
                progressBarSections.push(
                    <div key={k} className={'section' + ' active'.repeat(k == 1)}></div>
                )
            }
        }
    }
    if (withSections) {
        sectionsElem = <div className='sections'>{progressBarSections}</div>
    }

    return(
        <div className='wrapper'>
            <div onWheel={(e) => scroll_gallery(e)} className="gallery">
                {result}
            </div>
            {sectionsElem}
        </div>
    )
}

export default Gallery