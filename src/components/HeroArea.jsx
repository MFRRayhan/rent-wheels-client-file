import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const carData = [
  {
    carName: "Toyota Corolla Altis",
    description:
      "A reliable sedan offering excellent mileage and comfort for city driving.",
    rentPrice: 3500,
    image: "https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg",
  },
  {
    carName: "Honda Civic 2021",
    description:
      "Stylish and powerful, the Honda Civic is perfect for both short and long drives.",
    rentPrice: 4200,
    image: "https://images.pexels.com/photos/2920064/pexels-photo-2920064.jpeg",
  },
  {
    carName: "Hyundai Sonata",
    description: "Premium sedan with modern features and smooth performance.",
    rentPrice: 5000,
    image:
      "https://images.pexels.com/photos/11952741/pexels-photo-11952741.jpeg",
  },
];

const HeroArea = () => {
  const [text] = useTypewriter({
    words: ["Drive Your Dream Car", "Affordable Rentals", "Premium Services"],
    loop: true,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 2000,
  });

  return (
    <section className="z-10 relative w-full h-[600px] md:h-[750px] mt-16">
      {/* Swiper Slider */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="absolute inset-0 z-0 h-full"
      >
        {carData.map((car, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="relative w-full h-full"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
              <img
                src={car.image}
                alt={car.carName}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Hero Content*/}
      <motion.div
        className="absolute z-20 flex flex-col items-center justify-center text-center px-4 w-[90%] md:w-[60%] h-[50%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-3xl md:text-4xl font-extrabold tracking-wide text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span>{text}</span>
          <Cursor cursorStyle="|" />
        </motion.h1>

        <motion.p
          className="mt-4 text-lg md:text-xl font-light text-gray-200 drop-shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Experience luxury, comfort, and style with our premium rental cars.
        </motion.p>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <Link
            to="/browse-cars"
            className="px-8 py-3 bg-primary hover:bg-[#425ad5] text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300 block"
          >
            Book Now
          </Link>
        </motion.div>
      </motion.div>

      {/* Custom Navigation & Pagination Styling */}
      <style>{`
        /* Navigation Arrows */
        .swiper-button-next,
        .swiper-button-prev {
          color: #ffffff;
          background: rgba(59, 91, 253, 0.6);
          width: 3rem;
          height: 3rem;
          border-radius: 9999px;
          top: 50%;
          transform: translateY(-50%);
          transition: all 0.3s;
          z-index: 20;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(59, 91, 253, 1);
        }

        /* Pagination Bullets */
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.6);
          width: 12px;
          height: 12px;
          z-index: 20; /* ensure above overlay */
        }
        .swiper-pagination-bullet-active {
          background: #3b5bfd;
        }
      `}</style>
    </section>
  );
};

export default HeroArea;
