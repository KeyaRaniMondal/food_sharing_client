import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/authProviders";
import Swal from "sweetalert2";

const FoodReq = () => {
  const { user } = useContext(AuthContext);
  const [req, setReq] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      fetch(`http://localhost:5000/requested_food?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setReq(data))
        .catch((error) => console.error("Error fetching Requests:", error));
    }
  }, [user]);
  


  return (
    <div className="favorites-container bg-[#e0dae0] p-10">
      <h1 className="text-3xl font-bold text-center my-10">My Requests</h1>
      {req.length === 0 ? (
        <p className="text-center text-[#4b2727]">No requests added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {req.map((food) => (
            <div
              key={food._id}
              className="p-4 border rounded shadow-lg"
              style={{
                backgroundImage: `url(${food.FoodImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h2 className="text-xl font-bold">{food.food_name}</h2>
              <p>{food.notes}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodReq;