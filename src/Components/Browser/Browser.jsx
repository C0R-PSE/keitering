import './Browser.css'



function Browser({files}) {
  var result = []
  for (let i in files) {
    result.push(<File name={files[i].name} type={files[i].type} />)
  }
  return (
    <div className="file_browser">
        <div className="browser_panel">
            <div className="back button active"></div>
            <div className="path"></div>
        </div>
        <div className="browser_content">
            {result}
        </div>
    </div>
  )
}
function File({name, type}) {
    if (type==='dir') {
        return(
          <div className='browser_item folder'>
            <img src={process.env.PUBLIC_URL + '/media/website_media/icons/Folder_Icon.png'} />
            <div className='label'>
              {name}
            </div>
          </div>
        )
    } else if (type==='file') {
        return(
          <div className='browser_item file'>
              {name}
          </div>
        )
    }
}
export default Browser