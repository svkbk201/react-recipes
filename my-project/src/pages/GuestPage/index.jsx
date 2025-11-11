import { useEffect, useState } from "react";
import { getRandomRecipe } from "../../api/spoonacular";
import { addFavorite } from "../../api/favorites";
import { useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar"; // ✅ Add this
import { Link } from "react-router-dom";
import "./GuestPage.css";

export default function GuestPage() {
  const [recipe, setRecipe] = useState(null);
  const [results, setResults] = useState([]); // ✅ search results
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);

  // Fetch random recipe on load
  useEffect(() => {
    async function fetchRecipe() {
      try {
        const data = await getRandomRecipe();
        setRecipe(data);
      } catch (err) {
        console.error("Error fetching recipe:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, []);

  // Handle save favorite
  async function handleSaveFavorite() {
    if (!user) {
      alert("Please log in to save recipes ❤️");
      return;
    }
    try {
      await addFavorite({
        userId: user.id,
        recipeId: recipe.id,
        title: recipe.title,
        image: recipe.image,
      });
      alert("Recipe added to favorites!");
    } catch (err) {
      console.error(err);
      alert("Could not save recipe.");
    }
  }

  return (
    <div className="home-page">
      <main className="main-content">
        {loading && <div className="loading">Loading recipe of the day...</div>}

        {!loading && recipe && (
          <div className="recipe-card">
            <h2 className="title">🍽️ Recipe of the Day</h2>
            <img className="image" src={recipe.image} alt={recipe.title} />
            <h3 className="recipe-title">{recipe.title}</h3>
            <p
              className="summary"
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
            />
            <button className="fav-btn" onClick={handleSaveFavorite}>
              ❤️ Save
            </button>
          </div>
        )}

        {!loading && !recipe && (
          <div className="error">Failed to load recipe 😢</div>
        )}

        {/* ✅ Add Search Section */}
        <section className="search-section">
          <h2>🔍 Search Recipes</h2>
          <SearchBar onResults={setResults} />

          <div className="recipe-grid">
            {results.map((r) => (
              <Link to={`/recipe/${r.id}`} key={r.id} className="recipe-card">
                <img src={r.image} alt={r.title} />
                <h3>{r.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
