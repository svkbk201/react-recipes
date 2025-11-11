import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { addFavorite } from "../../api/favorites";
import SearchBar from "../../components/SearchBar"; // ✅ add this
import "./UserHomePage.css";

const UserHomePage = () => {
  const apiKey = import.meta.env.VITE_SPOON_KEY;
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [results, setResults] = useState([]); // ✅ search results
  const [loading, setLoading] = useState(true);

  // Add to favorites handler
  const handleAddFavorite = async (favRecipe = recipe) => {
    if (!user || !favRecipe) return;
    try {
      const fav = {
        userId: user.id,
        recipeId: favRecipe.id,
        title: favRecipe.title,
        image: favRecipe.image,
      };
      await addFavorite(fav);
      alert("Added to favorites!");
    } catch (err) {
      console.error("Failed to add favorite:", err);
      alert("Could not add favorite. Try again later.");
    }
  };

  // Load random recipe of the day
  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    async function fetchRecipe() {
      try {
        const res = await axios.get(
          `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1`
        );
        setRecipe(res.data.recipes[0]);
      } catch (err) {
        console.error("Error fetching recipe:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [user, navigate]);

  return (
    <div className="home-page">
      <div className="main-content">
        <h1>Welcome back, {user?.name}!</h1>
        <p>Here’s something tasty to inspire your next meal 🍽️</p>

        {loading && <p>Loading recipe...</p>}

        {!loading && recipe && (
          <div className="recipe-card featured">
            <img src={recipe.image} alt={recipe.title} />
            <h2>{recipe.title}</h2>
            <div
              className="recipe-summary"
              dangerouslySetInnerHTML={{
                __html: recipe.summary || "No summary available.",
              }}
            />
            <div className="recipe-links">
              <button className="nav-btn" onClick={() => handleAddFavorite()}>
                ➕ Add to Favorites
              </button>
              <Link to="/favorites" className="nav-btn">
                ❤️ View Favorites
              </Link>
              <Link to="/meal-planner" className="nav-btn">
                📅 Plan Meals
              </Link>
            </div>
          </div>
        )}

        {/* ✅ Add Search Section Below */}
        <section className="search-section">
          <h2>🔍 Search Recipes</h2>
          <SearchBar onResults={setResults} />

          <div className="recipe-grid">
            {results.map((r) => (
              <div key={r.id} className="recipe-card small">

                <img src={r.image} alt={r.title} />
                <h3>{r.title}</h3>
                <button
                  className="fav-btn"
                  onClick={() => handleAddFavorite(r)}
                >
                  ❤️ Save
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="extra-links">
          <Link to="/advanced-search" className="nav-btn">
            🧠 Advanced Search
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
