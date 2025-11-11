import { Link } from 'react-router-dom'; 
import ProductsDisplayManager from "../../manager/ProductsDisplayManagerV1";
import "./GuestPage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <main className="main-content">
        <ProductsDisplayManager />
      </main>
    
    </div>
  );
};

export default HomePage;
