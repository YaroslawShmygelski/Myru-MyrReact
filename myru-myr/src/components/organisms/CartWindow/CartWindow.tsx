import {AnimatedButton} from "@components/atoms/AnimatedButton/AnimatedButton";
import {CartProductElement} from "@/components/molecules/CartProductElement/CartProductElement";
import {X} from "lucide-react";
import "./styles.css";

import {motion} from "framer-motion";
import {updateProductQuantity} from "@/features/cart/cartSlice";
import {deleteProductFromCart} from "@/features/cart/cartSlice";

import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {useEscapeKey} from "@/hooks/hooks";
import {useState} from "react";
import {createOrder} from "@/services/api/orders";
import {Alert} from "@components/atoms/Alert/Alert";

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
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [buttonState, setButtonState] = useState<boolean>(true);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phone: string) => {
        const phoneRegex = /^\+48\(\d{9}\)$/;
        return phoneRegex.test(phone);
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
        } else if (!validatePhoneNumber(clientPhone)) {
            setClientPhoneError("Phone number must be in the format +48(*********)");
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

        setButtonState(hasError);

        if (!hasError) {
            try {
                const items = products.map((product) => ({
                    productId: product.id,
                    quantity: product.quantity,
                }));

                const response = await createOrder(clientName, clientAddress, clientPhone, clientEmail, items);
                if (response.order.id) {
                    setShowAlert(true);
                    setTimeout(() => {
                        setCartOpen(false);
                    }, 1000);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEscapeKey(() => setCartOpen(false), isOpen);

    if (!isOpen) return null;

    return (
        <div className="cart-overlay">
            {showAlert && <Alert url="/orders" title="Order Created Successfully" />}
            <motion.div
                className="cart-window"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0.5, y: -200 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0.5, y: 50 }}
                transition={{ duration: 0.3 }}
            >
                <button className="cart-close-button" onClick={() => setCartOpen(false)}>
                    <X size={24} />
                </button>

                <div className="mb-4">
                    <span className="cart-title">Your Cart</span>
                </div>

                <div className="cart-product-grid">
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
                                dispatch(deleteProductFromCart(product.id));
                            }}
                        />
                    ))}
                </div>

                <div className="mb-4 mt-12">
                    <label className="input-label" htmlFor="clientName">
                        Client Name
                    </label>
                    <input
                        type="text"
                        id="clientName"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className={`input-field ${clientNameError ? "error" : ""}`}
                        placeholder="Enter client name"
                    />
                    {clientNameError && <p className="input-error-text">{clientNameError}</p>}
                </div>

                <div className="mb-4">
                    <label className="input-label" htmlFor="clientAddress">
                        Client Address
                    </label>
                    <input
                        type="text"
                        id="clientAddress"
                        value={clientAddress}
                        onChange={(e) => setClientAddress(e.target.value)}
                        className={`input-field ${clientAddressError ? "error" : ""}`}
                        placeholder="Enter client address"
                    />
                    {clientAddressError && <p className="input-error-text">{clientAddressError}</p>}
                </div>

                <div className="mb-4">
                    <label className="input-label" htmlFor="clientPhone">
                        Client Phone
                    </label>
                    <input
                        type="text"
                        id="clientPhone"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className={`input-field ${clientPhoneError ? "error" : ""}`}
                        placeholder="Enter phone number"
                    />
                    {clientPhoneError && <p className="input-error-text">{clientPhoneError}</p>}
                </div>

                <div className="mb-4">
                    <label className="input-label" htmlFor="clientEmail">
                        Client Email
                    </label>
                    <input
                        type="email"
                        id="clientEmail"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className={`input-field ${clientEmailError ? "error" : ""}`}
                        placeholder="Enter email address"
                    />
                    {clientEmailError && <p className="input-error-text">{clientEmailError}</p>}
                </div>

                <div className="order-button-container">
                    <AnimatedButton
                        onClick={handleCreateOrder}
                        text="Place Order"
                        isCartButton={false}
                        isAble={buttonState} // Disable button if there's an error
                    />
                </div>
            </motion.div>
        </div>
    );
};
