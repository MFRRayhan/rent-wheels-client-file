import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure"; // secure axios hook import

const AddCar = ({ onCarAdded }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [carData, setCarData] = useState({
    carName: "",
    description: "",
    category: "Sedan",
    rentPrice: "",
    location: "",
    image: "",
    status: "available",
    providerName: "",
    providerEmail: "",
  });

  useEffect(() => {
    if (user) {
      setCarData((prev) => ({
        ...prev,
        providerName: user.displayName || "",
        providerEmail: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return Swal.fire({
        icon: "error",
        title: "Not Logged In",
        text: "Please login first to add a car.",
      });
    }

    try {
      const res = await axiosSecure.post("/cars", carData);

      if (res.data.insertedId || res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Car Added Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        if (onCarAdded) onCarAdded(res.data);
        setCarData({
          carName: "",
          description: "",
          category: "Sedan",
          rentPrice: "",
          location: "",
          image: "",
          status: "available",
          providerName: user.displayName || "",
          providerEmail: user.email || "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to add car",
          text: res.data.message || "Something went wrong",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  };

  return (
    <div className="max-w-4xl p-8 mx-auto mt-12 bg-white shadow-xl rounded-2xl">
      <h2 className="mb-8 text-4xl font-extrabold text-center text-gray-900">
        Add a New Car
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Car Name
          </label>
          <input
            type="text"
            name="carName"
            placeholder="e.g. Toyota Corolla"
            value={carData.carName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 transition border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={carData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 transition border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option>Sedan</option>
              <option>SUV</option>
              <option>Hatchback</option>
              <option>Luxury</option>
              <option>Electric</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={carData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 transition border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="available">Available</option>
              <option value="booked">Booked</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Provide details about the car"
            value={carData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 transition border border-gray-300 resize-none rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Rent Price (per day)
            </label>
            <input
              type="number"
              name="rentPrice"
              placeholder="e.g. 2500"
              value={carData.rentPrice}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 transition border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Dhaka, Bangladesh"
              value={carData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 transition border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Hosted Image URL
          </label>
          <input
            type="text"
            name="image"
            placeholder="Paste image URL here"
            value={carData.image}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 transition border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
          />
          {carData.image && (
            <div className="w-full h-64 mt-3 overflow-hidden border border-gray-300 shadow-sm rounded-xl">
              <img
                src={carData.image}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Provider Name
            </label>
            <input
              type="text"
              name="providerName"
              value={carData.providerName}
              readOnly
              className="w-full px-4 py-3 transition bg-gray-100 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Provider Email
            </label>
            <input
              type="email"
              name="providerEmail"
              value={carData.providerEmail}
              readOnly
              className="w-full px-4 py-3 transition bg-gray-100 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="block w-full py-3 mx-auto font-bold text-white transition-all duration-300 shadow-lg bg-primary md:w-1/2 hover:bg-[#425ad5] rounded-full"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
