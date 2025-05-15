import { NavLink, useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

const Features = () => {
  const foods = useLoaderData();
  const sortedFoods = [...foods]
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 6);

  return (
    <div className="mt-24 px-4 sm:px-6 lg:px-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedFoods.length > 0 ? (
          sortedFoods.map((food) => (
            <div
              key={food.id}
              className="relative h-80 rounded-xl overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105 group"
            >
              <img
                src={food.FoodImg}
                alt={food.food_name}
                className="object-cover w-full h-full group-hover:brightness-90 transition duration-300"
              />

              {/* Bottom overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm text-gray-800 px-4 py-3">
                <h2 className="text-lg font-semibold truncate">{food.food_name}</h2>
                <p className="text-sm text-gray-600">{food.source || "PINCH OF YUM"}</p>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex text-yellow-700 text-lg">
                    <span>★ ★ ★ ★ ☆</span>
                  </div>
                  <div>
                    <Link to={`/food/${food._id}`} className="mt-auto">
                      <button className="btn btn-outline mt-4 font-semibold px-4 py-2 rounded shadow-md">
                        See Details
                      </button>
                    </Link>
                  </div>

                </div>
              </div>
            </div>

          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No foods available.</p>
        )}
      </div>

    </div>
  );
};

export default Features;
