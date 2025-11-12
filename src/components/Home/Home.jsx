import { useEffect, useState } from "react";
import FeaturedCars from "../FeaturedCars/FeaturedCars";
import HeroArea from "../HeroArea";
import Testimonials from "../Testimonials";
import WhyRentWithUs from "../WhyRentWithUs";

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://rent-wheels-api-server.vercel.app/featured-cars")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedCars(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching featured cars:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <HeroArea />
      {loading ? (
        <p className="text-center mt-10">Loading featured cars...</p>
      ) : (
        <FeaturedCars featuredCars={featuredCars} />
      )}
      <WhyRentWithUs />
      <Testimonials />
    </div>
  );
};

export default Home;
