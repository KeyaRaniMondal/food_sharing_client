import { useContext,useState } from "react";
import { AuthContext } from '../providers/authProviders'
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const provider = new GoogleAuthProvider();
  const {setUser, updateProfile } = useContext(AuthContext);
  const { createUser } = useContext(AuthContext);
  const navigate=useNavigate()


  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  // Google Sign-In Handler
  const handleGoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        setError({ ...error, google: "Google sign-in failed. Please try again." });
      });
  };


  //email & password
  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photoURL.value;
  
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must have at least 1 uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must have at least 1 lowercase letter.");
      return;
    }
  
    try {

      const result = await createUser(email, password, name, photoURL);
      const firebaseUser = result.user;
  
      const newUser = {
        name,
        email,
        photoURL: firebaseUser.photoURL || "",
        firebaseUID: firebaseUser.uid, 
      };
  
      const response = await fetch("https://food-sharing-server-hazel.vercel.app/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
  
      const mongoResult = await response.json();
  
      if (response.ok) {
        toast.success("User registered successfully!");
       // console.log("MongoDB User:", mongoResult);
        navigate("/");
      } else {
        toast.error("Failed to save user to database.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  
  return (
    <div
      style={{
        // backgroundImage: `url(${})`,
      }}
      className="hero bg-base-200 min-h-screen mt-16"
    >
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white">Register First !!</h1>
          <p className="mt-4 text-white">
            You need to register first to get unlimited recipies...
          </p>
        </div>
        <div className="card bg-[#2b0a0a] w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Photo URL</span>
              </label>
              <input
                type="text"
                name="photoURL"
                placeholder="Enter photo URL"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn1">Register</button>
            </div>

          </form>
          <ToastContainer />
        <div className="divider -mt-5">OR</div>

        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white border border-gray-300 text-black flex items-center justify-center mx-auto w-72 -mt-5"
        >
          <FcGoogle className="mr-2" /> Sign in with Google
        </button>
        {error.google && <p className="text-red-500 text-sm mt-2">{error.google}</p>}
        <p className="text-white pb-5 text-center">
              Already have an account?{" "}
              <NavLink to={"/login"} className="text-[#c5942a]">
                Login
              </NavLink>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
