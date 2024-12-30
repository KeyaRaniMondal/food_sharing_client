import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateFood = () => {
  const food = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!food) {
      alert("Food not found");
      navigate("/availfood");
    }
  }, [food, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const notes = form.notes.value.trim();

    if (!notes || notes.length < 10) {
      toast.error("Notes must be at least 10 characters long.");
      return;
    }

    const updatedFood = {
      notes, 
    };

    fetch(`https://food-sharing-server-hazel.vercel.app/food_collection/${food._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updatedFood),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Food updated successfully!");
          navigate("/availfood");
        } else {
          toast.error("Failed to update food! Only notes can be updated.");
        }
      })
      .catch((error) => {
        console.error("Error updating food:", error);
        toast.error("An error occurred. Please try again.");
      });
  };

  return (
    <div className="flex justify-between m-10">
      <div className="justify-center ml-20">
        <h1 className="text-3xl pt-5 font-bold text-center">Update Food</h1>
        <form onSubmit={handleSubmit}>
          <div className="font-bold mb-2">
            Food Image:
            <input
              type="text"
              name="FoodImg"
              placeholder="Enter image"
              defaultValue={food.FoodImg}
              className="input input-bordered input-warning w-full max-w-xs"
              readOnly
            />
          </div>
          <div className="font-bold mb-2">
            Food Name:
            <input
              type="text"
              name="food_name"
              defaultValue={food.food_name}
              placeholder="Enter Food Name"
              className="input input-bordered input-warning w-full max-w-xs"
              readOnly
            />
          </div>
          <div className="font-bold mb-2">
            Food Quantity:
            <input
              type="number"
              name="quantity"
              placeholder="Food Quantity"
              defaultValue={food.quantity}
              className="input input-bordered input-warning w-full max-w-xs"
              readOnly
            />
          </div>
          <div className="font-bold mb-2">
            Pickup Location:
            <input
              type="text"
              name="location"
              placeholder="Enter Location"
              defaultValue={food.location}
              className="input input-bordered input-warning w-full max-w-xs"
              readOnly
            />
          </div>
          <div className="font-bold mb-2">
            Expire Date/Time:
            <input
              type="datetime-local"
              name="time"
              placeholder="Type here"
              defaultValue={new Date(food.time).toISOString().slice(0, 16)} 
              className="input input-bordered input-warning w-full max-w-xs"
              readOnly
            />
          </div>
          <div className="font-bold">
            Additional Notes:
            <textarea
              className="textarea textarea-warning"
              placeholder="Ingredients"
              defaultValue={food.notes}
              name="notes"
            ></textarea>
          </div>
          <div className="font-bold mb-2">
            Food Status:
            <input
              type="text"
              name="status"
              placeholder="Type here"
              defaultValue={food.status}
              className="input input-bordered input-warning w-full max-w-xs"
              readOnly
            />
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
