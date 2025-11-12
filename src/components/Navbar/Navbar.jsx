import { use, useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { TbSteeringWheelFilled } from "react-icons/tb";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import Loader from "../Loader";

const Navbar = () => {
  const { user, logout, loading } = use(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/add-car">Add Car</NavLink>
          </li>
          <li>
            <NavLink to="/my-listing">My Listing</NavLink>
          </li>
          <li>
            <NavLink to="/my-booking">My Booking</NavLink>
          </li>
        </>
      )}

      <li>
        <NavLink to="/browse-cars">Browse Car</NavLink>
      </li>
    </>
  );

  return (
    <div className="shadow-sm fixed top-0 left-0 w-full z-50 bg-white">
      <div className="container mx-auto">
        <div className="navbar">
          {/* Left section */}
          <div className="flex items-center navbar-start">
            {/* Hamburger Menu */}
            <div
              className="lg:hidden z-50"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            {/* Logo */}
            <div className="flex items-center gap-1 text-3xl">
              <TbSteeringWheelFilled />
              <Link to="/" className="font-bold">
                Rent <span className="text-primary">Wheels</span>
              </Link>
            </div>
          </div>

          {/* Center section - hidden on small screens */}
          <div className="hidden navbar-center lg:flex">
            <ul className="px-1 menu menu-horizontal">{links}</ul>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4 navbar-end">
            {loading ? null : user ? (
              <div className="relative">
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="cursor-pointer btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full ring ring-warning ring-offset-base-100 ring-offset-2">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="user avatar" />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-gray-400 bg-gray-200 rounded-full">
                        <FaUser />
                      </div>
                    )}
                  </div>
                </div>

                {/* Profile Dropdown */}
                <ul
                  className={`absolute right-0 mt-2 w-64 bg-base-100 rounded-lg shadow-lg p-4 text-right transition-all duration-300 ease-in-out z-30 overflow-hidden ${
                    dropdownOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <li className="font-semibold text-gray-800">
                    {user.displayName || "User Name"}
                  </li>
                  <li className="mb-2 text-sm text-gray-500">{user.email}</li>
                  <hr className="my-2" />

                  {/* Profile Link */}
                  <li>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 transition-all duration-200 rounded-md hover:bg-yellow-100 hover:text-yellow-600"
                    >
                      Profile
                    </Link>
                  </li>

                  {/* Logout Button */}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-3 py-2 font-medium text-right text-red-500 transition-all duration-200 rounded-md hover:bg-red-100 hover:text-red-600"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline btn-warning">
                  Login
                </Link>
                <Link to="/register" className="btn btn-outline btn-success">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu (visible on small screens) */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full bg-gray-800 bg-opacity-80 z-50 ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex justify-end p-4">
          <svg
            onClick={() => setMenuOpen(false)}
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-white cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <ul className="flex flex-col items-center p-4 space-y-4 text-white">
          {links}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
