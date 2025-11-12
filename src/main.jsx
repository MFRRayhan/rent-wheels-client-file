import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import AddCar from "./components/AddCar.jsx";
import BrowseCars from "./components/BrowseCars/BrowseCars.jsx";
import CarDetails from "./components/CarDetails/CarDetails.jsx";
import Home from "./components/Home/Home.jsx";
import MyBookings from "./components/MyBookings.jsx";
import MyListings from "./components/MyListings.jsx";
import Profile from "./components/Profile.jsx";
import Register from "./components/Register/Register.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import Login from "./Login/Login.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "car/:id",
        element: (
          <PrivateRoute>
            <CarDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/cars/${params.id}`),
      },
      {
        path: "/browse-cars",
        element: <BrowseCars />,
        loader: () => fetch("http://localhost:3000/cars"),
      },
      {
        path: "/add-car",
        element: (
          <PrivateRoute>
            <AddCar />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-listing",
        element: (
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-booking",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
