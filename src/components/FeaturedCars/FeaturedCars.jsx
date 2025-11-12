import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaCar } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { LuDollarSign } from "react-icons/lu";
import { Link, useNavigate } from "react-router";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const FeaturedCars = ({ featuredCars: initialCars }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredCars, setFeaturedCars] = useState(initialCars);

  useEffect(() => {
    setFeaturedCars(initialCars);
  }, [initialCars]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchTerm) {
        setFeaturedCars(initialCars);
      } else {
        setFeaturedCars(
          initialCars.filter((car) =>
            car.carName.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, initialCars]);

  return (
    <motion.section
      className="py-16 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container px-6 mx-auto">
        <div className="flex items-center justify-center gap-2 mb-8 text-4xl font-extrabold text-gray-800">
          <FaCar className="text-primary" />
          <h2>Featured Cars</h2>
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

        {/* Cars Grid */}
        {featuredCars.length === 0 ? (
          <p className="text-lg text-center text-gray-500">
            No cars found matching "{searchTerm}".
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCars.map((car, index) => (
              <motion.div
                key={car._id}
                className="relative overflow-hidden transition-all duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
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

        {/* Browse All Button */}
        <div className="mt-10 text-center">
          <motion.button
            onClick={() => navigate("/browse-cars")}
            className="bg-primary hover:bg-[#425ad5] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Browse All Cars
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedCars;
