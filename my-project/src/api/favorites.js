import axios from "axios";
const BASE_URL = "http://localhost:5001";

export async function getFavorites(userId) {
  const res = await axios.get(`${BASE_URL}/favorites`, { params: { userId } });
  return res.data;
}

export async function addFavorite(fav) {
    // Check if it already exists
  const existing = await axios.get(`${BASE_URL}/favorites`, {
    params: { userId: fav.userId, recipeId: fav.recipeId },
  });
  if (existing.data.length > 0) return existing.data[0]; // already exists
  const res = await axios.post(`${BASE_URL}/favorites`, fav);
  return res.data;
}

export async function removeFavorite(id) {
  await axios.delete(`${BASE_URL}/favorites/${id}`);
}
