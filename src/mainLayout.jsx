import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar";
import Footer from "./pages/footer";


const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
            <NavBar></NavBar>
      <div className="flex-grow">
        <Outlet />
      </div>
<Footer></Footer>
    </div>
  );
};

export default MainLayout;
