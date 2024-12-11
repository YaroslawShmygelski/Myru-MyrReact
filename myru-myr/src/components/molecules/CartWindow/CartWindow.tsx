import { AnimatedButton } from "@components/atoms/AnimatedButton/AnimatedButton";

import { motion } from "framer-motion";

import "./styles.css";
import { CartProductElement } from "../CartProductElement/CartProductElement";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { updateProductQuantity } from "@/features/cart/cartSlice";
interface CartWindowProps {
  isOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CartWindow = ({ isOpen, setCartOpen }: CartWindowProps) => {
  const products = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
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
          {products.map((product) => (
            <CartProductElement
              key={product.id}
              product={product}
              onQuantityChange={(newQuantity) =>
                dispatch(
                  updateProductQuantity({
                    id: product.id,
                    quantity: newQuantity,
                  })
                )
              }
            />
          ))}
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
