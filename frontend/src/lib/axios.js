import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.MODE === "development" 
        ? "http://localhost:5001/api"  // Backend URL in dev
        : "/api",  // Proxy or relative path in production
	withCredentials: true, // send cookies to the server
});

export default axiosInstance;
