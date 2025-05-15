import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/authProviders";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyFood = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.email) {
      axios
        .get(`https://food-sharing-server-hazel.vercel.app/food_collection?email=${user.email}`, {
          withCredentials: true,
        })
        .then((res) => setFoods(res.data));
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the food permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://food-sharing-server-hazel.vercel.app/food_collection/${id}`, {
          method: "DELETE",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setFoods((prevFoods) => prevFoods.filter((food) => food._id !== id));
              Swal.fire("Deleted!", "Your food has been deleted.", "success");
            } else {
              Swal.fire("Failed!", "Failed to delete the food.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting food:", error);
            Swal.fire("Error!", "An error occurred while deleting the food.", "error");
          });
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/food/update/${id}`);
  };

  return (
    <div className="my-food-container p-4 sm:p-6 md:p-10 mt-20">
      <h1 className="text-3xl font-bold text-center mb-10">Manage My Foods</h1>

      {foods.length === 0 ? (
        <p className="text-center text-[#4b2727]">
          You have not added any foods yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 text-sm sm:text-base">Image</th>
                <th className="p-3 text-sm sm:text-base">Food Name</th>
                <th className="p-3 text-sm sm:text-base">Quantity</th>
                <th className="p-3 text-sm sm:text-base">Location</th>
                <th className="p-3 text-sm sm:text-base">Status</th>
                <th className="p-3 text-sm sm:text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food._id} className="border-t">
                  <td className="p-3">
                    <img
                      src={food.FoodImg}
                      alt={food.food_name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 text-sm">{food.food_name}</td>
                  <td className="p-3 text-sm">{food.quantity}</td>
                  <td className="p-3 text-sm">{food.location}</td>
                  <td className="p-3 text-sm">{food.status}</td>
                  <td className="p-3">
                    <button
                      className="btn btn-sm mr-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      onClick={() => handleUpdate(food._id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(food._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFood;
