import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ restrooms, setSelectedRestroom }) {
  return (
    <MapContainer
      center={[40.785091, -73.968285]} // default center
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
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