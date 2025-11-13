import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";

function Login() {
  const { signInUser, signInWithGoogle, forgotPassword } =
    useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInUser(email, password);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have logged in successfully!",
      });
      navigate(location.state?.from?.pathname || "/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      Swal.fire({
        icon: "success",
        title: "Google Login Successful",
        text: "Welcome via Google login!",
      });
      navigate(location.state?.from?.pathname || "/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await forgotPassword(forgotPasswordEmail);
      Swal.fire({
        icon: "success",
        title: "Password Reset Link Sent",
        text: "Please check your email for the password reset link.",
      });
      setShowForgotPassword(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>

        {/* Forgot Password Form */}
        {showForgotPassword ? (
          <div>
            <h3 className="mb-4 text-xl font-semibold text-center">
              Forgot Password
            </h3>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleForgotPassword}
              className="w-full py-3 font-semibold text-white rounded-full bg-primary hover:bg-[#425ad5]"
            >
              Send Password Reset Link
            </button>
            <p
              onClick={() => setShowForgotPassword(false)}
              className="mt-4 text-center cursor-pointer text-primary hover:underline"
            >
              Back to Login
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
              />
              <span
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute text-xl transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
              >
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full font-semibold text-white bg-primary hover:bg-[#425ad5]"
            >
              Login
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full gap-2 py-3 font-semibold text-white bg-[#FF8F8F] rounded-full hover:bg-[#FF9F9F]"
            >
              <FaGoogle />
              Sign in with Google
            </button>
          </form>
        )}

        {!showForgotPassword && (
          <p className="mt-4 text-center">
            Forgot your password?{" "}
            <span
              onClick={() => setShowForgotPassword(true)}
              className="cursor-pointer text-primary hover:underline"
            >
              Reset it here
            </span>
          </p>
        )}

        <p className="mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
