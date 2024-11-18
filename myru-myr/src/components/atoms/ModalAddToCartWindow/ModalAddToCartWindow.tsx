import { useEffect, useState } from "react";
import { AddToCartButton } from "../AddToCartButton/AddToCartButton";
import { limitText } from "@/actions/limitText";
import "@/components/molecules/ProductCart/styles.css";
import StyledNumberInput from "../StyledNumberInput/StyledNumberInput";

interface ModalAddToCartWindowProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  productTitle: string;
  productImage: string;
  productDescription: string;
  productPrice: number;
}

export const ModalAddToCartWindow = ({
  isModalOpen,
  setIsModalOpen,
  productTitle,
  productImage,
  productDescription,
  productPrice,
}: ModalAddToCartWindowProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [changedPrice, setChangedPrice] = useState<number>(productPrice);

  useEffect(() => {
    setChangedPrice(productPrice * quantity);
  }, [quantity, productPrice]);

  if (!isModalOpen) return null;

  const handleQuantityChange = (
    event:
      | React.FocusEvent<HTMLInputElement, Element>
      | React.PointerEvent<Element>
      | React.KeyboardEvent<Element>,
    value: number | null
  ) => {
    if (value !== null) {
      setQuantity(value);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Item Added to Cart</h2>
        {/* Flex container for image, title, and description */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={productImage}
            alt={productTitle}
            className="w-16 h-16 object-contain rounded-lg" // Resize image for alignment
          />
          <div>
            <div className="product-title ">
              <h3 className="text-lg text-mainText font-semibold">
                {productTitle}
              </h3>
            </div>
            <div className="product-description">
              <p className="text-sm text-mainText">
                {limitText(productDescription, 30)}
              </p>
            </div>
          </div>
        </div>
        <div className=" flex justify-between items-center pb-10 pt-5 px-2gap-2">
          <div className="product-price p-2">${changedPrice}.00</div>
          <StyledNumberInput value={quantity} onChange={handleQuantityChange} />
        </div>
        <div className="flex justify-between gap-4">
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
          <AddToCartButton onClick={() => setIsModalOpen(false)} />
        </div>
      </div>
    </div>
  );
};
