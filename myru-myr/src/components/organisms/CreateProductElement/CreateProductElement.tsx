import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {AnimatedButton} from "@components/atoms/AnimatedButton/AnimatedButton";
import {createProduct} from "@/services/api/products";

export const CreateProductElement = () => {
    const [productName, setProductName] = useState<string>("");
    const [productPrice, setProductPrice] = useState<string>("");
    const [productDescription, setProductDescription] = useState<string>("");
    const [productImage, setProductImage] = useState<File | null >(null);

    const [error, setError] = useState<string | null>(null);

    const [productNameError, setProductNameError] = useState<string | null>(null);
    const [productPriceError, setProductPriceError] = useState<string | null>(null);
    const [productDescriptionError, setProductDescriptionError] = useState<string | null>(null);
    const [productImageError, setProductImageError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleCreateProduct = async () => {
        setProductNameError(null);
        setProductPriceError(null);
        setProductDescriptionError(null);
        setProductImageError(null);
        setError(null);

        let hasError = false;

        if (!productName) {
            setProductNameError("Product name is required");
            hasError = true;
        }

        if (!productPrice) {
            setProductPriceError("Price is required");
            hasError = true;
        } else if (Number(productPrice) <= 0) {
            setProductPriceError("Price must be greater than 0");
            hasError = true;
        }

        if (!productDescription) {
            setProductDescriptionError("Description is required");
            hasError = true;
        }

        if (!productImage) {
            setProductImageError("Product image is required");
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try {
            const status = await createProduct(productName, productDescription, parseInt(productPrice), productImage!);

            if (status === 201) {
                navigate("/");

                setProductName("");
                setProductPrice("");
                setProductDescription("");
                setProductImage(null);
            } else {
                setError("Failed to create product. Please try again.");

            }
        } catch (err) {
            setError("Failed to create product. Please try again.");
            console.error("Product creation error", err);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProductImage(file);
        }
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!value || /^\d*\.?\d*$/.test(value)) {
            setProductPrice(value);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9FAFB] p-6">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl text-[#363842] font-semibold text-center mb-6">Create New Product</h2>

                {error && <div className="text-red-500 text-center mb-4 font-medium">{error}</div>}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#363842] mb-2" htmlFor="productName">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className={`mt-1 p-3 border ${productNameError ? "border-red-500" : "border-[#E0E0E0]"} rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-[#2667FF] focus:border-[#2667FF] transition duration-300`}
                        placeholder="Enter product name"
                    />
                    {productNameError && <p className="text-red-500 text-xs mt-1">{productNameError}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#363842] mb-2" htmlFor="productPrice">
                        Price
                    </label>
                    <input
                        type="text"
                        id="productPrice"
                        value={productPrice}
                        onChange={handlePriceChange}
                        className={`mt-1 p-3 border ${productPriceError ? "border-red-500" : "border-[#E0E0E0]"} rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-[#2667FF] focus:border-[#2667FF] transition duration-300`}
                        placeholder="Enter price"
                    />
                    {productPriceError && <p className="text-red-500 text-xs mt-1">{productPriceError}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#363842] mb-2" htmlFor="productDescription">
                        Description
                    </label>
                    <textarea
                        id="productDescription"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        className={`mt-1 p-3 border ${productDescriptionError ? "border-red-500" : "border-[#E0E0E0]"} rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-[#2667FF] focus:border-[#2667FF] transition duration-300`}
                        placeholder="Enter product description"
                        rows={4}
                    />
                    {productDescriptionError && <p className="text-red-500 text-xs mt-1">{productDescriptionError}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#363842] mb-2" htmlFor="productImage">
                        Product Image (Upload from Computer)
                    </label>
                    <label
                        htmlFor="productImage"
                        className="cursor-pointer mt-1 p-3 border border-[#E0E0E0] rounded-lg shadow-sm w-full flex justify-center items-center bg-[#2667FF] text-white hover:bg-[#1A53CC] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#1A53CC] focus:border-[#1A53CC]"
                    >
                        <span>Choose a file</span>
                        <input
                            type="file"
                            id="productImage"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                    {productImageError && <p className="text-red-500 text-xs mt-1">{productImageError}</p>}
                </div>

                <div className="mt-6 flex justify-center">
                    <AnimatedButton
                        onClick={handleCreateProduct}
                        text="Create Product"
                        isAble={!!(productName && productPrice && productDescription && productImage)}
                        isCartButton={false}
                    />
                </div>
            </div>
        </div>
    );
};
