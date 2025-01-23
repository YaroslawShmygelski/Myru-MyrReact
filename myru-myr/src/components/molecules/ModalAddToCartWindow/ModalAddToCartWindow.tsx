import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

import { AnimatedButton } from "@/components/atoms/AnimatedButton/AnimatedButton";
import { StyledNumberInput } from "@/components/atoms/StyledNumberInput/StyledNumberInput";

import { limitText } from "@/services/actions/limitText";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useEscapeKey } from "@/hooks/hooks";
import { addItemToCart } from "@/features/cart/cartSlice";
import { ReduxProductType } from "@/types/reduxTypes";
import {ProductInterface} from "@/services/interfaces/interfaces";

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
        const fixedPrice = parseFloat((product.price * quantity).toFixed(2));
        setChangedPrice(fixedPrice);
    }, [quantity, product.price]);

    useEscapeKey(() => setIsModalOpen(false), isModalOpen);

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

    const modalContent = (
        <div
            onClick={handleOutsideClick}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
            <div
                className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-96 max-w-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold mb-4">Item Added to Cart</h2>
                <div className="flex items-center gap-4 mb-4">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-16 h-16 object-contain rounded-lg"
                    />
                    <div>
                        <h3 className="text-lg text-mainText font-semibold">{product.title}</h3>
                        <p className="text-sm text-mainText">
                            {product.description ? limitText(product.description, 30) : ""}
                        </p>
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
                                image: product.image,
                            })
                        }
                        text="Add To Cart"
                        isCartButton={true}
                        isAble={quantity > 0}
                    />
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};
