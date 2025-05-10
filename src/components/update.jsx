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

    const updatedFood = { notes };

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
    <div className="flex justify-center px-4 sm:px-6 lg:px-8 mt-28">
      <div className="w-full max-w-4xl bg-[#bddbbd] rounded-lg p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-10">Update Food</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="font-bold">
              Food Image:
              <input
                type="text"
                name="FoodImg"
                placeholder="Enter image"
                defaultValue={food.FoodImg}
                className="input input-bordered input-warning w-full"
                readOnly
              />
            </div>
            <div className="font-bold">
              Food Name:
              <input
                type="text"
                name="food_name"
                defaultValue={food.food_name}
                placeholder="Enter Food Name"
                className="input input-bordered input-warning w-full"
                readOnly
              />
            </div>
            <div className="font-bold">
              Food Quantity:
              <input
                type="number"
                name="quantity"
                placeholder="Food Quantity"
                defaultValue={food.quantity}
                className="input input-bordered input-warning w-full"
                readOnly
              />
            </div>
            <div className="font-bold">
              Pickup Location:
              <input
                type="text"
                name="location"
                placeholder="Enter Location"
                defaultValue={food.location}
                className="input input-bordered input-warning w-full"
                readOnly
              />
            </div>
            <div className="font-bold">
              Expire Date/Time:
              <input
                type="datetime-local"
                name="time"
                placeholder="Type here"
                defaultValue={new Date(food.time).toISOString().slice(0, 16)}
                className="input input-bordered input-warning w-full"
                readOnly
              />
            </div>
            <div className="font-bold">
              Food Status:
              <input
                type="text"
                name="status"
                placeholder="Type here"
                defaultValue={food.status}
                className="input input-bordered input-warning w-full"
                readOnly
              />
            </div>
          </div>

          <div className="font-bold mb-6">
            Additional Notes:
            <textarea
              className="textarea textarea-warning w-full"
              placeholder="Ingredients"
              defaultValue={food.notes}
              name="notes"
            ></textarea>
          </div>

          <button type="submit" className="btn btn1 mx-auto block">
            Update Food
          </button>
          <ToastContainer position="top-right" />
        </form>
      </div>
    </div>
  );
};

export default UpdateFood;
