import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { selectedProduct, setSelectedProduct } = useContext(ProductContext);

  if (!selectedProduct) return null;

  const { name, category, price, availability, desc, image } = selectedProduct;

  return (
    <div className="product-details">
      <button className="close-btn" onClick={() => setSelectedProduct(null)}>
        ✖ Close
      </button>
      <img src={image} alt={name} className="detail-img" />
      <h2>{name}</h2>
      <p><strong>Category:</strong> {category}</p>
      <p><strong>Price:</strong> ${price}</p>
      <p><strong>Availability:</strong> {availability ? "In Stock" : "Out of Stock"}</p>
      <p><strong>Description:</strong> {desc}</p>
    </div>
  );
};

export default ProductDetails;
