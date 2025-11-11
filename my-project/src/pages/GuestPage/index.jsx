import { useEffect, useState } from "react";
import { getRandomRecipe } from "../../api/spoonacular";
import "./GuestPage.css";

export default function GuestPage() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

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
          </div>
        )}
        {!loading && !recipe && (
          <div className="error">Failed to load recipe 😢</div>
        )}
      </main>
    </div>
  );
}
