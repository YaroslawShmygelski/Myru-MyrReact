import {useEffect, useState} from "react";

import {AnimatedButton} from "@components/atoms/AnimatedButton/AnimatedButton";
import {AnimatedLoading} from "@components/atoms/AnimatedLoading/AnimatedLoading";
import {StyledNumberInput} from "@components/atoms/StyledNumberInput/StyledNumberInput";

import {addItemToCart} from "@/features/cart/cartSlice";
import {useAppDispatch} from "@/hooks/reduxHooks";
import {limitText} from "@/services/actions/limitText";
import {getProduct} from "@/services/api/products";
import {removeProduct} from "@/services/api/products";
import {ProductInterface} from "@/services/interfaces/interfaces";
import {ReduxProductType} from "@/types/reduxTypes";
import {Trash} from "lucide-react";
import {useNavigate} from "react-router";

interface ProductDetailedViewProps {
    productId: number;
}

export const ProductDetailedView = ({
                                        productId,
                                    }: ProductDetailedViewProps) => {
    const [product, setProduct] = useState<ProductInterface | null>(null);
    const [initialPrice, setInitialPrice] = useState<number>(0);
    const [changedPrice, setChangedPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProduct(productId);

                if (!data) {
                    throw new Error("Product data is empty or invalid");
                }

                const mappedProduct: ProductInterface = {
                    id: data.id,
                    title: data.name,
                    price: data.price,
                    description: data.description,
                    image: `${import.meta.env.VITE_PATH_TO_IMAGES}` + data.imagePath,
                };

                setProduct(mappedProduct);
                setInitialPrice(mappedProduct.price);
            } catch (e) {
                console.error("Error fetching product:", e);

                setError(
                    e instanceof Error
                        ? e.message
                        : "Failed to load product data. Please try again later."
                );
            }
        };

        fetchProduct();
    }, [productId]);

    useEffect(() => {
        const fixedPrice = parseFloat((initialPrice * quantity).toFixed(2));
        setChangedPrice(fixedPrice);
    }, [quantity, initialPrice]);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!product) {
        return <AnimatedLoading/>;
    }

    const handleAddToCart = (product: ReduxProductType) => {
        dispatch(addItemToCart(product));
    };

    const handleInputValue = (value: number) => {
        setQuantity(value);
    };

    const handleDeleteProduct = async () => {
        const status = await removeProduct(product.id);
        if (status == 204) {
            navigate("/")
        }
        else{
            setError("Unexpected error while deleting Product");
        }
    }

    return (
        <div className="flex flex-col gap-4 mb-40 p-6 bg-white shadow-lg rounded-lg">
            <div className="flex gap-4 mb-4">
                <div className="w-32 h-32">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain rounded-lg"
                    />
                </div>

                <div className="flex flex-col justify-between flex-grow">
                    <h3 className="text-lg text-mainText font-semibold">
                        {product.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {limitText(product.description, 30)}
                    </p>

                    <div className="flex justify-between items-center pt-4 gap-2">
                        <div className="product-price text-xl font-semibold text-mainText">
                            ${changedPrice.toFixed(2)}
                        </div>

                        <div className="w-40">
                            <StyledNumberInput onInputValueChange={handleInputValue}/>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatedButton
                onClick={() =>
                    handleAddToCart({
                        id: product.id,
                        title: product.title,
                        description: product.description,
                        price: product.price,
                        quantity: quantity !== 0 ? quantity : 0,
                        image: product.image
                    })
                }
                text="Add To Cart"
                isCartButton={true}
                isAble={quantity > 0}
            />

            <Trash className="cursor-pointer text-gray-700 hover:text-red-500  duration-300 ease-in-out
                           hover:scale-105" onClick={handleDeleteProduct}/>
        </div>
    );
};
