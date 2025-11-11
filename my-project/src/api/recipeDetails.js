import axios from "axios";
const apiKey = import.meta.env.VITE_SPOON_KEY;

export async function getRecipeById(id) {
  const res = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information`,
    {
      params: { apiKey },
    }
  );
  return res.data;
}
