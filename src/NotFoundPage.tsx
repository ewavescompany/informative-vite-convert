import { Home, MailIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center space-y-6 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600">Page Not Found</h2>
        <p className="text-gray-500">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/"
            className="flex items-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Homepage
          </Link>
          <Link
            to="/contact"
            className="flex items-center px-4 py-2 text-blue-500 border border-blue-500 rounded hover:bg-blue-50 transition duration-300"
          >
            <MailIcon className="w-5 h-5 mr-2" />
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
