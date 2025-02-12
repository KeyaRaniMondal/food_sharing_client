import { useState } from "react";
import r1 from "../assets/r1.jpg";
import r2 from "../assets/r2.jpg";
import r3 from "../assets/r3.jpg";
import r4 from "../assets/r4.jpg";
import r5 from "../assets/r5.jpg";
import r6 from "../assets/r6.jpg";

const Recipe = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const recipes = [
    {
      id: 1,
      name: "Classic Spaghetti Bolognese",
      description:
        "A timeless Italian classic made with a rich and flavorful meat sauce, served over spaghetti.",
      image: r1,
    },
    {
      id: 2,
      name: "Vegetarian Buddha Bowl",
      description:
        "A colorful and healthy mix of quinoa, roasted veggies, and creamy avocado dressing.",
      image: r2,
    },
    {
      id: 3,
      name: "Grilled Chicken Caesar Salad",
      description:
        "Juicy grilled chicken served atop crisp romaine lettuce with Caesar dressing and croutons.",
      image: r3,
    },
    {
      id: 4,
      name: "Homemade Margherita Pizza",
      description:
        "A simple yet delicious pizza topped with fresh mozzarella, basil, and tomato sauce.",
      image: r4,
    },
    {
      id: 5,
      name: "Thai Green Curry",
      description:
        "A creamy and spicy Thai curry made with green chili paste, coconut milk, and fresh herbs.",
      image: r5,
    },
    {
      id: 6,
      name: "Chocolate Lava Cake",
      description:
        "A decadent dessert with a gooey chocolate center, perfect for any chocolate lover.",
      image: r6,
    },
  ];

  return (
    <div className="mx-20">
      <h1 className="text-3xl font-bold text-center my-5">Recipe List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-5">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="card bg-base-100 shadow-xl transform transition-transform hover:scale-105 hover:shadow-2xl rounded-lg overflow-hidden"
          >
            <figure className="relative group">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-75"
              />
              <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => setSelectedRecipe(recipe)}
                  className="text-white font-semibold"
                >
                  View Recipe
                </button>
              </div>
            </figure>
            <div className="card-body p-5">
              <h2 className="card-title text-lg font-bold text-base-content">{recipe.name}</h2>
              <p className="text-base-content text-sm">{recipe.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.name}
              className="w-full h-56 object-cover rounded-lg"
            />
            <h2 className="text-2xl font-bold mt-4 text-base-content">{selectedRecipe.name}</h2>
            <p className="text-gray-700 mt-2">{selectedRecipe.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipe;

