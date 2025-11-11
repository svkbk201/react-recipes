import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductsDisplayManager from "../../manager/ProductsDisplayManagerV1";
import "./UserHomePage.css";

const UserHomePage = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  if (!user) {
    navigate("/")
  }

  return (
    <div className="home-container">
      <h1>Welcome back, {user.name}!</h1>
      <p>Explore our available products below.</p>

      <ProductsDisplayManager />
    </div>
  );
};

export default UserHomePage;
