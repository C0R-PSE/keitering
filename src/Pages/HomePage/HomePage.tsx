import { Link } from "react-router";

export default function HomePage() {

  return (
    <>
      <h1>Главная</h1>
      <Link to={"Admin"}>Кабинет Администратора</Link>
      <Link to={"Keitering"}>Кейтеринг</Link>
    </>
  )
}