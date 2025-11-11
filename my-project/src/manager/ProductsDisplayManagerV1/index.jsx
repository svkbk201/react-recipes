import { ProductContext, ProductProvider} from "./context/ProductContext";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import { useContext } from "react";

const ProductsDisplayManager = () => {
  const { selectedProduct } = useContext(ProductContext);

  return (
    <>
      <div className="products-display-manager">
        {!selectedProduct ? <ProductList /> : <ProductDetails />}
      </div>
    </>
  );
};

// Wrap in scoped provider
const ProductsDisplayManagerWrapper = () => (
  <ProductProvider>
    <ProductsDisplayManager />
  </ProductProvider>
);

export default ProductsDisplayManagerWrapper;
