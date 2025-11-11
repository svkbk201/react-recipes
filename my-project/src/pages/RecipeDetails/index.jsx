import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./RecipeDetails.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_SPOON_KEY;

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information`,
          { params: { apiKey } }
        );
        setRecipe(res.data);
      } catch (err) {
        console.error("Error fetching recipe:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [id]);

  if (loading) return <p>Loading recipe...</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div className="recipe-details">
      <Link to="/saved-meal-plans" className="back-btn">← Back to Plans</Link>

      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />

      <h2>🧂 Ingredients</h2>
      <ul>
        {recipe.extendedIngredients.map((ing) => (
          <li key={ing.id}>{ing.original}</li>
        ))}
      </ul>

      <h2>👩‍🍳 Instructions</h2>
      <p
        dangerouslySetInnerHTML={{
          __html: recipe.instructions || "No instructions available.",
        }}
      />

      <h3>Ready in {recipe.readyInMinutes} min — Serves {recipe.servings}</h3>
    </div>
  );
};

export default RecipeDetails;
