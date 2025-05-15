import { NavLink } from "react-router-dom";
import banner from "../assets/banner.jpg";

const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative h-[70vh] flex items-center justify-center"
    >

      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative text-center text-white px-4">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          FRESH MEAL IDEAS & RECIPE INSPIRATION
        </h2>
        <p className="text-sm md:text-lg max-w-2xl mx-auto">
          Find recipes for whatever you're craving, plus tips on how to make each dish stand out.
        </p>
        
      <div className="text-center mt-10">
        <NavLink to="/availfood">
          <button className="btn bg-black text-white w-40 font-semibold rounded-lg px-4 py-2 shadow-md">View All Foods</button>
        </NavLink>
      </div>
      </div>
    </div>
  );
};

export default Banner;
