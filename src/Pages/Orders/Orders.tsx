import { useContext, useState } from "react"
import { useParams } from "react-router"
import "./Orders.css"
import { Context } from "../../App.tsx"
import EditOrder from "./EditOrder.tsx"

/* Аренда
номер заказа:
заказчик (контактные данные):
требуемые услуги:
стоимость:
дата и время отдачи:
залог: 
полученные дефекты: 
планируемая дата и время возврата: 
действительное время и дата возврата: 
Комментарий: */

/* Мероприятия
номер заказа:
сборщик:
доставщик:
исполнитель:
имя/контактные данные:
адрес исполнения
дата и время отгрузки:
требуемые услуги:
примечания:
дата и время загрузки:
дефекты/поломки:
возникшие проблемы:
Начальная стоимость:
Итоговая стоимость: */


interface Order {
  id: string
  status: string
  contacts: {
    name?: string,
    phone_number?: string,
    address?: string,
  }
  services?: string[]
  cost?: number
  bail?: number
  defects?: string
  timestamps: {
    planned_start?: string,
    actual_start?: string,
    planned_end?: string,
    actual_end?: string
  }
  comment?: string
  tags?: string[]
}
const orders_data: Array<Order> = [
  {
    id: "тест",
    status: "завершён",
    contacts: {
      name: "Петров П.П.",
      phone_number: "+79526789453",
      address: "СПб, ул. Хорошая, д. 10",
    },
    services: ["мастер", "фрукты", "подготовка"],
    cost: 0,
    bail: 0,
    defects: "повреждение трубки",
    timestamps: {
      planned_start: "1",
      actual_start: "2",
      planned_end: "3",
      actual_end: "4"
    },
    comment: "текст комментария",
    tags: ["кальян", "фрукты", "предоплата"]
  }
]

function buildOrders(data: Array<Order>) {
  return (
    data.map((order) => (
      <div key={order.id} className="order">
        <div className="heading" onClick={(e) => {
          let target = e.target as Element;
          if (target.classList.contains("heading")) {
            target.closest(".order")?.classList.toggle("active")
          }
        }}>
          <div className="id">{"Заказ №" + order.id.toUpperCase()}</div>
          <div className="cost">{`Стоимость: ${order.cost}₽`}</div>
        </div>
        <div className="order_content">
          <div className="details">
            <div>Заказчик</div><div>{order.contacts.name || ""}</div>
            <div>Адрес</div><div>{order.contacts.address || ""}</div>
            <div>Телефон</div><div>{order.contacts.phone_number || ""}</div>
            <div>Услуги</div><div className="list">
              {order.services?.map((name) => (<div>{name}</div>))}</div>
          </div>
        </div>
        <div className="footer">{order.tags?.map((tag) => (
          <div className={`tag ${tag}`}>
            <div className="dot" style={{ backgroundColor: "#000000c0" }}></div>
            <div className="label">{tag}</div>
          </div>
        ))}</div>
      </div>
    ))
  )
}

function Orders() {

  const context = useContext(Context);
  const { type } = useParams()
  const [orders, updateOrders] = useState(buildOrders(orders_data))

  return (
    <>
      <h1>{type}</h1>
      <div className="buttons">
        <div className="new_order"
          style={{ width: 50, height: 50, backgroundColor: "brown" }}
          onClick={() => context.show_info!(
            <Context value={context}><EditOrder type="create" /></Context>
          )}>
        </div>
      </div>
      <div className="orders_list">
        {orders}
      </div>
    </>
  )
}

export default Orders