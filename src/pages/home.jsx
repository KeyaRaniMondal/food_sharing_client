import { Outlet } from "react-router-dom"
import NavBar from "../components/navbar"
import Banner from "../components/banner"

const Home=()=>{
    return(
        <div>
            <div className="">

            <div className="h-80 w-full">
            <Banner></Banner>
            </div>
            </div>

        </div>
    )
}
export default Home