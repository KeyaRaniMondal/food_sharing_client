import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/authProviders";
import Swal from "sweetalert2";

const FoodReq = () => {
  const { user } = useContext(AuthContext);
  const [req, setReq] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.email) {
      setLoading(true); // Show loading state
      fetch(`https://food-sharing-server-hazel.vercel.app/requested_food?email=${user.email}`, { credentials: "include" })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch food requests.");
          }
          return res.json();
        })
        .then((data) => {
          setReq(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching requests:", error);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="text-center my-10">
        <h2 className="text-2xl font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="favorites-container bg-[#e0dae0] p-10">
      <h1 className="text-3xl font-bold text-center my-10">My Requests</h1>

      <div className="overflow-x-auto">
        <table className="table">
          {/* Table Header */}
          <thead>
            <tr>
              <th></th>
              <th>Donor Name</th>
              <th>Food Image</th>
              <th>Pickup Location</th>
              <th>Expire Date</th>
              <th>Requested Date</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {req.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-[#4b2727]">
                  No requests added yet.
                </td>
              </tr>
            ) : (
              req.map((food) => (
                <tr key={food._id}>
                  <td>
                    <input type="checkbox" className="checkbox" />
                  </td>
                  <td>{food.donorName || "Unknown"}</td>
                  <td>
                    <img
                      src={food.FoodImg || "https://via.placeholder.com/50"}
                      alt="Food"
                      className="w-10 h-10 rounded-md"
                    />
                  </td>
                  <td>{food.location || "Not provided"}</td>
                  <td>{new Date(food.time).toLocaleString()}</td>
                  <td>{new Date(food.requestedDate).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() =>
                        Swal.fire({
                          title: "Details",
                          html: `
                          <div>
                            <img
                              src="${food.FoodImg || "https://via.placeholder.com/50"}"
                              alt="Food Photo"
                              style="width: 300px; height: 200px; border-radius: 8px; margin-top: 10px;"
                            />
                            <h2>${food.food_name}</h2>
                            <p>${food.notes}</p>
                          </div>
                        `,
                          icon: "info",
                        })
                      }
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodReq;
