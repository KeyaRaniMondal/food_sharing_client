import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../mainLayout";
import Home from "../pages/home";
import AvailableFood from "../pages/Availablefood";
import AddFood from "../pages/addFood";
import MyFood from "../pages/myfood";
import FoodReq from "../pages/foodRequest";
import Register from "../pages/register";
import Login from "../pages/login";

import FoodDetails from "../components/foodDetail";
import PrivateRoute from "./privateRoute";
import UpdateFood from "../components/update";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/availfood",
        element: <AvailableFood />,
        loader: () => fetch("http://localhost:5000/food_collection").then((res) => res.json()),
      },
      {
        path: "/food/:id",
        element: (
          <PrivateRoute>
            <FoodDetails></FoodDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`http://localhost:5000/food_collection/${params.id}`)
      },
      {
        path: "/addFood",
        element: <AddFood></AddFood>,
      },
      {
        path: "/manageFood",
        element:(
          <PrivateRoute>
          <MyFood></MyFood>
          </PrivateRoute>
        )
        
      },
      {
        path:'/update',
        element:<UpdateFood></UpdateFood>
      },
      {
        path: "/foodreq",
        element: <FoodReq></FoodReq>,
        loader: () => fetch("http://localhost:5000/requested_food"),
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
]);

export default router;
