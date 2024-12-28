import React, { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/authProviders";
// import Swal from "sweetalert2";

const FoodDetails = () => {
  const food = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (!food) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold">Food Not Found</h1>
        <button
          onClick={() => navigate("/availfood")}
          className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Go Back to All Movies
        </button>
      </div>
    );
  }

  const { _id,
    FoodImg,
    food_name,
    quantity,
    location,
    time,
    notes,
    status,
     } = food;

  



  return (
    <div className="movie-details w-4/5 mx-auto my-10 ml-80">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-black ml-20">{ food_name}</h1>
      </div>
      <div className="flex gap-10 mt-5">
        <img
          src={FoodImg}
          alt={ food_name}
          className="w-1/3 h-auto rounded-lg shadow-lg"
        />
        <div className="flex flex-col gap-4">
          <p className="text-md text-black">
            Notes: <br /> {notes}
          </p>
        

          <div className="flex gap-4">
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;