import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/authProviders";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MyFood = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.email) {
      fetch(`http://localhost:5000/food_collection?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setFoods(data))
        .catch((error) => console.error("Error fetching foods:", error));
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
        fetch(`http://localhost:5000/food_collection/${id}`, {
          method: "DELETE",
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
    <div className="my-food-container bg-[#e0dae0] p-10">
      <h1 className="text-3xl font-bold text-center my-10">Manage My Foods</h1>
      {foods.length === 0 ? (
        <p className="text-center text-[#4b2727]">You have not added any foods yet.</p>
      ) : (
        <table className="table-auto w-full bg-white shadow-lg rounded">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Image</th>
              <th className="p-2">Food Name</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Location</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food._id} className="border-t">
                <td className="p-2">
                  <img src={food.FoodImg} alt={food.food_name} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="p-2">{food.food_name}</td>
                <td className="p-2">{food.quantity}</td>
                <td className="p-2">{food.location}</td>
                <td className="p-2">{food.status}</td>
                <td className="p-2">
                  <button
                    className="btn btn-primary btn-sm mr-2"
                    onClick={() => handleUpdate(food._id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(food._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyFood;
