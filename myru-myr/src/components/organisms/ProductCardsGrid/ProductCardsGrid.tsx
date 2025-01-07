import { useEffect, useState } from "react";
import { ProductInterface } from "@/services/interfaces/interfaces";
import { ProductCard } from "@components/molecules/ProductCart/ProductCard";
import { getProducts } from "@/services/api/products";
import { AnimatedLoading } from "@components/atoms/AnimatedLoading/AnimatedLoading";

export const ProductCardsGrid = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getProducts();

        const mappedProducts: ProductInterface[] = data.map((backendItem) => ({
          id: backendItem.id,
          title: backendItem.name,
          price: backendItem.price,
          description: backendItem.description,
          image: "/product1.jpg",
        }));
        setProducts(mappedProducts);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching products:", e);
        setError(
          e instanceof Error
            ? e.message
            : "Failed to load product data. Please try again later."
        );
        setLoading(false);
      }
    })();
  }, [products]);

  if (loading) {
    return <AnimatedLoading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 text-xl">
        {error}
      </div>
    );
  }

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
