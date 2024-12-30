import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../providers/authProviders";

const NavBar = () => {

    const { user, logOut } = useContext(AuthContext)
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

    return (
        <div className="navbar bg-black text-white px-5 lg:px-20 py-3">
                  <div className="flex-1 mr-20">
    <a className="btn btn-ghost text-xl">SAVOURY</a>
  </div>
      <div className="hidden lg:flex justify-between items-center w-full ">

                <div className="space-x-5 text-white font-bold">{links}</div>
                {user ? (
                    <div className="ml-20 dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img
                                    alt={user.displayName || "User Avatar"}
                                    src={user.photoURL || "https://via.placeholder.com/40"}
                                    className="rounded-full"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <a className="justify-between">
                                    {user.displayName || "Profile"}
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li onClick={logOut}>
                                <a>Logout</a>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <img
                        alt="User Avatar"
                        src="https://via.placeholder.com/40"
                        className="rounded-full"
                    />
                )}
            </div>

            <div className="lg:hidden flex items-center">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black"
                    >
                        {links}
                        {user && (
                            <li onClick={logOut}>
                                <a className="text-black">Logout</a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>

    );
};
export default NavBar





