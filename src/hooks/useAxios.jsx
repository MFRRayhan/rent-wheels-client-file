import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://rent-wheels-api-server.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
