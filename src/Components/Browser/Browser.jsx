'use server'
import './Browser.css'
import { useEffect, useState } from 'react'
import { repopath, token } from '../../github.js'


function Browser({path}) {
  const base_path = path
  const [result, updateResult] = useState([])
  const [current_path, updatePath] = useState(path)
  useEffect(() => {
    browse(current_path)
  }, [current_path])
  

  async function browse(path) { // function updating browser content
    let result = []
    const query = await fetch(repopath + '/contents/' + path).then(resp => resp.json())
    for (let i in query) {
      result.push(<File key={i} item_data={query[i]} />)
    }
    updateResult(result)
  }
  
  function File({item_data}) { // File element
    var clickHandler = () => {}
    var img_src
    if (item_data.type=='dir') {
      clickHandler = () => updatePath(item_data.path)
      img_src = process.env.PUBLIC_URL + '/media/website_media/icons/Folder_Icon.png'
    } else if (item_data.type=='file') {
      clickHandler = () => window.open(item_data.html_url)
      img_src = item_data.download_url
    }
    return(
      <div onClick={() => clickHandler()}
       className={'browser_item ' + item_data.type}>
        <img src={img_src} />
        <div className='label'>
          {item_data.name}
        </div>
      </div>
    )
  }

  return ( // Browser element
    <div className="file_browser">
      <div className="browser_panel">
        <div className={"back button " + "active".repeat(current_path != base_path)} 
        onClick={() => {
          const split_path = current_path.split('/')
          updatePath(current_path.replace('/' + split_path[split_path.length - 1], ''))}}>
        </div>
        <div className="path">{current_path + '/'}</div>
      </div>
      <div className="browser_content">
        {result}
      </div>
    </div>
  )
}

export default Browser