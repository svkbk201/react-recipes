import { createContext, useContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5001/products"); // Scoped API
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, selectedProduct, setSelectedProduct, loading }}
    >
      {children}
    </ProductContext.Provider>
  );
};

/**
 * Custom Hook
 */
// export const useProducts = () => useContext(ProductContext);
