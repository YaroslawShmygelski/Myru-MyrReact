import { AnimatedButton } from "@components/atoms/AnimatedButton/AnimatedButton";
import { ModalAddToCartWindow } from "@components/molecules/ModalAddToCartWindow/ModalAddToCartWindow";
import { useState } from "react";
import { limitText } from "@/services/actions/limitText";
import "./styles.css";

interface ProductCartProps {
  productId: number;
  productTitle: string;
  productImage: string;
  productDescription: string;
  productPrice: number;
}

export const ProductCard = ({
  productId,
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
    <div className="product-card">
      <div className="product-image">
        <img
          src={productImage}
          alt="Product"
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="product-title ">
        <h2 className="text-mainText text-xl font-semibold">{productTitle}</h2>
      </div>
      <div className="product-description ">
        <p className="text-xs text-mainText">
          {limitText(productDescription, 7)}
        </p>
      </div>
      <div className="product-pricing-button">
        <div className="product-price">${productPrice}</div>
        <AnimatedButton
          onClick={handleCartButtonClick}
          text="Add To Cart"
          isCartButton={true}
        />
      </div>
      {isModalOpen && (
        <ModalAddToCartWindow
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          productId={productId}
          productTitle={productTitle}
          productImage={productImage}
          productDescription={productDescription}
          productPrice={productPrice}
        />
      )}
    </div>
  );
};
