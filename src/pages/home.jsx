import { NavLink, useLoaderData } from "react-router-dom";
import Banner from "../components/banner";
import Features from "../components/featured";
import Recipe from "../components/recipe";
import ReviewSection from "../components/rivew";

import '../App.css'
import '../index.css'

const Home = () => {
  const foods = useLoaderData();

  return (
    <div>

      <div className="h-80 w-full">
        <Banner />
      </div>
      <Features foods={foods} />
      <div className="text-center my-6">
        <NavLink to="/availfood">
          <button className="btn btn1 w-40">View All Foods</button>
        </NavLink>
      </div>
      <div className="my-10">
        <Recipe />
      </div>
      <ReviewSection></ReviewSection>
    </div>
  );
};

export default Home;

