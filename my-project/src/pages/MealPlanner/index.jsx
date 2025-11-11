import { useState } from "react";
import { useSelector } from "react-redux";
import { generateMealPlan, saveMealPlan } from "../../api/mealPlanner";
import "./MealPlanner.css";
import { Link } from "react-router-dom"; 

const MealPlanner = () => {
  const user = useSelector((state) => state.user.user);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [calories, setCalories] = useState(2000);
  const [diet, setDiet] = useState("balanced");

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await generateMealPlan(calories, diet);
      setPlan(data);
    } catch (err) {
      console.error("Error generating meal plan:", err);
      alert("Error generating meal plan. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!plan) return;
    try {
      await saveMealPlan(user.id, plan);
      alert("Meal plan saved successfully!");
    } catch (err) {
      console.error("Error saving meal plan:", err);
      alert("Failed to save plan.");
    }
  };

  return (
    <div className="meal-planner">
      <h1>Weekly Meal Planner 📅</h1>

      <div className="controls">
        <label>Calories:</label>
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        <label>Diet:</label>
        <select value={diet} onChange={(e) => setDiet(e.target.value)}>
          <option value="balanced">Balanced</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="high-protein">High Protein</option>
        </select>

        <button onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate Weekly Plan"}
        </button>
      </div>

      {plan && (
        <>
          <h2>Your Plan</h2>
          <div className="week-grid">
            {Object.entries(plan.week).map(([day, details]) => (
              <div key={day} className="day-card">
                <h3>{day.toUpperCase()}</h3>
                {details.meals.map((meal) => (
                  <Link to={`/recipe/${meal.id}`} key={meal.id} className="meal-item">
                    <img
                        src={`https://spoonacular.com/recipeImages/${meal.id}-312x231.jpg`}
                        alt={meal.title}
                    />
                   <p>{meal.title}</p>
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <button onClick={handleSave}>💾 Save Plan</button>
        </>
      )}
    </div>
  );
};

export default MealPlanner;
