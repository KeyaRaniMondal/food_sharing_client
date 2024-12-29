import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/authProviders";

const AvailableFood = () => {

  const { user } = useContext(AuthContext)
  const foods = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFoods = foods.filter((food) =>
    food.food_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [change, setChange] = useState(false)
  const changeLayout = () => {
    setChange(true)
  }
  return (
    <div className="w-max pb-4 mt-10 mx-10">

      <h1 className="text-4xl font-bold text-center pb-14">Available Foods</h1>

      <div className="fixed top-28 right-5 z-10">
        <button onClick={changeLayout} className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition">Change Layout</button>
      </div>

      <div className="flex justify-center mb-8 ">
        <input
          type="text"
          placeholder="Search foods by name..."
          className="w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={`grid ${change ? "grid-cols-2" : "grid-cols-3"
        } gap-10 text-black mx-5 md:mx-20 mt-16 w-full`}
      >
        {filteredFoods.map((food) => (
          <div
            key={food._id}
            className="h-80 flex flex-col justify-between p-14"
            style={{
              backgroundImage: `url(${food.FoodImg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div>
              <h1 className="text-xl font-bold">{food.food_name}</h1>
              <p className="text-sm">{food.status ? "Available" : "Not Available"}</p>
            </div>
            <Link to={`/food/${food._id}`}>
              <button className="btn btn1 mt-2">See Details</button>
            </Link>
          </div>
        ))}
      </div>

      {filteredFoods.length === 0 && (
        <p className="text-center text-lg text-gray-500">No foods found.</p>
      )}
    </div>
  );
};

export default AvailableFood;
