import { Outlet } from "react-router-dom"
import NavBar from "../components/navbar"
import Banner from "../components/banner"

const Home=()=>{
    return(
        <div>
            <div className="">
            <NavBar></NavBar>
            <div className="h-80 w-full">
            <Banner></Banner>
            </div>
            </div>
            <Outlet></Outlet>
        </div>
    )
}
export default Home