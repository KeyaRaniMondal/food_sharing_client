import { useContext, useState } from "react";
import { AuthContext } from "../providers/authProviders";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const Login = () => {
  const { signIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
 
  // Google Sign-In
  const provider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    const auth = getAuth();
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast.success("Google sign-in successful!");
        navigate(location?.state?.from?.pathname || "/");
      })
      .catch((err) => {
        toast.error(err.message);
        setError({
          ...error,
          google: "Google sign-in failed. Please try again.",
        });
      })
      .finally(() => setLoading(false));
  };

  // Email-password
const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value;
  const password = form.password.value;
  try {
    setLoading(true);
    await signIn(email, password); 
    toast.success("Login successful!");
    navigate(location?.state?.from?.pathname || "/");
  } catch (error) {
    toast.error(error.message);
    setError({ ...error, email: "Invalid email or password." });
  } finally {
    setLoading(false);
  }
};

  const handleNavigate = () => {
    navigate('/')
  }

  return (
    <div className="hero bg-base-200 min-h-screen mt-16 flex flex-col items-center px-4 md:px-10 lg:px-20">
      <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-center">
        <button onClick={handleNavigate} className="mb-4 md:mb-0 md:mr-20">
          <FaArrowAltCircleLeft className="w-10 h-10" />
        </button>
        <div className="w-full md:w-1/2">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-5xl font-bold mt-10">Login Now !!</h1>
            <p className="mt-4 text-black">Login to get variety of foods...</p>
          </div>
          <div className="card bg-[#2b0a0a] w-full max-w-sm mx-auto shadow-2xl p-6">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label text-white">Email</label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                {error.email && <p className="text-red-500 text-sm mt-2">{error.email}</p>}
              </div>
              <div className="form-control">
                <label className="label text-white">Password</label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn1" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
              </div>
            </form>
            <ToastContainer className='mt-28' />
            <div className="divider text-white -mt-5">OR</div>
            <button onClick={handleGoogleSignIn} className="btn bg-white border border-gray-300 text-black flex items-center justify-center mx-auto w-64" disabled={loading}>
              <FcGoogle className="mr-2" /> Sign in with Google
            </button>
            {error.google && <p className="text-red-500 text-sm mt-2">{error.google}</p>}
            <p className="text-white my-3 text-center">
              Don't have an account? <NavLink to={"/register"} className="text-[#c5942a]">Register</NavLink>
            </p>
          </div>
        </div>
        <button onClick={() => document.getElementById('my_modal_2').showModal()} className="btn1 text-black px-4 py-2 rounded mb-4">
          Show Credentials
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h2 className="text-lg font-bold">If you just want to try features, you can use the information below.</h2>
            <p>Demo Email: tonu@gmail.com</p>
            <p>Demo Password: Tonu123/*</p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default Login;
