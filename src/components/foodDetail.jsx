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

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the food and add it to your requests.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete and request it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete from available foods
        fetch(`http://localhost:5000/food_collection/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              // Add to requested foods
              fetch("http://localhost:5000/requested_food", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  _id,
                  FoodImg,
                  food_name,
                  quantity,
                  location,
                  time,
                  notes,
                  status,
                  email: user?.email, 
                  name: user?.displayName || "Anonymous",


                }),
              })
                .then((res) => res.json())
                .then((postData) => {
                  if (postData.insertedId) {
                    Swal.fire({
                      title: "Deleted and Requested!",
                      text: "Food added to your requests.",
                      icon: "success",
                      timer: 2000,
                    });
                    navigate("/foodreq");
                  } else {
                    Swal.fire({
                      title: "Failed!",
                      text: "Failed to add the food to requests.",
                      icon: "error",
                    });
                  }
                })
                .catch((error) => {
                  console.error("Error adding food to requests:", error);
                  Swal.fire({
                    title: "Error!",
                    text: "An error occurred while adding the food to requests.",
                    icon: "error",
                  });
                });
            } else {
              Swal.fire({
                title: "Failed!",
                text: "Failed to delete the food. Please try again.",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting food:", error);
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
      <label htmlFor="my_modal_7" className="btn bg-[#d7da45] mt-5">Request Details</label>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
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
        <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
      </div>
    </div>
  );
};

export default FoodDetails;
