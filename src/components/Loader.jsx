import { Commet } from "react-loading-indicators";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      {/* Loader Container */}
      <div className="relative w-24 h-24">
        <Commet color="#32cd32" size="medium" text="" textColor="" />
      </div>
    </div>
  );
};

export default Loader;
