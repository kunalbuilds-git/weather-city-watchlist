import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-blue-700 text-white py-3 px-6 shadow-md flex items-center justify-between">
      
      <h1 className="text-lg font-semibold tracking-wide">
        Weather City Watchlist
      </h1>

      <div className="flex gap-4">
        <Link
          to="/"
          className="hover:text-gray-200 transition"
        >
          Home
        </Link>

        <Link
          to="/watchlist"
          className="hover:text-gray-200 transition"
        >
          Watchlist
        </Link>

        <Link
          to="/city-details"
          className="hover:text-gray-200 transition"
        >
          City Details
        </Link>
      </div>
    </nav>
  );
}