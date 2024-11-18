import { ShoppingCart } from "lucide-react";
import { useState } from "react";

interface AddToCartButtonProps {
  onClick: () => void;
}

export const AddToCartButton = ({ onClick }: AddToCartButtonProps) => {
  const [effect, setEffect] = useState(false);

  return (
    <div className="product-cart flex justify-center items-center">
      <button
        className={`flex items-center gap-1 px-3 py-3 text-white rounded-[7px] bg-customBlue hover:bg-customBlue700 hover:shadow-xl ${
          effect ? "animate-press" : ""
        }`}
        onClick={() => {
          setEffect(true); // Apply animation effect
          onClick(); // Trigger the onClick function passed from the parent component
        }}
        onAnimationEnd={() => setEffect(false)} // Reset animation effect after it ends
      >
        {/* Icon */}
        <ShoppingCart size={18} />
        <p className="text-xs">Add To Cart</p>
      </button>
    </div>
  );
};
