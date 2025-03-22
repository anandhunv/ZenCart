import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mt-2">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
