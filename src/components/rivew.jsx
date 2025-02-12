import { useState } from "react";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [email, setEmail] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !reviewText) {
      setError("Both email and review are required!");
      return;
    }

    const newReview = { email, text: reviewText };
    setReviews([...reviews, newReview]);

    // Clear fields
    setEmail("");
    setReviewText("");
    setError("");
  };

  return (
    <div className="max-w-2xl mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Leave a Review</h2>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Submit Review
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">User Reviews</h3>
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

export default ReviewSection;
