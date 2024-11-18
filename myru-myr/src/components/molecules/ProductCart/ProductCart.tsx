import { AddToCartButton } from "@components/atoms/AddToCartButton/AddToCartButton";
import { ModalAddToCartWindow } from "@components/atoms/ModalAddToCartWindow/ModalAddToCartWindow";
import { useState } from "react";

interface ProductCartProps {
  productTitle: string;
  productImage: string;
  productDescription: string;
  productPrice: number;
}

export const ProductCart = ({
  productTitle,
  productImage,
  productDescription,
  productPrice,
}: ProductCartProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCartButtonClick = () => {
    setIsModalOpen(true);
  };
  return (
    <div className="product-card p-4 m-12 bg-white shadow-md rounded-lg w-64 border-spacing-6">
      <div className="product-image mb-4 flex justify-center items-center h-40 w-full overflow-hidden bg-white rounded-lg">
        <img
          src={productImage}
          alt="Product"
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="product-title flex justify-center items-center pt-0 px-4 pb-4">
        <h2 className="text-mainText text-xl font-semibold">{productTitle}</h2>
      </div>
      <div className="product-description flex justify-center items-center pt-0 px-4 pb-4">
        <p className="text-xs text-mainText">
          {productDescription.split(" ").slice(0, 7).join(" ")}
          {productDescription.split(" ").length > 5 ? "..." : ""}
        </p>
      </div>
      <div className="product-pricing-button flex justify-between items-center px-1 gap-2">
        <div className="Price text-2xl text-mainText">${productPrice}.00</div>
        <AddToCartButton />
      </div>
      {isModalOpen && (
        <ModalAddToCartWindow
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          productTitle={productTitle}
          productImage={productImage}
          productDescription={productDescription}
          productPrice={productPrice}
        />
      )}
    </div>
  );
};
