// src/pages/Register.jsx
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";

function Register() {
  const { createUser, signInWithGoogle, updateUserProfile } =
    useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be at least 6 characters, with uppercase & lowercase letters and a number.",
      });
    }

    try {
      // 1️⃣ Create user with email/password
      const userCredential = await createUser(email, password);

      // 2️⃣ Update Firebase profile
      await updateUserProfile({ displayName: name, photoURL });

      // 3️⃣ Prepare user data for backend
      const newUser = { name, email, photoURL, createdAt: new Date() };

      // 4️⃣ Send to backend
      const response = await fetch(
        "https://rent-wheels-api-server.vercel.app/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        }
      );

      const data = await response.json();
      if (data.message === "User already exists") {
        return Swal.fire("Info", "User already exists", "info");
      }

      Swal.fire("Success", "Registration successful!", "success");
      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      // Prepare user data for backend
      const newUser = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date(),
      };

      const response = await fetch(
        "https://rent-wheels-api-server.vercel.app/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        }
      );

      const data = await response.json();
      if (data.message === "User already exists") {
        return Swal.fire("Info", "User already exists", "info");
      }

      Swal.fire("Success", "Google login successful!", "success");
      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="Photo URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
          />

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
            className="w-full py-3 rounded-full font-semibold text-white bg-primary hover:bg-[#425ad5] transition-all"
          >
            Register
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full gap-2 py-3 font-semibold text-white bg-[#FF8F8F] rounded-full hover:bg-[#FF9F9F] transition-all duration-300"
          >
            <FaGoogle /> Sign up with Google
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
