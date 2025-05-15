import { NavLink, useLoaderData } from "react-router-dom";
import Banner from "../components/banner";
import Features from "../components/featured";
import Recipe from "../components/recipe";
import ReviewSection from "../components/rivew";

import '../App.css'
import '../index.css'
import SharedByFoodies from "../components/newsAndUpdates";
import CookedMoments from "../components/newsAndUpdates";
import AllReviews from "./allReviews";

const Home = () => {
  const foods = useLoaderData();

  return (
    <div>
      <Banner />
      <div className="mt-12">
        <Features foods={foods} />
      </div>
      <CookedMoments></CookedMoments>
      <div className="mt-16 md:mt-20 lg:mt-24">
        <Recipe />
      </div>
<AllReviews></AllReviews>
    </div>
  );
};

export default Home;
