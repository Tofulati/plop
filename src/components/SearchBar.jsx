import { useState } from "react";
import '../styles/SearchBar.css';

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Searching for:", query);
      // Integrate Nominatim search here later
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search for a location or restroom"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}