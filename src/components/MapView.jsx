import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

function RecenterMap({center, bounds}) {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, {padding: [20, 20]});
    } else {
      map.setView(center, map.getZoom());
    }
  }, [center, bounds, map]);

  return null;
}

export default function MapView({ restrooms, mapCenter, mapBounds, setSelectedRestroom }) {
  return (
    <MapContainer
      center={mapCenter}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <RecenterMap center={mapCenter} bounds={mapBounds}/>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {restrooms.map((r) => (
        <Marker
          key={r.id}
          position={[r.lat, r.lng]}
          eventHandlers={{
            click: () => setSelectedRestroom(r),
          }}
        >
          <Popup>{r.name}</Popup>
        </Marker>
      ))}
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}