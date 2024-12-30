import { NavLink, Outlet, useLoaderData } from "react-router-dom"
import NavBar from "../components/navbar"
import Banner from "../components/banner"
import Features from "../components/featured";
import Recipe from "../components/recipe";

const Home = () => {
  const foods = useLoaderData();
  return (
    <div>
      <div className="h-80 w-full">
        <Banner></Banner>
      </div>
      <Features foods={foods} />
      <NavLink to={"/availfood"}>
        <button className="btn btn1 w-40 mt-6">view All foods</button>
      </NavLink>
      <Recipe></Recipe>
    </div>
  )
}
export default Home