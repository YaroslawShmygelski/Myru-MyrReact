import { useEffect, useState } from "react";
import { ProductInterface } from "@/services/interfaces/interfaces";
import { ProductCard } from "@components/molecules/ProductCart/ProductCard";
import { getProducts } from "@/services/api/products";

export const ProductCardsGrid = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 p-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            productId={product.id}
            productTitle={product.title}
            productPrice={product.price}
            productDescription={product.description}
            productImage="/product1.jpg"
          />
        ))}
      </div>
    </>
  );
};
