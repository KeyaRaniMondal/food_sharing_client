import { useContext, useState } from "react";
import { AuthContext } from "../providers/authProviders";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const { loginUser, setUser } = useContext(AuthContext);
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
      const result = await loginUser(email, password);
      toast.success("Login successful!");
      setUser(result);
      navigate(location?.state?.from?.pathname || "/");
    } catch (error) {
      toast.error(error.message);
      setError({ ...error, email: "Invalid email or password." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${login})`,
      }}
      className="hero bg-base-200 min-h-screen"
    >
      <div className="hero-content flex-col">
        <div className="text-center -mt-20">
          <h1 className="text-5xl font-bold">Login Now !!</h1>
          <p className="mt-4 text-black">
            Login to get unlimited access to movies...
          </p>
        </div>
        <div className="card bg-[#684747] w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
              {error.email && (
                <p className="text-red-500 text-sm mt-2">{error.email}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn1" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
          <ToastContainer />
          <div className="divider text-white -mt-5">OR</div>
          <button
            onClick={handleGoogleSignIn}
            className="btn bg-white border border-gray-300 text-black flex items-center justify-center mx-auto w-64"
            disabled={loading}
          >
            <FcGoogle className="mr-2" /> Sign in with Google
          </button>
          {error.google && (
            <p className="text-red-500 text-sm mt-2">{error.google}</p>
          )}
          <p className="text-white my-3 text-center">
            Don't have an account?{" "}
            <NavLink to={"/register"} className="text-[#c5942a]">
              Register
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

