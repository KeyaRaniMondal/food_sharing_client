import React, { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/authProviders";
import Swal from "sweetalert2";

const FoodDetails = () => {
  const { user } = useContext(AuthContext);
  const food = useLoaderData();
  const navigate = useNavigate();

  if (!food) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold">Food Not Found</h1>
        <button
          onClick={() => navigate("/availfood")}
          className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Go Back to All Foods
        </button>
      </div>
    );
  }

  const {
    _id,
    FoodImg,
    food_name,
    quantity,
    location,
    time,
    notes,
    status,
    userName,
    userEmail,
    userPhoto
  } = food;
  const name = userName || user?.displayName || "Anonymous"
  const email = userEmail || user?.email || "No email"
  const photo = userPhoto || user?.photoURL || "No photo"

  //For request delete
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/food_collection/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Food deleted successfully!",
                icon: "success",
                timer: 2000,
              });
              navigate("/foodreq");
            } else {
              Swal.fire({
                title: "Failed!",
                text: "Failed to delete the food. Please try again.",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting movie:", error);
            Swal.fire({
              title: "Error!",
              text: "An error occurred while deleting the food.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="food-details w-4/5 mx-auto my-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-black">{food_name}</h1>
      </div>
      <div className="flex gap-10 mt-5">
        <img
          src={FoodImg}
          alt={food_name}
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

      <button
        className="btn bg-[#d7da45] mt-5"
        onClick={() => document.getElementById("food-modal").showModal()}
      >
        Request Details
      </button>

      {/* Modal */}
      <dialog id="food-modal" className="modal modal-open mr-96">
        <div className="modal-box relative">
          <img
            src={FoodImg}
            alt={food_name}
            className="w-1/3 h-auto rounded-lg shadow-lg"
          />
          <h3 className="font-bold text-lg">{food_name} Details</h3>
          <h3 className="font-bold text-lg">{_id}</h3>
          <h3 className="font-bold text-lg">{email}</h3>
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="py-4">
            Quantity: {quantity}
            <br />
            Location: {location}
            <br />
            Time: {time}
            <br />
            <h3 className="font-bold text-lg">{notes}</h3>
            Status: {status ? "Available" : "Not Available"}
          </p>

          <div className="modal-action">
            <button
              className="btn btn-secondary"
              onClick={handleDelete}
            >
              Request
            </button>
          </div>
        </div>
      </dialog>

    </div>
  );
};

export default FoodDetails;
