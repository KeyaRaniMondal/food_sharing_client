import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/authProviders";

const AvailableFood = () => {

    const {user}=useContext(AuthContext)
  const foods = useLoaderData(); 
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFoods = foods.filter((food) =>
    food.food_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  return (
    <div className="w-max pb-4 mt-10 mx-10">
      <h1 className="text-4xl font-bold text-center pb-14">Available Foods</h1>

      <div className="flex justify-center mb-8 ">
        <input
          type="text"
          placeholder="Search foods by name..."
          className="w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-10 text-black mx-20 w-full">
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
