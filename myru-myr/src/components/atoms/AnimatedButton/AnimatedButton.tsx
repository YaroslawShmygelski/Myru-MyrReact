import { ShoppingCart } from "lucide-react";
import { useState } from "react";

interface AnimatedButtonProps {
  onClick: () => void;
  text: string;
  isCartButton: boolean;
  isAble?: boolean;
}

export const AnimatedButton = ({
  onClick,
  text,
  isCartButton,
  isAble = true,
}: AnimatedButtonProps) => {
  const [effect, setEffect] = useState<boolean>(false);

  return (
    <div className="product-cart flex justify-center items-center">
      <button
        className={`flex items-center gap-1 px-3 py-3 text-white rounded-[7px] bg-customBlue hover:bg-customBlue700 hover:shadow-xl ${
          effect ? "animate-press" : ""
        }`}
        onClick={() => {
          setEffect(true);
          onClick();
        }}
        onAnimationEnd={() => setEffect(false)}
        disabled={!isAble}
      >
        {isCartButton && <ShoppingCart size={18} />}
        <p className="text-xs">{text}</p>
      </button>
    </div>
  );
};
