import React from "react";
import "../styles/HomePage.css"; 

export default function SideBar({ restroom }) {
  if (!restroom) {
    return <div className="sidebar sidebar-empty">Select a restroom to see details</div>;
  }

  return (
    <div className="sidebar">
      <h2>{restroom.name}</h2>
      <p>Cleanliness: {restroom.cleanliness}</p>
      <p>Maintained: {restroom.maintained ? "Yes" : "No"}</p>
      <p>Stank level: {restroom.stank}</p>

      {restroom.images && restroom.images.length > 0 && (
        <div className="images">
          {restroom.images.map((img, idx) => (
            <img key={idx} src={img} alt={`Restroom ${idx}`} />
          ))}
        </div>
      )}
    </div>
  );
}