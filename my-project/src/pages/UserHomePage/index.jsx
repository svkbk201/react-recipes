import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./UserHomePage.css";

const UserHomePage = () => {
  const apiKey = import.meta.env.VITE_SPOON_KEY;
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    async function fetchRecipe() {
      try {
        // 🧠 Make sure to replace with your real Spoonacular API key
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
          <div className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <h2>{recipe.title}</h2>
            <div
  className="recipe-summary"
  dangerouslySetInnerHTML={{
    __html: recipe.summary || "No summary available.",
  }}
/>
            <div className="recipe-links">
              <Link to="/favorites" className="nav-btn">
                ❤️ View Favorites
              </Link>
              <Link to="/meal-planner" className="nav-btn">
                📅 Plan Meals
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHomePage;
