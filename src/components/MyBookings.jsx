import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaCar } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { GrUserManager } from "react-icons/gr";
import { LuDollarSign } from "react-icons/lu";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchBookings = async () => {
      try {
        // Firebase token পাওয়া
        const token = await user.getIdToken();

        const res = await fetch(
          `http://localhost:3000/bookings?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await res.json();
        setBookings(data); // data অবশ্যই array হবে
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const handleDelete = (bookingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel booking!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = await user.getIdToken();
          const res = await fetch(
            `http://localhost:3000/bookings/${bookingId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await res.json();

          if (data.success) {
            setBookings(bookings.filter((b) => b._id !== bookingId));
            Swal.fire(
              "Cancelled!",
              "Your booking has been cancelled.",
              "success"
            );
          } else {
            Swal.fire(
              "Error",
              data.message || "Failed to cancel booking",
              "error"
            );
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "Something went wrong", "error");
        }
      }
    });
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
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-center gap-2 mb-8 text-4xl font-extrabold text-gray-800">
        <FaCar className="text-primary" />
        <h2>My Bookings</h2>
      </div>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-gray-300 rounded-2xl bg-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7h18M3 12h18M3 17h18"
            />
          </svg>
          <p className="text-gray-500 text-lg font-medium">
            You have no bookings yet.
          </p>
          <p className="text-gray-400 mt-2">
            Start exploring cars and make your first booking today.
          </p>
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
              <p className="text-gray-600 mb-3 text-sm md:text-base">
                {booking.description}
              </p>

              <div className="mb-4 space-y-2 text-gray-700">
                <p className="flex items-center gap-2 mb-1 text-gray-600">
                  <LuDollarSign className="text-primary" /> Rent per day:{" "}
                  <strong className="text-gray-800">
                    BDT. {booking.rentPrice} /-
                  </strong>
                </p>
                <p className="flex items-center gap-2 mb-1 text-gray-600">
                  <BsFillFuelPumpFill className="text-primary" /> Model:{" "}
                  <span className="font-medium">{booking.category}</span>
                </p>
                <p className="flex items-center gap-2 mb-1 text-gray-600">
                  <GrUserManager className="text-primary" /> Provider:{" "}
                  <span className="font-medium">{booking.providerName}</span>
                </p>
                <p className="flex items-center gap-2">
                  <GoLocation className="text-primary" />{" "}
                  <span className="font-semibold">Location:</span>{" "}
                  {booking.location}
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

              <p className="mb-4 text-gray-400 text-sm">
                Posted on: {new Date(booking.postedAt).toLocaleDateString()}
              </p>

              <button
                className="cursor-pointer mt-auto bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-full shadow-md hover:shadow-xl transition-all"
                onClick={() => handleDelete(booking._id)}
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
