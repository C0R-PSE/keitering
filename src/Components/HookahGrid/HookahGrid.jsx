import HookahCard from './HookahCard/HookahCard'
import { data } from '../../db'

function HookahGrid() {
    const hookahs = []
    for (let i in data.hookahs) {
        hookahs.push(<HookahCard key={i} onClick={() => console.log(data.hookahs[i].name)} id={i} />)
    }
    return(
        <div className="wrapper">
            {hookahs}
        </div>
    )
}

export default HookahGrid