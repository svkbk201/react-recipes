import axios from "axios";

const API_KEY = import.meta.env.VITE_SPOON_KEY;
const BASE_URL = "https://api.spoonacular.com";

export async function getRandomRecipe() {
  const res = await axios.get(`${BASE_URL}/recipes/random`, {
    params: { apiKey: API_KEY, number: 1 },
  });
  return res.data.recipes[0];
}

export async function searchRecipes(query) {
  const res = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
    params: { query, number: 10, apiKey: API_KEY },
  });
  return res.data.results;
}

export async function getRecipeDetails(id) {
  const res = await axios.get(`${BASE_URL}/recipes/${id}/information`, {
    params: { apiKey: API_KEY, includeNutrition: true },
  });
  return res.data;
}

export async function generateMealPlan({ targetCalories, diet }) {
  const res = await axios.get(`${BASE_URL}/mealplanner/generate`, {
    params: { apiKey: API_KEY, timeFrame: "week", targetCalories, diet },
  });
  return res.data;
}
