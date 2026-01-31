import { useState } from "react";
import MapView from "../components/MapView";
import SideBar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import { restrooms } from "../services/api";
import "../styles/HomePage.css";

export default function HomePage() {
  const [selectedRestroom, setSelectedRestroom] = useState(null);
  const [mapCenter, setMapCenter] = useState([40.785091, -73.968285]);
  const [mapBounds, setMapBounds] = useState(null);

  async function handleSearch(query) {
    const trimmed = query.trim();
    if (!trimmed) return;

    if (/^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/.test(trimmed)) {
      const [lat, lng] = trimmed.split(",").map(Number);
      setMapCenter([lat, lng]);
      setMapBounds(null);
      return;
    }

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        trimmed
      )}&format=jsonv2&limit=1`,
      {
        headers: {
          "User-Agent": "restroom-finder-app"
        }
      }
    );

    const data = await res.json();
    if (!data.length) return;

    const result = data[0];

    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon); 

    setMapCenter([lat, lng]);

    const [south, north, west, east] = result.boundingbox.map(Number);

    setMapBounds([
      [south, west],
      [north, east],
    ]);
  }

  return (
    <div className="homepage">
      <div className="content">
        <div className="map-container">
          <SearchBar onSearch={handleSearch} />
          <MapView
            restrooms={restrooms}
            mapCenter={mapCenter}
            mapBounds={mapBounds}
            setSelectedRestroom={setSelectedRestroom}
          />
        </div>
        <SideBar restroom={selectedRestroom} />
      </div>
    </div>
  );
}
