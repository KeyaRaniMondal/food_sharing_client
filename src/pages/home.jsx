import { Outlet } from "react-router-dom"
import NavBar from "../components/navbar"

const Home=()=>{
    return(
        <div>
            <div className="">
            <NavBar></NavBar>
            </div>
            <Outlet></Outlet>
        </div>
    )
}
export default Home