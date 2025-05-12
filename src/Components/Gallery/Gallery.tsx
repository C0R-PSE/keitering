import './Gallery.css'
import { useState, WheelEvent } from 'react'
import { dataLocal } from '../../db'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/all';
gsap.registerPlugin(useGSAP, ScrollToPlugin);

function Gallery({ withSections, id }) {
  const [currentSection, updateSection] = useState(0)
  function scroll_gallery(e: WheelEvent) {
    const gallery = (e.target as Element).closest('.gallery')!
    const images = [...gallery.children]
    var inc = 1 * Number(e.deltaY > 0) - 1 * Number(e.deltaY < 1)
    const wrapper = gallery.closest('.wrapper')!
    const sections = [...wrapper.querySelector('.sections')!.children]
    var nextSection = currentSection + inc
    if (nextSection >= 0 && nextSection < images.length - 2) {
      var offset = 0
      var scrollTarget = images[nextSection] // first section
      if (nextSection === images.length - 3) { // last section
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
        scrollTo: { x: scrollTarget, offsetX: offset }
      })
    }
  }
  
  const images: React.JSX.Element[] = []
  const progressBarSections: React.JSX.Element[] = []
  let sectionsElem: React.JSX.Element | undefined
  const hookah_data = dataLocal.hookahs[id]
  for (var i in hookah_data.photos) {
    for (var k = 0; k <= 6; k++) {
      images.push(
        <img key={k} alt=''
          className='preview_hookah_image'
          src={process.env.PUBLIC_URL + '/' + hookah_data.photos[i]} />
      )
      if (k > 0 && k < 6) {
        progressBarSections.push(
          <div key={k} className={'section' + ' active'.repeat(Number(k === 1))}></div>
        )
      }
    }
  }
  if (withSections) {
    sectionsElem = <div className='sections'>{progressBarSections}</div>
  }

  return (
    <div className='wrapper'>
      <div onWheel={(e: WheelEvent) => scroll_gallery(e)} className="gallery">
        {images}
      </div>
      {sectionsElem}
    </div>
  )
}

export default Gallery