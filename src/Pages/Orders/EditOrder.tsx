import { Accordion, Tab, Heading, Content } from "../../Components/Accordion/Accordion.tsx"
import InfoBox from "../../Components/Infobox/Infobox.tsx"
import "./EditOrder.css"

const order_form_types: Array<{ heading: string, fields: { [index: string]: string[] } }> = [
  {
    heading: "Заказчик",
    fields: {
      name: ["on_create", "on_change"],
      phone_number: ["on_create", "on_change"],
      address: ["on_create", "on_change"]
    }
  },
  {
    heading: "Данные заказа",
    fields: {
      services: ["on_create", "on_change"],
      cost: ["auto"],
      bail: ["on_create", "on_change"],
      defects: ["on_change", "on_complete"],
      timestapms: ["on_create", "on_change", "on_complete"],
      comment: ["on_create", "on_change", "on_complete"],
      tags: ["auto"]
    }
  }
]
const order_form_labels = {
  name: "ФИО",
  phone_number: "номер телефона",
  address: "адрес",
  services: "услуги",
  cost: "стоимость",
  bail: "залог",
  defects: "дефекты",
  planned_start: "время начала (план.)",
  actual_start: "время начала (факт.)",
  planned_end: "время окончания (план.)",
  actual_end: "время окончания (факт.)",
  comment: "комментарий",
  tags: "тэги"
}

function EditOrder({ type }) {

  return (
    <InfoBox type={"edit_order"}>
      <Accordion height="full-length">
        {order_form_types.map((group) => (
          <Tab key={group.heading}>
            <Heading>{group.heading}</Heading>
            <Content>
              <div className="form_grid">
                {Object.keys(group.fields).map((field) => {

                  if (group.fields[field].includes("on_" + type)) {
                    return (
                      <>
                        <div key={field} className="label">{order_form_labels[field]}</div>
                        <input key={field + "_input"} id={field} autoComplete="false"></input>
                      </>
                    )
                  }
                })}
              </div>
            </Content>
          </Tab>
        ))}
      </Accordion>
      <button className="save" onClick={() => {
        const data = {}
        Array.from(document.querySelectorAll("input")).forEach((input) => data[input.id] = input.value)
        console.log(data)
      }}>Сохранить</button>
    </InfoBox>
  )
}

export default EditOrder