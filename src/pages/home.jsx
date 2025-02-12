import { NavLink, useLoaderData } from "react-router-dom";
import Banner from "../components/banner";
import Features from "../components/featured";
import Recipe from "../components/recipe";
import rivew from "../assets/rivew.jpg";
import '../App.css'
import '../index.css'
import Rivew from "../components/rivew";

const Home = () => {
  const foods = useLoaderData();

  return (
    <div>

      <div className="h-80 w-full">
        <Banner />
      </div>

      {/* <div className="overflow-hidden mt-40">
        <h1 className="mt-5 text-base-content text-center">Top fans</h1>
        <div className="running-image">
          <img
            src={rivew}
            alt="Review Section"
            className=" object-cover"
          />
        </div>
      </div> */}
      <Features foods={foods} />
      <div className="text-center my-6">
        <NavLink to="/availfood">
          <button className="btn btnfe w-40">View All Foods</button>
        </NavLink>
      </div>
      <div className="my-10">
        <Recipe />
      </div>
      <Rivew></Rivew>
    </div>
  );
};

export default Home;

