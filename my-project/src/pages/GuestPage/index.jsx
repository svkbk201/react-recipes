import { useEffect, useState } from "react";
import { getRandomRecipe } from "../../api/spoonacular";


export default function GuestPage() {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    getRandomRecipe().then(setRecipe);
  }, []);

  if (!recipe) return <p>Loading random recipe...</p>;

  return (
    <div>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
    </div>
  );
}
