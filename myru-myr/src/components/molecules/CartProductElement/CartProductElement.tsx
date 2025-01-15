import {StyledNumberInput} from "@components/atoms/StyledNumberInput/StyledNumberInput";
import {ReduxProductType} from "@/types/reduxTypes";
import React from "react";
import {Trash} from "lucide-react";

interface CartProductElementProps {
    product: ReduxProductType;
    onQuantityChange: (quantity: number) => void;
    onDeleteProduct: (productId: number) => void;
}

export const CartProductElement = ({
                                       product,
                                       onQuantityChange,
                                       onDeleteProduct,
                                   }: CartProductElementProps) => {
    return (
        <div className="flex items-center space-x-4 bg-white p-4 border rounded-lg shadow-lg">
            <div className="flex-shrink-0 w-24 h-24">
                <img
                    src="./product1.jpg"
                    alt={product.title}
                    className="object-contain w-full h-full rounded-lg"
                />
            </div>

            <div className="flex-1">
                <h3 className="text-lg font-semibold  text-mainText">{product.title}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-xl text-gray-800 font-semibold">
                    ${product.price.toFixed(2)}
                </p>
            </div>

            <div className="flex items-center space-x-2">
                <StyledNumberInput
                    initial_value={product.quantity}
                    onInputValueChange={onQuantityChange}
                />
                <div className="flex items-center space-x-2">
                    <Trash onClick={() => onDeleteProduct(product.id)}
                           className="cursor-pointer text-gray-700 hover:text-red-500  duration-300 ease-in-out
                           hover:scale-105"/>
                </div>
            </div>

        </div>
    );
};
