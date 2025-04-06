import './Instructions.css'

const instData = [{name: "Инструкция 1", content: "Текст Инструкции 1"}, {name: "Инструкция 2", content: <div style={{backgroundColor:"red", width:20, height:20}}></div>}]
const qData = [
  { name: "Потеряны шарики", 
    content: <>Ничего страшного в данной ситуации нету, шарики не попадают под критерии невозврата залога, это недорогой расходник, который очнеь легко потерять</>
  }, 
  { name: "Горчит табак", 
    content: <>
      Вполне возможно была допущена фатальная ошибка в укладке табака в чашу, но мы всё же попробуем решить эту проблему <br/>
      1) Попробуйте уменьшисть количество углей, затем продуть кальян и попробовать раскурить его вновь, вполне возможно это решить проблему <br/>
      2) Возможно небольшая часть табака пригорела ко дну калауда, и при должном желании это тоже решаемая проблема. 
      С помощью щипцов приподнимите калауд, затем проверьте, нету ли пригревших листьев табака, затем если такие имеються, 
      попробуйте удалить из и вновь продуйте кальян и попробуйте раскурить его <br/>
      3) Также совесем не стоит исключать вариант того что вам мог попасться не качественный табак, вы можете избежать данной проблемы приобретая табак у нас или в серцифицированных магазинах
    </>
  }, 
  { name: "Из шланга течет вода", 
    content: <>
      Во время покура кальяна, вполне возможно помимо дыма вы можете вдохнуть воду, сейчас рассмотрим по каким причинам это может происходить <br/>
      2) Также одной причин может быть то, что количество воды в колбе значительно превышет допустимый уровень, обратить в пункт "вода в чаше",
      чтобы наверняка убедиться в чем именно была допущена ошибка, в противном случае см. пункт 1 или обратитесь за помощью к администатору
    </>
  }
]

function build(data) {
  let output = []
  for (let i in data) {
    output.push(
    <div key={i} className="instruction" >
      <div className="instruction_header" onClick={(e) => {
        let active = [...e.target.closest('div:has(.instruction)').getElementsByClassName('instruction active')]
        e.target.closest('.instruction').classList.toggle('active')
        for (let i in active) {
          active[i].classList.remove('active')
        }
      }}>{data[i].name}</div>
      <div className="folding_content">
        <div className="instruction_content">{data[i].content}</div>
      </div>
    </div>
  )}
  return output
}

function Instructions() {
  return(
    <div className="instructions">
      {build(instData)}
    </div>
  )
}

function Questions() {
  return(
    <div className="questions">
      {build(qData)}
    </div>
  )
}

export { Instructions, Questions }