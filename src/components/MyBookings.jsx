import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaCar } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { GrUserManager } from "react-icons/gr";
import { LuDollarSign } from "react-icons/lu";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings
  useEffect(() => {
    if (!user?.email) return;

    const fetchBookings = async () => {
      try {
        const { data } = await axiosSecure.get(`/bookings?email=${user.email}`);
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, axiosSecure]);

  // Delete booking + update car status
  const handleDelete = async (bookingId, carId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel booking!",
    });

    if (!result.isConfirmed) return;

    try {
      // Delete booking
      const { data } = await axiosSecure.delete(`/bookings/${bookingId}`);

      if (data.success) {
        setBookings(bookings.filter((b) => b._id !== bookingId));

        // Update car status
        await axiosSecure.patch(`/cars/${carId}`, { status: "available" });

        Swal.fire(
          "Cancelled!",
          "Your booking has been cancelled and car is now available.",
          "success"
        );
      } else {
        Swal.fire("Error", "Failed to cancel booking", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading your bookings...
        </p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 mt-16">
      <div className="flex items-center justify-center gap-2 mb-8 text-4xl font-extrabold text-gray-800">
        <FaCar className="text-primary" />
        <h2>My Bookings</h2>
      </div>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-6 border border-dashed border-gray-300 rounded-2xl bg-linear-to-b from-gray-50 to-white shadow-sm">
          <div className="flex items-center justify-center w-16 h-16 mb-4 bg-purple-100 text-primary rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0 3.75h.008v.008H12v-.008zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Bookings Found
          </h3>
          <p className="text-gray-500 text-center max-w-md">
            It looks like you haven’t made any bookings yet. Start exploring
            cars and make your first reservation today!
          </p>

          <button
            onClick={() => navigate("/browse-cars")}
            className="mt-6 px-5 py-2.5 text-sm font-medium text-white bg-primary hover:bg-[#425adf] rounded-lg transition-all duration-300"
          >
            Browse Cars
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking) => (
            <motion.div
              key={booking._id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all p-6 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={booking.image}
                alt={booking.carName}
                className="w-full h-56 md:h-64 object-cover rounded-2xl mb-5 transition-transform duration-500 hover:scale-105"
              />
              <h3 className="font-bold text-2xl mb-2 text-gray-900">
                {booking.carName}
              </h3>

              <div className="mb-4 space-y-2 text-gray-700">
                <p className="flex items-center gap-2">
                  <LuDollarSign className="text-primary" /> BDT.{" "}
                  {booking.rentPrice} /-
                </p>
                <p className="flex items-center gap-2">
                  <BsFillFuelPumpFill className="text-primary" />{" "}
                  {booking.category}
                </p>
                <p className="flex items-center gap-2">
                  <GrUserManager className="text-primary" />{" "}
                  {booking.providerName}
                </p>
                <p className="flex items-center gap-2">
                  <GoLocation className="text-primary" /> {booking.location}
                </p>
              </div>

              <div className="mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    booking.status === "booked"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {booking.status.toUpperCase()}
                </span>
              </div>

              <button
                className="cursor-pointer mt-auto bg-red-500 text-white font-semibold py-3 rounded-full shadow-md hover:shadow-xl transition-all"
                onClick={() => handleDelete(booking._id, booking.carId)}
              >
                Cancel Booking
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
