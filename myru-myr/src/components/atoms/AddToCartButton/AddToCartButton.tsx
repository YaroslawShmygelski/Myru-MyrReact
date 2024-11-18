import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export const AddToCartButton = () => {
  const [effect, setEffect] = useState(false);

  return (
    <button
      className={`flex items-center gap-2 px-4 py-4 text-white rounded-[7px] bg-customBlue hover:bg-customBlue700 hover:shadow-xl ${
        effect ? "animate-press" : ""
      }`}
      onClick={() => {
        setEffect(true);
      }}
      onAnimationEnd={() => setEffect(false)}
    >
      {/* SVG Icon */}
      <ShoppingCart />
      Add to cart
    </button>
  );
};
