import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
    setFavorites(favorites.filter((f) => f.id !== id));
  }

  return (
    <div className="favorites-page">
      <h2>❤️ My Favorites</h2>
      <div className="fav-grid">
        {favorites.map((f) => (
          <div key={f.id} className="fav-card">
            <img src={f.image} alt={f.title} />
            <h4>{f.title}</h4>
            <button onClick={() => handleRemove(f.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
