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

    return (
        <div className="max-w-2xl mx-auto p-5 bg-white shadow-lg rounded-lg mt-28">
            <h2 className="text-2xl font-bold text-center mb-4">User Reviews</h2>

            <div className="mt-6">
                {reviews.length === 0 ? (
                    <p className="text-gray-500">No reviews yet. Be the first!</p>
                ) : (
                    <ul className="mt-3 space-y-3">
                        {reviews.map((review, index) => (
                            <li key={index} className="p-3 border border-gray-200 rounded">
                                <p className="text-gray-700">{review.text}</p>
                                <span className="text-sm text-gray-500">— {review.email}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AllReviews;
