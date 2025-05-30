import { useContext } from "react";
import addfood from "../assets/addfood.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../providers/authProviders";

const AddFood = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const FoodImg = form.FoodImg.value.trim();
    const food_name = form.food_name.value.trim();
    const quantity = form.quantity.value.trim();
    const price = form.price.value.trim();
    const location = form.location.value.trim();
    const time = form.time.value;
    const notes = form.notes.value.trim();
    const status = form.status.value || "available";

    // Validations
    if (!FoodImg.startsWith("http")) {
      toast.error("Food image must be a valid URL.");
      return;
    }
    if (!food_name || food_name.length < 2) {
      toast.error("Food name must be at least 2 characters long.");
      return;
    }
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      toast.error("Quantity must be a valid positive number.");
      return;
    }
    if (!price || isNaN(price) || price <= 0) {
      toast.error("Price must be a valid positive number.");
      return;
    }
    if (!location) {
      toast.error("Pickup location is required.");
      return;
    }
    if (!time) {
      toast.error("Expiration date/time is required.");
      return;
    }

    const newFoods = {
      FoodImg,
      food_name,
      quantity,
      price,
      location,
      time,
      notes,
      status,
      userName: user?.displayName || "Anonymous",
      userEmail: user?.email || "No email",
      userPhoto: user?.photoURL || "No photo",
    };

    fetch("https://food-sharing-server-hazel.vercel.app/food_collection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
      body: JSON.stringify(newFoods),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Food successfully added!");
          form.reset();
        } else {
          toast.error("Failed to add food. Please try again.");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred. Please try again.");
      });
  };

  return (
<div className="bg-[#bddbbd]">
  <h1 className="text-3xl font-bold text-center py-10">Add Foods to SAVOURY</h1>
  <img src={addfood} alt="" className="flex mx-auto justify-center h-40 w-96" />
  
  <form onSubmit={handleSubmit} className="text-left mx-5 sm:mx-10 lg:mx-40  mt-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div className="font-bold mb-2">
        Food Image:
        <input
          type="text"
          name="FoodImg"
          placeholder="Enter image"
          className="input input-bordered input-warning w-full"
        />
      </div>
      <div className="font-bold mb-2">
        Food Name:
        <input
          type="text"
          name="food_name"
          placeholder="Enter Food Name"
          className="input input-bordered input-warning w-full"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
      <div className="font-bold mb-2">
        Food Quantity:
        <input
          type="number"
          name="quantity"
          placeholder="Food Quantity"
          className="input input-bordered input-warning w-full"
        />
      </div>
      <div className="font-bold mb-2">
        Pickup Location:
        <input
          type="text"
          name="location"
          placeholder="Enter Location"
          className="input input-bordered input-warning w-full"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
      <div className="font-bold mb-2">
        Expire Date/Time:
        <input
          type="datetime-local"
          name="time"
          className="input input-bordered input-warning w-full"
        />
      </div>
      <div className="font-bold mb-2">
        Food Status:
        <input
          type="text"
          name="status"
          defaultValue="available"
          readOnly
          className="input input-bordered input-warning w-full"
        />
      </div>
      <div className="font-bold mb-2">
        Food Price:
        <input
          type="number"
          name="price"
          placeholder="Food Price"
          className="input input-bordered input-warning w-full"
        />
      </div>
    </div>

    <div className="mt-5">
      <div className="font-bold">
        Additional Notes:
        <textarea
          className="textarea textarea-warning w-full"
          placeholder="Ingredients or additional details"
          name="notes"
        ></textarea>
      </div>
    </div>

    <div className="text-center mt-8">
      <button type="submit" className="btn btn-wide btn-outline text-green-900 mb-8">
        Add Food
      </button>
    </div>
    <ToastContainer position="top-right" />
  </form>
</div>


  );
};

export default AddFood;
