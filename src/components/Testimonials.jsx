import { motion } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const testimonials = [
  {
    name: "Sakib Mahmud",
    location: "Dhaka",
    img: "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid&w=740&q=80",
    review: "RentWheels made my car rental experience seamless.",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    location: "Chattogram",
    img: "https://img.freepik.com/free-vector/smiling-woman-with-braided-hair_1308-174961.jpg?semt=ais_hybrid&w=740&q=80",
    review:
      "Affordable rates and excellent customer service. Will definitely rent again!",
    rating: 4,
  },
  {
    name: "Junaid Ahmed",
    location: "Dhaka",
    img: "https://img.freepik.com/free-vector/smiling-redhaired-boy-illustration_1308-176664.jpg?semt=ais_hybrid&w=740&q=80",
    review:
      "The cars were in perfect condition and the booking was super easy.",
    rating: 5,
  },
  {
    name: "Tania Rahman",
    location: "Sylhet",
    img: "https://img.freepik.com/free-vector/woman-floral-traditional-costume_1308-176159.jpg?semt=ais_hybrid&w=740&q=80",
    review:
      "Excellent experience! The car selection, booking process smooth & quick.",
    rating: 5,
  },
  {
    name: "Rafiq Islam",
    location: "Khulna",
    img: "https://static.vecteezy.com/system/resources/previews/055/285/295/non_2x/cartoon-boy-with-glasses-split-colored-sweater-illustration-vector.jpg",
    review: "Highly recommend. Great customer service & well-maintained cars.",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <motion.section
      className="py-16 bg-gray-50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">
          What Our Customers Say
        </h2>

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          loop
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 p-6 flex flex-col items-center min-h-[420px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {/* Profile Image */}
                <div className="w-24 h-24 mb-4 rounded-full overflow-hidden shadow-md">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Quote Icon */}
                <FaQuoteLeft className="text-3xl text-primary mb-4" />

                {/* Review Text */}
                <p className="text-gray-600 mb-4 text-center font-medium flex-1">
                  "{t.review}"
                </p>

                {/* Rating Stars */}
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < t.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Customer Name & Location */}
                <h3 className="font-semibold text-gray-800 text-lg">
                  {t.name}
                </h3>
                <p className="text-gray-500 text-sm">{t.location}</p>

                {/* Ending Quote Icon */}
                <FaQuoteRight className="text-3xl text-primary mt-4" />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
};

export default Testimonials;
