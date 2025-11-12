import axios from "axios";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";

const CarDetails = () => {
  const car = useLoaderData();
  const { user } = useContext(AuthContext);
  const [carStatus, setCarStatus] = useState(car.status);

  const handleBooking = async () => {
    if (!user) {
      Swal.fire("Error", "You must be logged in to book a car.", "error");
      return;
    }

    if (carStatus === "booked") {
      Swal.fire("Booked", "This car is already booked.", "info");
      return;
    }

    try {
      const token = await user.getIdToken();

      const bookingData = {
        carId: car._id,
        carName: car.carName,
        description: car.description,
        category: car.category,
        rentPrice: car.rentPrice,
        location: car.location,
        image: car.image,
        providerName: car.providerName,
        providerEmail: car.providerEmail,
        userName: user.name,
        userEmail: user.email,
        status: "booked",
        postedAt: car.postedAt,
      };

      // POST booking with token in headers
      const { data } = await axios.post(
        "https://rent-wheels-api-server.vercel.app/bookings",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.insertedId) {
        setCarStatus("booked");

        // Update car status in backend
        await axios.patch(
          `https://rent-wheels-api-server.vercel.app/cars/${car._id}`,
          { status: "booked" },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        Swal.fire(
          "Booked!",
          `You have successfully booked ${car.carName}.`,
          "success"
        );
      } else {
        Swal.fire("Error", "Failed to book the car.", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        error.response?.data?.message ||
          "Unauthorized or something went wrong.",
        "error"
      );
    }
  };

  // Safe date handling
  const postedDate = car.postedAt
    ? new Date(car.postedAt)
    : car._id
    ? new Date(parseInt(car._id.substring(0, 8), 16) * 1000)
    : null;

  return (
    <motion.div
      className="max-w-6xl mx-auto px-6 py-12 mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Car Image */}
      <motion.div
        className="rounded-3xl overflow-hidden shadow-2xl mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={car.image}
          alt={car.carName}
          className="w-full h-[400px] md:h-[500px] object-cover object-center transition-transform duration-500 hover:scale-105"
        />
      </motion.div>

      {/* Car Details */}
      <motion.div
        className="bg-linear-to-b from-white to-gray-50 shadow-xl rounded-3xl p-8 md:p-10 space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          {car.carName}
        </h2>
        <p className="text-gray-700 text-lg md:text-xl">{car.description}</p>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="space-y-3">
            <p>
              <span className="font-semibold text-gray-800">Category:</span>{" "}
              {car.category}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Location:</span>{" "}
              {car.location}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Status:</span>{" "}
              <span
                className={`px-3 py-1 rounded-full capitalize font-semibold text-sm ${
                  carStatus === "available"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {carStatus}
              </span>
            </p>
          </div>

          <div className="space-y-3">
            <p>
              <span className="font-semibold text-gray-800">Rent Price:</span>{" "}
              BDT. {car.rentPrice} / day
            </p>
            <p>
              <span className="font-semibold text-gray-800">
                Provider Name:
              </span>{" "}
              {car.providerName}
            </p>
            <p>
              <span className="font-semibold text-gray-800">
                Provider Email:
              </span>{" "}
              {car.providerEmail}
            </p>
          </div>
        </div>

        <div className="mt-6 text-gray-500 text-sm">
          Posted At: {postedDate ? postedDate.toLocaleDateString() : "N/A"}
        </div>

        <div className="mt-8">
          <button
            onClick={handleBooking}
            disabled={carStatus === "booked"}
            className={`px-8 py-3 rounded-full text-white font-semibold text-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-xl ${
              carStatus === "available"
                ? "bg-linear-to-r from-blue-600 to-indigo-500 hover:from-indigo-500 hover:to-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {carStatus === "available" ? "Book Now" : "Booked"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CarDetails;
