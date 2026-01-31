import { useState } from "react";
import MapView from "../components/MapView";
import SideBar from "../components/Sidebar.jsx";
import SearchBar from "../components/SearchBar";
import { restrooms } from "../services/api";
import "../styles/HomePage.css";

export default function HomePage() {
  const [selectedRestroom, setSelectedRestroom] = useState(null);

  return (
    <div className="homepage">
      <div className="content">
        <div className="map-container">
          <SearchBar />
          <MapView
            restrooms={restrooms}
            selectedRestroom={selectedRestroom}
            setSelectedRestroom={setSelectedRestroom}
          />
        </div>
        <SideBar restroom={selectedRestroom} />
      </div>
    </div>
  );
}
