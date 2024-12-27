import { useContext, useState } from "react";
import addfood from '../assets/addfood.jpg'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../providers/authProviders";

const AddFood = () => {

    const {user}=useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const FoodImg = form.FoodImg.value;
        const food_name = form.food_name.value;
        const quantity = form.quantity.value;
        const location = form.location.value;
        const time = form.time.value;
        const notes = form.notes.value;
        const status = form.status.value;
 

        // Validations
        if (!FoodImg.startsWith("http")) {
            toast.error("food image must be a valid URL.");
            return;
        }
        if (!food_name || food_name.length < 2) {
            toast.error("food name must be at least 2 characters long.");
            return;
        }

        if ( status===false) {
            toast.error("Food is not available.");
            return;
        }

        const newFoods = {
            FoodImg,
            food_name,
            quantity,
            location,
            time,
            notes,
            status,
            userName: user?.displayName || "Anonymous",
            userEmail: user?.email || "No email",
            userPhoto: user?.photoURL || "No photo",
        };


        fetch("http://localhost:5000/food_collection", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newFoods),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    toast.success("Successfully added!");
                    form.reset();
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to add foods. Please try again.");
            });
    };

    return (
        <div className="bg-[#bddbbd]">

            <h1 className="text-3xl pt-5 font-bold text-center">Add Foods to SAVOURY</h1>
            <img src={addfood} alt="" className="flex mx-auto justify-center" />
            <form onSubmit={handleSubmit} className="text-center">
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
                    Add Food
                </button>
                <ToastContainer position="top-right" />
            </form>
        </div>
    );
};

export default AddFood;