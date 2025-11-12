import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { Link } from "react-router";

export default function Footer({ siteName = "RentWheels" }) {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Logo & short */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-xl font-semibold leading-tight">
                {siteName}
              </h3>
              <p className="text-sm text-gray-400">
                Trusted car rentals • Secure bookings
              </p>
            </div>
          </div>

          <div className="mt-2 text-sm text-gray-300">
            <p className="flex items-center gap-2">
              <HiOutlinePhone className="w-5 h-5 text-gray-400" />
              <span>+880 1711 000 001</span>
            </p>
            <p className="flex items-center gap-2 mt-1">
              <HiOutlineMail className="w-5 h-5 text-gray-400" />
              <span>support@rentwheels.com</span>
            </p>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <a
              href="#"
              aria-label="facebook"
              className="p-2 rounded-md hover:bg-gray-800 transition"
            >
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="twitter"
              className="p-2 rounded-md hover:bg-gray-800 transition"
            >
              <FaXTwitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="instagram"
              className="p-2 rounded-md hover:bg-gray-800 transition"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="linkedin"
              className="p-2 rounded-md hover:bg-gray-800 transition"
            >
              <FaLinkedinIn className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Middle: Quick Links */}
        <div className="md:col-span-1">
          <h4 className="text-lg font-medium mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/browse-cars" className="hover:text-white">
                Browse Cars
              </Link>
            </li>
            <li>
              <Link to="/add-car" className="hover:text-white">
                Add Car
              </Link>
            </li>
            <li>
              <Link to="/my-listing" className="hover:text-white">
                My Listing
              </Link>
            </li>
            <li>
              <Link to="/my-booking" className="hover:text-white">
                My Booking
              </Link>
            </li>
          </ul>
        </div>

        {/* Right: Terms & contact */}
        <div className="md:col-span-1">
          <h4 className="text-lg font-medium mb-3">Legal & Support</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact Us
              </Link>
            </li>
          </ul>

          <div className="mt-6">
            <p className="text-sm text-gray-400">Subscribe for offers</p>
            <form
              className="mt-3 flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md text-white text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
          <div className="mt-3 md:mt-0 flex items-center gap-4">
            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <a href="/" className="hover:text-white">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
