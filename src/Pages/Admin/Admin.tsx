import { useNavigate } from "react-router"
import "./Admin.css"

const Tools = [
  {name: "Заказы", link: "orders/rent"},
  {name: "Мероприятия", link: "orders/events"},
  {name: "Аналитика", link: "analytics"},
]

function Admin() {
  let navigate = useNavigate()
  return(
    <>
      <h1>Кабинет Администратора</h1>
      <div className="tool_grid">
        {Tools.map((tool) => (
          <div key={tool.name} className="tool_button" onClick={() => {
            navigate(tool.link)
          }}>{tool.name}</div>
        ))}
      </div>
    </>
  )
}

export default Admin