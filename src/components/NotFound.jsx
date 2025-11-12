import { TbSteeringWheelFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-linear-to-b from-gray-50 to-gray-100 px-6 relative overflow-hidden">
      {/* Animated Spinning + Bouncing Icon */}
      <div className="flex items-center justify-center mb-6 text-primary text-6xl animate-bounce">
        <TbSteeringWheelFilled className="animate-spin-slow" />
      </div>

      {/* 404 Heading */}
      <h1 className="text-[120px] font-extrabold text-gray-900 leading-none tracking-tight drop-shadow-sm">
        404
      </h1>

      {/* Message */}
      <p className="text-lg text-gray-600 mt-2">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-8 inline-block bg-primary text-white font-medium px-8 py-3 rounded-full shadow-md hover:bg-[#425ad5] hover:shadow-lg transition-all duration-300"
      >
        Back to Home
      </Link>

      {/* Decorative Blurs */}
      <div className="absolute w-72 h-72 bg-primary/10 rounded-full blur-3xl top-24 left-1/3 -z-10"></div>
      <div className="absolute w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl bottom-20 right-1/3 -z-10"></div>
    </div>
  );
};

export default NotFound;
