import { useEffect, useState } from "react";
import MapView from "../components/MapView";
import SideBar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import AddRestroomForm from "../components/AddRestroomFrom";
import { restrooms as initialRestrooms } from "../services/api";
import "../styles/HomePage.css";

export default function HomePage() {
  const [restrooms, setRestrooms] = useState(initialRestrooms);
  const [selectedRestroom, setSelectedRestroom] = useState(null);
  const [mapCenter, setMapCenter] = useState([40.785091, -73.968285]);
  const [mapBounds, setMapBounds] = useState(null);
  const [addingRestroom, setAddingRestroom] = useState(false);
  const [newRestroomLatLng, setNewRestroomLatLng] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.warn("Geolocation not available or permission denied", error);
        }
      )
    }
  })

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
      { headers: { "User-Agent": "restroom-finder-app" } }
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

  function handleMapClick(latlng) {
    if (!addingRestroom) return;
    setNewRestroomLatLng(latlng);
  }

  function handleAddRestroom(formData) {
    const newRestroom = {
      ...formData,
      id: restrooms.length + 1,
    };
    setRestrooms([...restrooms, newRestroom]);
    setSelectedRestroom(newRestroom);
    setAddingRestroom(false);
    setNewRestroomLatLng(null);
  }

  function handleCancelAdd() {
    setAddingRestroom(false);
    setNewRestroomLatLng(null);
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
            onMapClick={handleMapClick}
          />

          <button
            className={`add-restroom-btn ${addingRestroom ? "active" : ""}`}
            onClick={() => setAddingRestroom(!addingRestroom)}
          >
            {addingRestroom ? "Click on map to place restroom" : "+ Add Restroom"}
          </button>

          {addingRestroom && newRestroomLatLng && (
            <AddRestroomForm
              latlng={newRestroomLatLng}
              onSubmit={handleAddRestroom}
              onCancel={handleCancelAdd}
            />
          )}
        </div>
        <SideBar restroom={selectedRestroom} />
      </div>
    </div>
  );
}
