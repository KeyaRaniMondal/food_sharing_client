import { useState } from "react";
import addfood from '../assets/addfood.jpg'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddFood = () => {


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const moviePoster = form.moviePoster.value;
        const movieTitle = form.movieTitle.value;
        const types = form.Types.value;
        const duration = form.movieTime.value;
        const summary = form.Bio.value;

        // Validations
        if (!moviePoster.startsWith("http")) {
            toast.error("Movie Poster must be a valid URL.");
            return;
        }
        if (!movieTitle || movieTitle.length < 2) {
            toast.error("Movie Title must be at least 2 characters long.");
            return;
        }
        if (!duration || duration < 60) {
            toast.error("Duration must be greater than 60 minutes.");
            return;
        }
        if (rating === 0) {
            toast.error("Please provide a rating for the movie.");
            return;
        }
        if (!summary || summary.length < 10) {
            toast.error("Summary must be at least 10 characters long.");
            return;
        }

        const newMovies = {
            moviePoster,
            movieTitle,
            types,
            duration,
            rating,
            summary,
        };

        //console.log(newMovies);

        fetch("https://movie-portal-server-rouge.vercel.app/movies", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newMovies),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    toast.success("Successfully added!");
                    form.reset();
                    setRating(0);
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to add movie. Please try again.");
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
                        name="moviePoster"
                        placeholder="Enter image"
                        className="input input-bordered input-warning w-full max-w-xs"
                    />
                </div>
                <div className="font-bold mb-2">
                    Food Name: <input
                        type="text"
                        placeholder="Enter Food Name"
                        className="input input-bordered input-warning w-full max-w-xs" />
                </div>
                <div className="font-bold mb-2">
                    Food Quantity: <input
                        type="number"
                        placeholder="Food Quentity"
                        className="input input-bordered input-warning w-full max-w-xs" />
                </div>
                <div className="font-bold mb-2">
                    Pickup Location<input
                        type="text"
                        placeholder="Enter Location"
                        className="input input-bordered input-warning w-full max-w-xs" />
                </div>

                <div className="font-bold mb-2">
                    Expire Date/Time<input
                        type="datetime-local"
                        placeholder="Type here"
                        className="input input-bordered input-warning w-full max-w-xs" />
                </div>

                <div className="font-bold ">
                    Additional Notes: 
                    <textarea
                        className="textarea textarea-warning"
                        placeholder="Movie Summary"
                        name="Bio"
                    ></textarea>
                </div>
                <div className="font-bold mb-2">
                    Food Status: <input
                        type="text"
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