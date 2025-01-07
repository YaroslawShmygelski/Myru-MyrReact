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

        const mappedProducts: ProductInterface[] = data.map((backendItem) => ({
          id: backendItem.id,
          title: backendItem.name,
          price: backendItem.price,
          description: backendItem.description,
          image: "/product1.jpg",
        }));
        setProducts(mappedProducts);
      } catch (e) {
        console.error("Error fetching products:", e);
      }
    })();
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-full h-full flex justify-center items-stretch min-w-[255px]"
          >
            <ProductCard
              id={product.id}
              title={product.title}
              description={product.description}
              image={product.image}
              price={product.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
