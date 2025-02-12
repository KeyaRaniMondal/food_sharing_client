import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReviewSection = () => {
    const [reviews, setReviews] = useState([]);
    const [email, setEmail] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const navigate=useNavigate()
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !reviewText) {
            setError("Both email and review are required!");
            return;
        }

        const newReview = { email, text: reviewText };
        setLoading(true);

        try {
            const response = await axios.post("https://food-sharing-server-hazel.vercel.app/reviews", newReview);
            setReviews([...reviews, response.data]);
            setEmail("");
            setReviewText("");
            setError("");
            setShowForm(false);
        } catch (error) {
            console.error("Error submitting review:", error);
            setError("Failed to submit review.");
        } finally {
            setLoading(false);
        }
    };

    const handleNavigate=()=>{
        navigate('/review')
    }
    return (
        <div className="max-w-2xl mx-auto p-5 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Reviews</h2>
            <p>Here You can give your opinion as review and we would try our best to improve it.</p>
            <div className="flex justify-around mt-5">
            {!showForm && (
                <button
                    onClick={() => setShowForm(true)}
                    className="btn1 text-black px-4 py-2 rounded mb-4 "
                >
                    Leave a Review
                </button>
            )}

            <button
                    onClick={handleNavigate}
                    className="btn2 text-white px-4 py-2 rounded mb-4 ml-10 "
                >
                    Show Reviews
                </button>
            </div>
            
            {showForm && (
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h3 className="text-lg font-semibold mb-2">Write Your Review</h3>
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="p-2 border border-gray-300 rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Write your review..."
                            className="p-2 border border-gray-300 rounded h-24"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            required
                        ></textarea>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="btn btn-outline text-black p-2 rounded  transition"
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit Review"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="bg-[#c41111] text-white p-2 rounded hover:bg-red-600 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

        </div>
    );
};

export default ReviewSection;
