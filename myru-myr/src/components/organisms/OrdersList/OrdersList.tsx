import { useEffect, useState } from "react";
import { AnimatedLoading } from "@components/atoms/AnimatedLoading/AnimatedLoading";
import { getOrders } from "@/services/api/orders";
import {OrderInterface, ProductInOrderInterface} from "@/services/interfaces/interfaces";

export const OrdersList = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [orders, setOrders] = useState<OrderInterface[]>([]);


    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const orders: OrderInterface[] = await getOrders();
                setOrders(orders);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load order data. Please try again later."
                );
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return <AnimatedLoading />;
    }
    console.log(orders);

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-500 text-xl">
                {error}
            </div>
        );
    }

    return (
        <div className="order-list flex mt-24 flex-col items-center gap-6">
            {orders.length > 0 ? (
                orders.map((order) => (
                    <div
                        key={order.id}
                        className="order-card p-4 bg-white shadow-md rounded-lg w-4/5 sm:w-4/5 md:w-4/5 lg:w-4/5 xl:w-4/5 border-spacing-6 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                    >
                        <div className="order-details mb-4">
                            <div className="order-title flex justify-between items-center pt-0 px-4 pb-4">
                                <h2 className="text-mainText text-xl font-semibold">
                                    Order #{order.id}
                                </h2>
                                <span className="text-mainText text-xs">
                            {new Date(order.orderDate).toLocaleDateString()}
                        </span>
                            </div>
                            <div className="order-user flex flex-col items-start pt-0 px-4 pb-4">
                                <p className="text-sm text-mainText font-semibold">
                                    Customer: {order.userName}
                                </p>
                                <p className="text-sm text-mainText">Email: {order.userEmail}</p>
                                <p className="text-sm text-mainText">Phone: {order.userPhone}</p>
                                <p className="text-sm text-mainText">Address: {order.userAddress}</p>
                            </div>
                        </div>
                        <div className="order-items pt-0 px-4 pb-4">
                            <div className="text-lg font-semibold text-mainText mb-2 text-center"> Order items: </div>
                                {order.items.length > 0 ? (
                                    <div className="order-items-list space-y-2">
                                        {order.items.map((item: ProductInOrderInterface) => (
                                            <div key={item.productName}
                                                 className="order-item flex justify-between items-center">
                                                <p className="text-sm text-mainText font-semibold">{item.productName}</p>
                                                <p className="text-sm text-gray-500">x{item.quantity}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="order-items-list space-y-2 text-gray-500 text-center">No items in this order</div>
                                )}
                        </div>

                            <div className="order-action-button flex justify-between items-center px-1 gap-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent bubbling
                                        setIsModalOpen(true);
                                    }}
                                    className="text-mainText bg-blue-500 p-2 rounded-lg text-white"
                                >
                                    View Details
                                </button>
                            </div>
                            {isModalOpen && (
                                <div
                                    className="modal bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    <div
                                        className="modal-content bg-white p-4 rounded-lg"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <h2 className="text-mainText text-xl">Order #{order.id} Details</h2>
                                        {/* Add modal content here */}
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="bg-red-500 text-white p-2 rounded-lg"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        ))
                        ) : (
                        <div className="flex items-center justify-center min-h-screen text-mainText text-xl">
                    No orders found.
                </div>
            )}
        </div>

    );
};
