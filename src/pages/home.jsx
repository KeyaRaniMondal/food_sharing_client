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
      
      <div className="mt-[1500px] md:mt-[500px] lg:mt-0">
        <Recipe />
      </div>
      <ReviewSection></ReviewSection>
    </div>
  );
};

export default Home;

