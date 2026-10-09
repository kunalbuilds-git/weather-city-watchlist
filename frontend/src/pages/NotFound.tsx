import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center space-y-2">
      <h2 className="text-2xl font-bold">Page not found</h2>
      <Link to="/" className="text-blue-700 hover:underline">
        Go back home
      </Link>
    </div>
  );
}