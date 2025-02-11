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
import Error from "../pages/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("https://food-sharing-server-hazel.vercel.app/food_collection"), 
      },
      {
        path: "/availfood",
        element: <AvailableFood />,
        loader: () => fetch("https://food-sharing-server-hazel.vercel.app/food_collection").then((res) => res.json()),
      },
      {
        path: "/food/:id",
        element: (
          <PrivateRoute>
            <FoodDetails></FoodDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`https://food-sharing-server-hazel.vercel.app/food_collection/${params.id}`,{credentials:'include'})
      },
      {
        path: "/addFood",
        element: <AddFood></AddFood>,
      },
      {
        path: "/manageFood",
        element:
            <MyFood></MyFood>


      },
      {
        path: "/food/update/:id",
        element: (
          <PrivateRoute>
            <UpdateFood></UpdateFood>
          </PrivateRoute>),
        loader: ({ params }) =>
          fetch(`https://food-sharing-server-hazel.vercel.app/food_collection/${params.id}`,{credentials:'include'}),
      },
      {
        path: "/foodreq",
        element: <FoodReq></FoodReq>,
        loader: () => fetch("https://food-sharing-server-hazel.vercel.app/requested_food",{credentials:'include'}),
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
  {
    path:'*',
    element:<Error></Error>
  }
]);

export default router;
