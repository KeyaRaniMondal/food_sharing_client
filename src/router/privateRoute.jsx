import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
// import Loading from "./components/loading";
import { AuthContext } from "../providers/authProviders";

const PrivateRoute=({children})=>{
const {user}=useContext(AuthContext);

const location=useLocation();
// if(loading){
//     return <Loading></Loading>
// }
if(user && user?.email){
    return children
}
return <Navigate state={location.pathname} to={'/login'}></Navigate>
}
export default PrivateRoute