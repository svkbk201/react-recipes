import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFavorites, removeFavorite } from "../../api/favorites";
import "./Favorites.css";

export default function Favorites() {
  const user = useSelector((state) => state.user.user);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      getFavorites(user.id).then(setFavorites);
    }
  }, [user]);

  async function handleRemove(id) {
    await removeFavorite(id);
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }

  if (!user) {
    return <p>Please log in to view your favorites.</p>;
  }

  return (
    <div className="favorites-page">
      <h2>❤️ My Favorites</h2>

      {favorites.length === 0 ? (
        <p>No favorites yet. Add some recipes to your list!</p>
      ) : (
        <div className="fav-grid">
          {favorites.map((f) => (
            <div key={f.id} className="fav-card">
              <Link to={`/recipe/${f.recipeId}`} className="fav-link">
                <img src={f.image} alt={f.title} />
                <h4>{f.title}</h4>
              </Link>
              <button onClick={() => handleRemove(f.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

