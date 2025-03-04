import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./providers/authProviders";
// import Loading from "./components/loading";

const PrivateRoute=({children})=>{
const {user,loading}=useContext(AuthContext);

const location=useLocation();
// if(loading){
//     return <Loading></Loading>
// }
if(user && user?.email){
    return children
}
else
return <Navigate to={'/login'}></Navigate>
}
export default PrivateRoute

//state={location.pathname} 