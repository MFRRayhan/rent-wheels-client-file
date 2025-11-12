import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaCar } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { LuDollarSign } from "react-icons/lu";
import { Link, useLoaderData } from "react-router";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const BrowseCars = () => {
  const cars = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCars, setFilteredCars] = useState(cars);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchTerm) {
        setFilteredCars(cars);
      } else {
        setFilteredCars(
          cars.filter((car) =>
            car.carName.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, cars]);

  return (
    <motion.div
      className="min-h-screen py-12 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container px-6 mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-8 text-4xl font-extrabold text-gray-800">
          <FaCar className="text-primary" />
          <h2>Browse Cars</h2>
        </div>

        {/* Search Input */}
        <div className="flex justify-center mb-10">
          <motion.input
            type="text"
            placeholder="Search cars by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary shadow-md transition-all duration-300"
            whileFocus={{ scale: 1.02 }}
          />
        </div>

        {/* Empty State */}
        {filteredCars.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-gray-300 rounded-xl bg-white shadow-md">
            <FaCar className="text-6xl text-primary mb-4 animate-bounce" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              No cars found
            </h3>
            <p className="text-gray-500 text-center max-w-sm">
              Sorry, we couldn't find any cars matching "{searchTerm}". Try
              adjusting your search.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCars.map((car, index) => (
              <motion.div
                key={car._id}
                className="relative overflow-hidden transition-all duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }} // faster trigger
                transition={{ delay: index * 0.05, duration: 0.3 }} // faster animation
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.carName}
                    className="object-cover w-full transition-transform duration-500 h-80 group-hover:scale-110"
                    data-tooltip-id={`tooltip-${car._id}`}
                    data-tooltip-content={`Rent: ৳${car.rentPrice} / day`}
                  />
                  <span className="absolute px-4 py-2 font-semibold text-white uppercase rounded-full shadow-md top-3 right-3 bg-primary text-md">
                    {car.status || "Available"}
                  </span>
                </div>

                {/* Car Info */}
                <div className="p-5">
                  <h3 className="mb-2 text-xl font-semibold text-gray-800">
                    {car.carName}
                  </h3>
                  <p className="flex items-center gap-2 mb-1 text-gray-600">
                    <LuDollarSign className="text-primary" />
                    Rent per day:{" "}
                    <strong className="text-gray-800">
                      BDT. {car.rentPrice} /-
                    </strong>
                  </p>
                  <p className="flex items-center gap-2 mb-1 text-gray-600">
                    <BsFillFuelPumpFill className="text-primary" /> Category:{" "}
                    <span className="font-medium">{car.category}</span>
                  </p>
                  <p className="flex items-center gap-2 mb-1 text-gray-600">
                    <GrUserManager className="text-primary" /> Provider:{" "}
                    <span className="font-medium">{car.providerName}</span>
                  </p>
                  <Link
                    to={`/car/${car._id}`}
                    className="mt-4 inline-block w-full text-center bg-primary text-white py-2.5 rounded-full hover:bg-[#425ad5] transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>

                <ReactTooltip id={`tooltip-${car._id}`} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BrowseCars;
