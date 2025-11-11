import { useContext } from "react";
import { useSelector } from "react-redux";
import { ProductContext } from "../context/ProductContext";
import "./ProductList.css";

const ProductList = () => {
  const { products, loading, setSelectedProduct } = useContext(ProductContext);
    const user = useSelector((state) => state.user.user); 


  if (loading) return <p>Loading products...</p>;

  return (
    <div className="product-grid">
      {products.map((p) => (
        <div key={p.id} className="product-card">
          <img src={p.image} alt={p.name} className="product-img" />
          <h3>{p.name}</h3>
          <p className="category">{p.category}</p>
          <p className="price">${p.price}</p>
          <p className="desc">{p.desc.slice(0, 50)}...</p>
          <button onClick={() => setSelectedProduct(p)}>View More</button>
          {user && (
              <button className="add-btn">
                Add to Cart
              </button>
            )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
