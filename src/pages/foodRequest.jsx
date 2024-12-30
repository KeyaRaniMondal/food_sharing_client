import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/authProviders";
import Swal from "sweetalert2";

const FoodReq = () => {
  const { user } = useContext(AuthContext);
  const [req, setReq] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      fetch(`https://food-sharing-server-hazel.vercel.app/requested_food?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setReq(data))
        .catch((error) => console.error("Error fetching Requests:", error));
    }
  }, [user]);

  return (
    <div className="favorites-container bg-[#e0dae0] p-10">
      <h1 className="text-3xl font-bold text-center my-10">My Requests</h1>

      <div className="overflow-x-auto">
        <table className="table">
          {/* Table Header */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Donor Name</th>
              <th>Food Name</th>
              <th>Pickup Location</th>
              <th>Expire Date</th>
              <th>Current Date</th>
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
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </td>
                  <td>
                    <img
                      src={user.photoURL || "https://via.placeholder.com/50"}
                      alt="User Photo"
                      className="w-10 h-10 rounded-full"
                    />
                  </td>

                  <td>
                    <img
                      src={food.FoodImg || "https://via.placeholder.com/50"}
                      alt="food Photo"
                      className="w-10 h-10 rounded-md"
                    />
                  </td>
                  <td>{food.location}</td>
                  <td>{new Date(food.time).toLocaleString()}</td>
                  <td>{new Date().toLocaleString()}</td>
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
                         style="width: 300px; height: 200px; border-radius: 8px; margin-top: 10px; margin-left:64"
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
