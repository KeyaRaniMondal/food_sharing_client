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
      <Banner />
      <div className="mt-12">
        <Features foods={foods} />
      </div>
      <div className="mt-16 md:mt-20 lg:mt-24">
        <Recipe />
      </div>

      <div className="mt-16">
        <ReviewSection />
      </div>
    </div>
  );
};

export default Home;
