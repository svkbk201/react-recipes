import { useState } from "react";
import axios from "axios";
import "./SearchBar.css";

const SearchBar = ({ onResults }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_SPOON_KEY;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
          params: { query, number: 6, apiKey },
        }
      );
      onResults(res.data.results);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;
