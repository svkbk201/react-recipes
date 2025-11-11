import axios from "axios";

const BASE_URL = "http://localhost:5001";
const SPOON_API = "https://api.spoonacular.com/mealplanner/generate";
const apiKey = import.meta.env.VITE_SPOON_KEY;

// Generate a full week's plan
export async function generateMealPlan(targetCalories = 2000, diet = "balanced") {
  const res = await axios.get(SPOON_API, {
    params: {
      apiKey,
      timeFrame: "week",
      targetCalories,
      diet,
    },
  });
  return res.data;
}

// Save the generated plan to JSON server
export async function saveMealPlan(userId, planData, name = "My Weekly Plan") {
  const res = await axios.post(`${BASE_URL}/mealPlans`, {
    userId,
    name,
    week: new Date().toISOString().slice(0, 10),
    planData,
  });
  return res.data;
}
