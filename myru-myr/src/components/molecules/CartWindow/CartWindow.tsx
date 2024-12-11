import { useState } from "react";

import { AnimatedButton } from "@components/atoms/AnimatedButton/AnimatedButton";
import { StyledNumberInput } from "@components/atoms/StyledNumberInput/StyledNumberInput";

import { motion } from "framer-motion";

import "./styles.css";
interface CartWindowProps {
  isOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CartWindow = ({ isOpen, setCartOpen }: CartWindowProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleInputValue = (q: number) => {
    setQuantity(q);
  };

  const handleOutsideClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setCartOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOutsideClick}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 w-5/6"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0.5, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 10, y: 50 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-center text-xl font-semibold mb-4 "> Cart </h2>
        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-center space-x-4 bg-white p-4 border rounded-lg shadow">
            <div className="product-card-image">
              <img
                src="/product1.jpg"
                alt="Product 2"
                className="object-contain w-full h-full"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold">Product 2</h3>
              <p className="text-gray-500">
                Description of the product goes here.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <StyledNumberInput
                onInputValueChange={handleInputValue}
                initial_value={quantity}
              ></StyledNumberInput>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <AnimatedButton
            onClick={() => {}}
            text="Place Order"
            isCartButton={false}
          ></AnimatedButton>
        </div>
      </motion.div>
    </div>
  );
};
