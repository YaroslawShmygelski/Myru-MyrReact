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
import {Pencil, Trash} from "lucide-react";
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

    const handleUpdateProduct = async () => {
      navigate(`/edit-product/${product.id}`);
    }

    return (
        <div className="relative flex flex-col gap-6 mb-40 p-8 bg-white shadow-xl rounded-lg w-4/5 mx-auto mt-12">
            <div className="flex gap-8 mb-6">
                <div className="w-64 h-64 overflow-hidden rounded-lg shadow-lg">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col justify-between flex-grow">
                    <h3 className="text-2xl text-mainText font-semibold mb-2">
                        {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        {limitText(product.description, 50)}
                    </p>

                    <div className="flex justify-between items-center mb-6">
                        <div className="product-price text-2xl font-semibold text-mainText">
                            ${changedPrice.toFixed(2)}
                        </div>

                        <div className="w-32">
                            <StyledNumberInput onInputValueChange={handleInputValue} />
                        </div>
                    </div>
                </div>
            </div>

            <Pencil
                className="cursor-pointer text-gray-700 hover:text-blue-500 duration-300 ease-in-out hover:scale-110 absolute top-4 right-4"
                onClick={handleUpdateProduct}
            />

            <Trash
                className="cursor-pointer text-gray-700 hover:text-red-500 duration-300 ease-in-out hover:scale-110 absolute bottom-6 right-6"
                onClick={handleDeleteProduct}
            />

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
    );
};
