import axios from "axios";
import { useEffect, useState } from "react";
import { ProductInterface } from "@/services/interfaces/interfaces";
import { ProductCard } from "@components/molecules/ProductCart/ProductCard";

const getProducts = async () => {
  const response = await axios.get<ProductInterface[]>(
    "https://mocki.io/v1/d9d46cb3-e008-4b8f-aa94-0d97d0d955aa"
  );
  return response.data;
};

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <ProductCard
            key={product.title}
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
