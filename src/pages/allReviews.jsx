import { useState, useEffect } from "react";
import axios from "axios";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("https://food-sharing-server-hazel.vercel.app/reviews");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const getInitials = (email) => (email ? email.charAt(0).toUpperCase() : "U");

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-green-50 py-16 mt-5">
      <h2 className="text-4xl font-bold text-center  mb-10">
        🌟 What People Say About Us
      </h2>

      <div className="overflow-hidden relative">
        <div
          className="flex space-x-6 animate-scroll whitespace-nowrap px-6"
          style={{
            animation: "scroll 30s linear infinite",
          }}
        >
          {[...reviews, ...reviews].map((review, index) => (
            <div
              key={index}
              className="min-w-[300px] max-w-xs bg-white rounded-xl shadow-md border border-gray-200 p-6 flex-shrink-0 overflow-hidden"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
                  {getInitials(review.email)}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold text-gray-700 break-all">{review.email}</p>
                  <p className="text-xs text-gray-400">Verified User</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-snug break-words max-h-40 overflow-y-auto pr-1">
                “{review.text}”
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default AllReviews;
