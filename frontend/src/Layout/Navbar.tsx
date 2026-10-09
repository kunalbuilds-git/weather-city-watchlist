import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/watchlist", label: "Watchlist" },
];

export default function Navbar() {
  return (
    <nav className="w-full bg-blue-700 text-white py-3 px-6 shadow-md flex items-center justify-between">
      <h1 className="text-lg font-semibold tracking-wide">Weather City Watchlist</h1>

      <div className="flex gap-4">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `transition hover:text-gray-200 ${isActive ? "font-semibold underline underline-offset-4" : ""}`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}