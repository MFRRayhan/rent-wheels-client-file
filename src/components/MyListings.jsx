import { useContext, useEffect, useState } from "react";
import { BsFillFuelPumpFill } from "react-icons/bs";
import {
  FaCar,
  FaEdit,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [formData, setFormData] = useState({
    carName: "",
    category: "Sedan",
    rentPrice: 0,
    location: "",
    image: "",
    status: "Available",
  });

  const axiosSecure = useAxiosSecure(); // if using token header

  // Fetch user's cars
  useEffect(() => {
    const fetchCars = async () => {
      if (!user?.email) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://rent-wheels-api-server.vercel.app/cars/provider/${encodeURIComponent(
            user.email
          )}`
        );
        if (!res.ok)
          throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
        const data = await res.json();
        setCars(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [user?.email]);

  // Open modal and populate form
  const openModal = (car) => {
    setSelectedCar(car);
    setFormData({
      carName: car.carName,
      category: car.category,
      rentPrice: car.rentPrice,
      location: car.location,
      image: car.image,
      status: car.status,
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rentPrice" ? Number(value) : value,
    }));
  };

  // ===================== Updated handleUpdate =====================
  const handleUpdate = async () => {
    if (!user) return Swal.fire({ icon: "error", title: "Not logged in" });

    try {
      const token = await user.getIdToken(); // get Firebase token
      const res = await fetch(
        `https://rent-wheels-api-server.vercel.app/cars/${selectedCar._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();

      if (res.ok && result.modifiedCount > 0) {
        // Update UI live
        setCars((prev) =>
          prev.map((c) =>
            c._id === selectedCar._id ? { ...c, ...formData } : c
          )
        );
        setIsModalOpen(false);
        Swal.fire({
          icon: "success",
          title: "Car Updated!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (res.ok && result.modifiedCount === 0) {
        Swal.fire({
          icon: "info",
          title: "No changes made",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error(result.message || "Update failed");
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Update Failed", text: err.message });
    }
  };
  // ===================== End handleUpdate =====================

  // Delete car
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This car will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;

    try {
      const token = await user.getIdToken(); // Firebase token
      const res = await fetch(
        `https://rent-wheels-api-server.vercel.app/cars/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const result = await res.json();
      if (res.ok && result.success) {
        setCars((prev) => prev.filter((c) => c._id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else throw new Error("Delete failed");
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    }
  };

  // ===================== Return JSX =====================
  return (
    <div className="container px-6 py-10 mx-auto mt-16">
      <div className="flex flex-col items-center mb-10">
        <div className="flex items-center gap-2 text-4xl font-extrabold text-gray-800">
          <FaCar className="text-primary" />
          <h2>My Listings</h2>
        </div>
        <p className="max-w-lg mt-2 text-center text-gray-500">
          Manage your listed cars below. You can update prices, availability, or
          remove any car anytime.
        </p>
      </div>

      {loading && (
        <div className="text-lg font-medium text-center text-gray-600">
          Fetching your cars...
        </div>
      )}
      {error && (
        <div className="font-semibold text-center text-red-500">{error}</div>
      )}
      {!loading && !error && cars.length === 0 && (
        <div className="p-10 text-center border border-gray-200 shadow-md bg-linear-to-r from-gray-50 via-white to-gray-50 rounded-2xl">
          <FaCar className="mx-auto mb-4 text-6xl text-gray-300" />
          <h3 className="mb-2 text-2xl font-bold text-gray-700">
            No Cars Listed
          </h3>
          <p className="mb-6 text-gray-500">
            You haven’t added any cars yet. Start now to list your first car.
          </p>
          <Link
            to="/add-car"
            className="px-6 py-3 font-semibold text-white transition-all duration-300 bg-primary rounded-full shadow-md hover:bg-[#425ad5] cursor-pointer"
          >
            + Add New Car
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <div
            key={car._id}
            className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-md rounded-2xl hover:shadow-lg"
          >
            <img
              src={car.image}
              alt={car.carName}
              className="object-cover w-full h-52"
            />
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-bold text-gray-800">{car.carName}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <BsFillFuelPumpFill />
                <span>{car.category}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <FaMapMarkerAlt />
                <span>{car.location}</span>
              </div>
              <div className="flex items-center gap-1 font-semibold text-green-600">
                <FaMoneyBillWave />
                <span>Rent Per Day: BDT. {car.rentPrice}</span>
              </div>
              <span
                className={`inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full capitalize ${
                  car.status === "booked"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {car.status}
              </span>
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => openModal(car)}
                  className="flex items-center gap-1 text-primary transition hover:text-[#425ad5] cursor-pointer"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(car._id)}
                  className="flex items-center gap-1 text-red-600 transition cursor-pointer hover:text-red-800"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="max-w-lg modal-box">
            <h3 className="mb-4 text-xl font-bold text-gray-800">
              Update Car Details
            </h3>
            <div className="space-y-3">
              <label className="font-semibold text-gray-700">Car Name</label>
              <input
                type="text"
                name="carName"
                className="w-full input input-bordered"
                value={formData.carName}
                onChange={handleChange}
              />
              <label className="font-semibold text-gray-700">Category</label>
              <select
                name="category"
                className="w-full select select-bordered"
                value={formData.category}
                onChange={handleChange}
              >
                <option>Sedan</option>
                <option>SUV</option>
                <option>Hatchback</option>
                <option>Luxury</option>
                <option>Electric</option>
              </select>
              <label className="font-semibold text-gray-700">
                Rent Price (৳)
              </label>
              <input
                type="number"
                name="rentPrice"
                className="w-full input input-bordered"
                value={formData.rentPrice}
                onChange={handleChange}
              />
              <label className="font-semibold text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                className="w-full input input-bordered"
                value={formData.location}
                onChange={handleChange}
              />
              <label className="font-semibold text-gray-700">Image URL</label>
              <input
                type="text"
                name="image"
                className="w-full input input-bordered"
                value={formData.image}
                onChange={handleChange}
              />
              <label className="font-semibold text-gray-700">Status</label>
              <select
                name="status"
                className="w-full select select-bordered"
                value={formData.status}
                onChange={handleChange}
              >
                <option>Available</option>
                <option>Booked</option>
              </select>
            </div>
            <div className="modal-action">
              <button
                className="btn btn-primary rounded-full"
                onClick={handleUpdate}
              >
                Update Car
              </button>
              <button
                className="btn btn-outline rounded-full"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
