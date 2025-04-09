import HookahCard from './HookahCard/HookahCard'
import { data } from '../../db'
import { useGSAP } from '@gsap/react'
import { useState } from 'react'

function checkGridWidth() {
  const contentWidth = Math.min(window.innerWidth - 100, 1600) - 325
  const max_columns = Math.floor((contentWidth - 250) / 300) + 1
  return(
    max_columns <= 1 
      ? 250
      :(max_columns > Object.keys(data.hookahs).length)
      ? Object.keys(data.hookahs).length * 300 - 50
      :250 + 300 * (max_columns - 1)
  )
}

function HookahGrid() {
  const [hookahs_width, updateHookahsWidth] = useState(checkGridWidth())
  useGSAP(() => {
    window.onresize = () => updateHookahsWidth(checkGridWidth())
  })
  const hookahs = []
  for (let i in data.hookahs) {
    hookahs.push(<HookahCard key={i} onClick={() => console.log(data.hookahs[i].name)} id={i} />)
  }
  return (
    <div className="hookahs" style={{ width: hookahs_width + 'px' }}>
      {hookahs}
    </div>)
}

export default HookahGrid