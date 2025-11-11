import axios from "axios";
const apiKey = import.meta.env.VITE_SPOON_KEY;

export async function searchRecipes({ ingredients, diets, intolerances }) {
  const res = await axios.get("https://api.spoonacular.com/recipes/complexSearch", {
    params: {
      apiKey,
      includeIngredients: ingredients.join(","),
      diet: diets.join(","),
      intolerances: intolerances.join(","),
      number: 12,
      addRecipeInformation: true,
    },
  });
  return res.data.results;
}
