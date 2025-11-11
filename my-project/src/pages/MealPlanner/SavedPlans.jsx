import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MealPlanner.css";

const SavedPlans = () => {
  const user = useSelector((state) => state.user.user);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    if (!user) return;

    async function fetchPlans() {
      try {
        const res = await axios.get(`http://localhost:5001/mealPlans?userId=${user.id}`);
        setPlans(res.data);
      } catch (err) {
        console.error("Error fetching saved plans:", err);
      }
    }

    fetchPlans();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this meal plan?")) return;
    try {
      await axios.delete(`http://localhost:5001/mealPlans/${id}`);
      setPlans((prev) => prev.filter((plan) => plan.id !== id));
      alert("Meal plan deleted successfully!");
    } catch (err) {
      console.error("Error deleting plan:", err);
      alert("Failed to delete meal plan.");
    }
  };

  return (
    <div className="meal-planner">
      <h1>My Saved Meal Plans</h1>
      {plans.length === 0 ? (
        <p>No meal plans saved yet.</p>
      ) : (
        plans.map((plan) => (
          <div key={plan.id} className="saved-plan">
            <h2>{plan.name}</h2>
            <p>Week of: {plan.week}</p>

            <div className="week-grid">
              {Object.entries(plan.planData.week).map(([day, details]) => (
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

            <button className="delete-btn" onClick={() => handleDelete(plan.id)}>
              🗑 Delete Plan
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedPlans;
