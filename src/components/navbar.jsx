import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../providers/authProviders";

const NavBar = () => {

    const {user}=useContext(AuthContext)
    const links = (
        <>
          <NavLink to="/" className="block lg:inline-block px-3 py-2 hover:text-[#d6564c] ">
            Home
          </NavLink>
          <NavLink to="/availfood" className="block lg:inline-block px-3 py-2 hover:text-gray-300 ">
           Available Foods
          </NavLink>
          {user ? (
            <>
              <NavLink to="/addFood" className="block lg:inline-block px-3 py-2 hover:text-gray-300 ">
                Add Food
              </NavLink>
              <NavLink to="/manageFood" className="block lg:inline-block px-3 py-2 hover:text-gray-300 ">
                Manage My Foods
              </NavLink>
              <NavLink to="/foodreq" className="block lg:inline-block px-3 py-2 hover:text-gray-300 ">
                My Food Request
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login" className="block lg:inline-block px-3 py-2 hover:text-gray-300 ">
                Login
              </NavLink>
              <NavLink to="/register" className="block lg:inline-block px-3 py-2 hover:text-gray-300 ">
                Register
              </NavLink>
            </>
          )}
        </>
      );

return(
    <div className="navbar bg-black text-white">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">SAVOURY</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>
)
}
export default NavBar