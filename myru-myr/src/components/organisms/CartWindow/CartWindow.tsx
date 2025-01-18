import {AnimatedButton} from "@components/atoms/AnimatedButton/AnimatedButton";
import {CartProductElement} from "@/components/molecules/CartProductElement/CartProductElement";
import {X} from "lucide-react"; // Assuming this is the Lucid React close icon component
import "./styles.css";

import {motion} from "framer-motion";
import {updateProductQuantity} from "@/features/cart/cartSlice";
import {deleteProductFromCart} from "@/features/cart/cartSlice";

import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {useEscapeKey} from "@/hooks/hooks";
import {useState} from "react";

interface CartWindowProps {
    isOpen: boolean;
    setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CartWindow = ({isOpen, setCartOpen}: CartWindowProps) => {
    const products = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();

    const [clientName, setClientName] = useState<string>("");
    const [clientAddress, setClientAddress] = useState<string>("");
    const [clientPhone, setClientPhone] = useState<string>("");
    const [clientEmail, setClientEmail] = useState<string>("");

    const [clientNameError, setClientNameError] = useState<string | null>(null);
    const [clientAddressError, setClientAddressError] = useState<string | null>(null);
    const [clientPhoneError, setClientPhoneError] = useState<string | null>(null);
    const [clientEmailError, setClientEmailError] = useState<string | null>(null);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleCreateOrder = async () => {
        let hasError = false;

        if (!clientName) {
            setClientNameError("Client name is required");
            hasError = true;
        } else {
            setClientNameError(null);
        }

        if (!clientAddress) {
            setClientAddressError("Client address is required");
            hasError = true;
        } else {
            setClientAddressError(null);
        }

        if (!clientPhone) {
            setClientPhoneError("Client phone is required");
            hasError = true;
        } else if (!/^\d{10}$/.test(clientPhone)) {
            setClientPhoneError("Phone number must be 10 digits");
            hasError = true;
        } else {
            setClientPhoneError(null);
        }

        if (!clientEmail) {
            setClientEmailError("Client email is required");
            hasError = true;
        } else if (!validateEmail(clientEmail)) {
            setClientEmailError("Invalid email address");
            hasError = true;
        } else {
            setClientEmailError(null);
        }

        if (!hasError) {
            console.log("Order placed successfully", {clientName, clientAddress, clientPhone, clientEmail});
        }
    };

    useEscapeKey(() => setCartOpen(false), isOpen);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <motion.div
                className="bg-white rounded-lg shadow-lg p-6 w-5/6 max-h-[80vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
                initial={{opacity: 0.5, y: -200}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0.5, y: 50}}
                transition={{duration: 0.3}}
            >

                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    onClick={() => setCartOpen(false)}
                >
                    <X size={24} />
                </button>

                <div className="mb-4">
                    <span className="block text-center text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Your Cart
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {products.map((product) => (
                        <CartProductElement
                            key={product.id}
                            product={product}
                            onQuantityChange={(newQuantity) =>
                                dispatch(
                                    updateProductQuantity({
                                        id: product.id,
                                        quantity: newQuantity,
                                    })
                                )
                            }
                            onDeleteProduct={() => {
                                dispatch(deleteProductFromCart(product.id))
                            }}
                        />
                    ))}
                </div>

                <div className="mb-4 mt-12">
                    <label className="block text-sm font-medium text-[#363842] mb-2" htmlFor="clientName">
                        Client Name
                    </label>
                    <input
                        type="text"
                        id="clientName"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className={`mt-1 p-3 border ${clientNameError ? "border-red-500" : "border-[#E0E0E0]"} text-black bg-white rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-[#2667FF] focus:border-[#2667FF] transition duration-300`}
                        placeholder="Enter client name"
                    />
                    {clientNameError && <p className="text-red-500 text-xs mt-1">{clientNameError}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#363842] mb-2" htmlFor="clientAddress">
                        Client Address
                    </label>
                    <input
                        type="text"
                        id="clientAddress"
                        value={clientAddress}
                        onChange={(e) => setClientAddress(e.target.value)}
                        className={`mt-1 p-3 border ${clientAddressError ? "border-red-500" : "border-[#E0E0E0]"} text-black bg-white rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-[#2667FF] focus:border-[#2667FF] transition duration-300`}
                        placeholder="Enter client address"
                    />
                    {clientAddressError && <p className="text-red-500 text-xs mt-1">{clientAddressError}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#363842] mb-2" htmlFor="clientPhone">
                        Client Phone
                    </label>
                    <input
                        type="text"
                        id="clientPhone"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className={`mt-1 p-3 border ${clientPhoneError ? "border-red-500" : "border-[#E0E0E0]"} text-black bg-white rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-[#2667FF] focus:border-[#2667FF] transition duration-300`}
                        placeholder="Enter phone number"
                    />
                    {clientPhoneError && <p className="text-red-500 text-xs mt-1">{clientPhoneError}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#363842] mb-2" htmlFor="clientEmail">
                        Client Email
                    </label>
                    <input
                        type="email"
                        id="clientEmail"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className={`mt-1 p-3 border ${clientEmailError ? "border-red-500" : "border-[#E0E0E0]"} text-black bg-white rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-[#2667FF] focus:border-[#2667FF] transition duration-300`}
                        placeholder="Enter email address"
                    />
                    {clientEmailError && <p className="text-red-500 text-xs mt-1">{clientEmailError}</p>}
                </div>

                <div className="pt-5">
                    <AnimatedButton
                        onClick={handleCreateOrder}
                        text="Place Order"
                        isCartButton={false}
                    ></AnimatedButton>
                </div>
            </motion.div>
        </div>
    );
};
