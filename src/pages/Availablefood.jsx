import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/authProviders";

const AvailableFood = () => {
  const { user } = useContext(AuthContext);
  const foods = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("none");

  const filteredFoods = foods
    .filter((food) => food.food_name?.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  const [change, setChange] = useState(false);
  const changeLayout = () => {
    setChange(true);
  };

  return (
    <div className="w-full max-w-screen-xl px-4 md:px-8 pb-4 mt-28 mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center pb-14">Available Foods</h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <button
          onClick={changeLayout}
          className="bg-black text-white px-4 py-2 rounded-full shadow-lg hover:bg-black transition"
        >
          Change Layout
        </button>

        <input
          type="text"
          placeholder="Search foods by name..."
          className="w-full md:w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="w-full md:w-auto px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-black"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="none">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <div
        className={`grid ${
          change ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        } gap-6 md:gap-10 mt-10 w-full`}
      >
        {filteredFoods.map((food) => (

                      <div
              key={food.id}
              className="relative h-80 rounded-xl overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105 group"
            >
              <img
                src={food.FoodImg}
                alt={food.food_name}
                className="object-cover w-full h-full group-hover:brightness-90 transition duration-300"
              />

              {/* Bottom overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm text-gray-800 px-4 py-3">
              <div className="flex justify-between">
                           <h1 className="text-lg font-bold">{food.food_name}</h1>
                           
             <p className="text-sm">{food.status ? "Available" : "Not Available"}</p>
              </div>

               <h1 className="text-lg font-bold">${food.price}</h1>
                <div className="flex justify-between items-center ">
                  <div className="flex text-yellow-700 text-lg">
                    <span>★ ★ ★ ★ ☆</span>
                  </div>
                  <div>
                    <Link to={`/food/${food._id}`} className="mt-auto">
                      <button className="btn btn-outline mt-4 font-semibold px-4 py-2 rounded-full shadow-md">
                        See Details
                      </button>
                    </Link>
                  </div>

                </div>
              </div>
            </div>


        ))}
      </div>

      {filteredFoods.length === 0 && (
        <p className="text-center text-lg text-gray-500 mt-10">No foods found.</p>
      )}
    </div>
  );
};

export default AvailableFood;
