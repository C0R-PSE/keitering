import HookahCard from './HookahCard/HookahCard.tsx'
import { data } from '../../db'
import { useGSAP } from '@gsap/react'
import { Suspense, use, useContext, useState } from 'react'
import { Context } from '../../App'


function HookahGrid() {
  const { dataPromise, open_tab, show_info, info_tl } = useContext(Context)
  const { data } = use(dataPromise)
  const [hookahs_width, updateHookahsWidth] = useState(checkGridWidth())

  function checkGridWidth() {
    const contentWidth = Math.min(window.innerWidth - 100, 1600) - 325
    const max_columns = Math.floor((contentWidth - 250) / 300) + 1
    return (
      max_columns <= 1
        ? 250
        : (max_columns > Object.keys(data.hookahs).length)
          ? Object.keys(data.hookahs).length * 300 - 50
          : 250 + 300 * (max_columns - 1)
    )
  }
  useGSAP(() => {
    window.onresize = () => updateHookahsWidth(checkGridWidth())
    open_tab('hookahs')
  })
  return (
    <Context value={{show_info, dataPromise, info_tl}}>
      <div className="hookahs" style={{ width: hookahs_width + 'px' }}>
        {data.hookahs.map((hookah, i) => (
          <HookahCard key={i} id={i} hookah={hookah} />
        ))}
      </div>
    </Context>
  )
}

export default HookahGrid