import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

const Features = () => {
  const foods = useLoaderData();
  const sortedFoods = [...foods]
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 6);

  return (
    <div className=" h-screen mt-72 mx-20">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-5">
      {sortedFoods.length > 0 ? (
        sortedFoods.map((food) => (
          <div
            key={food.id}
            className="h-80 flex flex-col justify-between p-4 transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl rounded-lg overflow-hidden"
            style={{
              backgroundImage: `url(${food.FoodImg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h1 className="text-xl font-bold bg-[#f8f5f5] bg-opacity-10 p-x-10">{food.food_name}</h1>
            <div className="bg-black bg-opacity-50 p-2 rounded-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {/* <h1 className="text-xl font-bold">{food.food_name}</h1> */}
              {/* <p className="text-sm">{food.quantity}</p> */}
            </div>
  
            {/* <div className="text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <p className="text-sm">{food.notes}</p>
            </div> */}
            <Link to={`/food/${food._id}`}>
              <button className="btn btn1 mt-4 bg-green-600 hover:bg-green-700 transition-colors duration-300 text-black">
                See Details
              </button>
            </Link>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No foods available.</p>
      )}
    </div>
  </div>
  

  );
};

export default Features;