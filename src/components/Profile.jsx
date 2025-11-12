import { use, useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import { AuthContext } from "../contexts/AuthContext";

const Profile = () => {
  const { user, updateUserProfile } = use(AuthContext);
  const navigate = useNavigate();
  const alertShownRef = useRef(false);

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user && !alertShownRef.current) {
        Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "You need to login first to access your profile.",
        }).then(() => navigate("/login"));
        alertShownRef.current = true;
      } else if (user) {
        setName(user.displayName || "");
        setPhoto(user.photoURL || "");
      }
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  const handleUpdate = async () => {
    if (!name.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Name cannot be empty",
      });
    }

    setUpdating(true);
    try {
      await updateUserProfile({ displayName: name, photoURL: photo });
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Profile updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loader />;
  if (!user) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-primary">
          My Profile
        </h2>

        {/* Profile Image */}
        {photo ? (
          <img
            src={photo}
            alt={name}
            className="object-cover w-24 h-24 mx-auto mb-6 rounded-full shadow-md"
          />
        ) : (
          <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 text-4xl text-gray-400 bg-gray-200 rounded-full shadow-md">
            <FaUser />
          </div>
        )}

        {/* Name */}
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
        />

        {/* Photo URL */}
        <label className="block mb-1 font-medium">Photo URL</label>
        <input
          type="text"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
        />

        {/* Email (disabled) */}
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          value={user?.email}
          disabled
          className="w-full p-3 mb-6 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
        />

        {/* Update Button */}
        <button
          onClick={handleUpdate}
          disabled={updating}
          className={`w-full py-3 rounded-full font-semibold text-white ${
            updating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-[#425ad5]"
          } transition-colors duration-300`}
        >
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
