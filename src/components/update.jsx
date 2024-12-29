import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateFood = () => {


 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    }



  return (
    <div className="flex justify-between m-10 ">
      <div className="justify-center ml-20">
        <h1 className="text-3xl pt-5 font-bold text-center">Update Food</h1>
        <form onSubmit={handleSubmit}>
        <div className="font-bold mb-2">
                    Food Image:
                    <input
                        type="text"
                        name="FoodImg"
                        placeholder="Enter image"
                        className="input input-bordered input-warning w-full max-w-xs"
                    />
                </div>
                <div className="font-bold mb-2">
                    Food Name: <input
                        type="text"
                        name="food_name"
                        placeholder="Enter Food Name"
                        className="input input-bordered input-warning w-full max-w-xs" />
                </div>
                <div className="font-bold mb-2">
                    Food Quantity: <input
                        type="number"
                        name="quantity"
                        placeholder="Food Quentity"
                        className="input input-bordered input-warning w-full max-w-xs" />
                </div>
                <div className="font-bold mb-2">
                    Pickup Location<input
                        type="text"
                        name="location"
                        placeholder="Enter Location"
                        className="input input-bordered input-warning w-full max-w-xs" />
                </div>

                <div className="font-bold mb-2">
                    Expire Date/Time<input
                        type="datetime-local"
                        name="time"
                        placeholder="Type here"
                        className="input input-bordered input-warning w-full max-w-xs" />
                </div>

                <div className="font-bold ">
                    Additional Notes: 
                    <textarea
                        className="textarea textarea-warning"
                        placeholder="Movie Summary"
                        name="notes"
                    ></textarea>
                </div>
                <div className="font-bold mb-2">
                    Food Status: <input
                        type="text"
                        name="status"
                        placeholder="Type here"
                        className="input input-bordered input-warning w-full max-w-xs" />
                </div>

                <button type="submit" className="btn btn1 my-5 text-white">
                    Update Food
                </button>
                <ToastContainer position="top-right" />
        </form>
      </div>
         
    </div>
  );
};

export default UpdateFood;
