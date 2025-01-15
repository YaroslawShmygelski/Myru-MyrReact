import {useState} from "react";
import {useNavigate} from "react-router";

import {AnimatedButton} from "@components/atoms/AnimatedButton/AnimatedButton";
import {ModalAddToCartWindow} from "@components/molecules/ModalAddToCartWindow/ModalAddToCartWindow";
import {limitText} from "@/services/actions/limitText";
import {ProductInterface} from "@/services/interfaces/interfaces";

export const ProductCard = ({
                                id,
                                title,
                                description,
                                image,
                                price,
                            }: ProductInterface) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleCartButtonClick =
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation(); // This will prevent the event from bubbling up
            setIsModalOpen(true);
        };

    const handleProductCardClick = () => {
        navigate(`/product/${id}`);
    };

    return (
        <div onClick={handleProductCardClick}
             className="product-card p-4 m-4 bg-white shadow-md rounded-lg w-64 border-spacing-6 transition-transform
             duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
            <div
                className="product-image mb-4 flex justify-center items-center h-40 w-full overflow-hidden bg-white
                rounded-lg">
                <img
                    src={image}
                    alt={`${title} image`}
                    className="max-w-full max-h-full object-contain"
                />
            </div>
            <div className="product-title flex justify-center items-center pt-0 px-4 pb-4">
                <h2 className="text-mainText text-xl font-semibold">{title}</h2>
            </div>
            <div className="product-description flex justify-center items-center pt-0 px-4 pb-4">
                <p className="text-xs text-mainText">
                    {description ? limitText(description, 7) : ""}
                </p>
            </div>
            <div className="product-pricing-button flex justify-between items-center px-1 gap-2">
                <div className="product-price text-2xl text-mainText">${price}</div>
                <AnimatedButton
                    onClick={handleCartButtonClick}
                    text="Add To Cart"
                    isCartButton={true}
                />
            </div>
            {isModalOpen && (
                <ModalAddToCartWindow
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    product={{id, title, image, description, price}}
                />
            )}
        </div>
    );
};
