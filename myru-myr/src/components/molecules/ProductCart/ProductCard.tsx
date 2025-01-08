import { useState } from "react";

import { AnimatedButton } from "@components/atoms/AnimatedButton/AnimatedButton";
import { ModalAddToCartWindow } from "@components/molecules/ModalAddToCartWindow/ModalAddToCartWindow";
import "./styles.css";

import { limitText } from "@/services/actions/limitText";
import { ProductInterface } from "@/services/interfaces/interfaces";

export const ProductCard = ({
  id,
  title,
  description,
  image,
  price,
}: ProductInterface) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCartButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={image}
          alt={`${title} image`}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="product-title">
        <h2 className="text-mainText text-xl font-semibold">{title}</h2>
      </div>
      <div className="product-description">
        <p className="text-xs text-mainText">
          {description ? limitText(description, 7) : ""}
        </p>
      </div>
      <div className="product-pricing-button">
        <div className="product-price">${price}</div>
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
          product={{ id, title, image, description, price }}
        />
      )}
    </div>
  );
};
