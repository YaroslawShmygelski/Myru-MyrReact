import { useState, useEffect } from "react";

import { AnimatedButton } from "../../atoms/AnimatedButton/AnimatedButton";
import { StyledNumberInput } from "../../atoms/StyledNumberInput/StyledNumberInput";

import { limitText } from "@/services/actions/limitText";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { motion } from "framer-motion";

import "@/components/molecules/ProductCart/styles.css";
import { addItemToCart } from "@/features/cart/cartSlice";
import { ProductInterface } from "@/services/interfaces/interfaces";
import { ReduxProductType } from "@/types/reduxTypes";

interface ModalAddToCartWindowProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: ProductInterface;
}

export const ModalAddToCartWindow = ({
  isModalOpen,
  setIsModalOpen,
  product,
}: ModalAddToCartWindowProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [changedPrice, setChangedPrice] = useState<number>(product.price);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Correct parsing price of product
    const fixedPrice = parseFloat((product.price * quantity).toFixed(2));
    setChangedPrice(fixedPrice);
  }, [quantity, product.price]);

  useEffect(() => {
    const handleEscapeClick = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscapeClick);
    } else {
      document.removeEventListener("keydown", handleEscapeClick);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeClick);
    };
  }, [isModalOpen, setIsModalOpen]);

  if (!isModalOpen) return null;

  const handleOutsideClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setIsModalOpen(false);
    }
  };

  const handleInputValue = (value: number) => {
    setQuantity(value);
  };

  const handleAddToCart = (product: ReduxProductType) => {
    dispatch(addItemToCart(product));
    setIsModalOpen(false);
  };

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 w-96"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0.5, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 10, y: 50 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">Item Added to Cart</h2>
        <div className="flex items-center gap-4 mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-16 h-16 object-contain rounded-lg"
          />
          <div>
            <div className="product-title">
              <h3 className="text-lg text-mainText font-semibold">
                {product.title}
              </h3>
            </div>
            <div className="product-description">
              <p className="text-sm text-mainText">
                {product.description ? limitText(product.description, 30) : ""}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center pb-10 pt-5 px-2 gap-2">
          <div className="product-price p-2 text-xl text-mainText">
            ${limitText(changedPrice.toString(), 7)}
          </div>
          <div className="flex items-center space-x-2">
            <StyledNumberInput onInputValueChange={handleInputValue} />
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
          <AnimatedButton
            onClick={() =>
              handleAddToCart({
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
                quantity: quantity !== 0 ? quantity : 0,
              })
            }
            text="Add To Cart"
            isCartButton={true}
            isAble={quantity > 0}
          />
        </div>
      </motion.div>
    </div>
  );
};
