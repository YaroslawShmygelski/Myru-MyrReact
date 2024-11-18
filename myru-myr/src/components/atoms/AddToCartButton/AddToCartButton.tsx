import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export const AddToCartButton = () => {
  const [effect, setEffect] = useState(false);

  return (
    <div className="product-cart flex justify-center items-center">
      <button
        className={`flex items-center gap-1 px-3 py-3 text-white rounded-[7px] bg-customBlue hover:bg-customBlue700 hover:shadow-xl ${
          effect ? "animate-press" : ""
        }`}
        onClick={() => {
          setEffect(true);
        }}
        onAnimationEnd={() => setEffect(false)}
      >
        {/*Icon*/}
        <ShoppingCart size={"18px"} />
        <p className="text-xs"> Add To Cart</p>
      </button>
    </div>
  );
};
