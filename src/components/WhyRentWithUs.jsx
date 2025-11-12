import { motion } from "framer-motion";
import { FaCar, FaDollarSign, FaHandshake, FaHeadset } from "react-icons/fa";

const WhyRentWithUs = () => {
  const benefits = [
    {
      icon: <FaCar className="text-4xl text-blue-600 mb-4" />,
      title: "Easy Booking",
      desc: "Book your favorite car effortlessly with our simple and user-friendly platform.",
    },
    {
      icon: <FaDollarSign className="text-4xl text-blue-600 mb-4" />,
      title: "Affordable Rates",
      desc: "Enjoy the best car rental deals at competitive prices with no hidden charges.",
    },
    {
      icon: <FaHandshake className="text-4xl text-blue-600 mb-4" />,
      title: "Trusted Providers",
      desc: "We work only with verified car owners to ensure a safe and reliable experience.",
    },
    {
      icon: <FaHeadset className="text-4xl text-blue-600 mb-4" />,
      title: "24/7 Support",
      desc: "Our dedicated support team is available round the clock to assist you anytime.",
    },
  ];

  return (
    <motion.section
      className="py-16 bg-gray-50"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
          Why Rent With Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex flex-col items-center">
                {item.icon}
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default WhyRentWithUs;
