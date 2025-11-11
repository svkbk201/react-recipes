import { useState } from "react";
import { searchRecipes } from "../../api/searchRecipes";
import "./AdvancedSearch.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addFavorite } from "../../api/favorites";


const AdvancedSearch = () => {
  const [ingredients, setIngredients] = useState("");
  const [diets, setDiets] = useState([]);
  const [intolerances, setIntolerances] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.user);
  const handleAddFavorite = async (recipe) => {
  if (!user) {
    alert("Please log in to save favorites.");
    return;
  }

  try {
    const fav = {
      userId: user.id,
      recipeId: recipe.id,
      title: recipe.title,
      image: recipe.image,
    };

    await addFavorite(fav);
    alert(`Added "${recipe.title}" to your favorites!`);
  } catch (err) {
    console.error("Failed to add favorite:", err);
    alert("Could not save favorite. Try again later.");
  }
};
  const navigate = useNavigate();

    useEffect(() => {
    if (!user) {
      alert("Please log in to access Advanced Search.");
      navigate("/login");
    }
  }, [user, navigate]);

  const availableDiets = ["vegetarian", "vegan", "paleo", "ketogenic"];
  const availableIntolerances = ["dairy", "peanut", "gluten", "shellfish"];

  const toggleSelection = (value, list, setter) => {
    setter(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
  };
  

  const handleSearch = async () => {
    setLoading(true);
    try {
      const recipes = await searchRecipes({
        ingredients: ingredients.split(",").map(i => i.trim()).filter(Boolean),
        diets,
        intolerances,
      });
      setResults(recipes);
    } catch (err) {
      console.error("Search failed:", err);
      alert("Failed to search recipes. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="advanced-search">
      <h1>Advanced Recipe Search 🔍</h1>

      <div className="filters">
        <div>
          <label>Ingredients (comma-separated)</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g. chicken, tomato"
          />
        </div>

        <div>
          <label>Diets:</label>
          <div className="checkbox-group">
            {availableDiets.map((diet) => (
              <label key={diet}>
                <input
                  type="checkbox"
                  checked={diets.includes(diet)}
                  onChange={() => toggleSelection(diet, diets, setDiets)}
                />
                {diet}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label>Intolerances:</label>
          <div className="checkbox-group">
            {availableIntolerances.map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  checked={intolerances.includes(item)}
                  onChange={() => toggleSelection(item, intolerances, setIntolerances)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search Recipes"}
        </button>
      </div>

      <div className="results-grid">
        {results.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
           <img src={recipe.image} alt={recipe.title} />
  <h3>{recipe.title}</h3>
  <p
    dangerouslySetInnerHTML={{
      __html: recipe.summary?.slice(0, 100) + "...",
    }}
  />

  {/* Only show button if user is logged in */}
  {user && (
    <button
      className="add-fav-btn"
      onClick={() => handleAddFavorite(recipe)}
    >
      ➕ Add to Favorites
    </button>
  )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvancedSearch;
