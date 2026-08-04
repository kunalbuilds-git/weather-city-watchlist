import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import CityDetails from "./pages/CityDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/city-details" element={<CityDetails />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}