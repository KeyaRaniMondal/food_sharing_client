import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar";


const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
            <NavBar></NavBar>
      <div className="flex-grow">
        <Outlet />
      </div>

    </div>
  );
};

export default MainLayout;
