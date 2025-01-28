import { useEffect, useState } from "react";
import { AnimatedLoading } from "@components/atoms/AnimatedLoading/AnimatedLoading";
import {deleteOrder, getOrderPdf, getOrders} from "@/services/api/orders";
import { OrderInterface, ProductInOrderInterface } from "@/services/interfaces/interfaces";
import { Trash } from "lucide-react";

export const OrdersList = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [orders, setOrders] = useState<OrderInterface[]>([]);
    const [deletedOrderId, setDeletedOrderId] = useState<number | null>(null);

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

    const handleDeleteProduct = async (orderId: number) => {
        setDeletedOrderId(orderId);

        try {
            const response = await deleteOrder(orderId);
            console.log(response);

            setTimeout(() => {
                setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
            }, 500);
        } catch (error) {
            console.error("Error deleting order:", error);
        } finally {
            setDeletedOrderId(null);
        }
    };

    const handleGetOrderPdf = async (orderId: number) => {
        setLoading(true);
        const response = await getOrderPdf(orderId);
        console.log(response);
        setLoading(false);
    }

    if (loading) {
        return <AnimatedLoading />;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-500 text-xl">
                {error}
            </div>
        );
    }

    return (
        <div className="order-list flex mt-24 flex-col items-center gap-6 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
            {orders.length > 0 ? (
                orders.map((order) => (
                    <div
                        key={order.id}
                        className={`order-card p-6 bg-white shadow-lg rounded-lg w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 transition-all duration-500 ease-in-out ${
                            deletedOrderId === order.id
                                ? "opacity-0 scale-90"
                                : "hover:scale-105 hover:shadow-xl"
                        }`}
                    >
                        <div className="order-details mb-6">
                            <div className="order-title flex justify-between items-center pb-4">
                                <h2 className="text-mainText text-2xl font-semibold">Order #{order.id}</h2>
                                <span className="text-gray-600 text-xs">
                                    {new Date(order.orderDate).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="order-user flex flex-col items-start pb-4">
                                <p className="text-sm text-mainText font-semibold">Customer: {order.userName}</p>
                                <p className="text-sm text-mainText">Email: {order.userEmail}</p>
                                <p className="text-sm text-mainText">Phone: {order.userPhone}</p>
                                <p className="text-sm text-mainText">Address: {order.userAddress}</p>
                            </div>
                        </div>

                        <div className="order-items pb-4">
                            <div className="text-lg font-semibold text-mainText mb-2 text-center">
                                Order items:
                            </div>
                            {order.items.length > 0 ? (
                                <div className="order-items-list space-y-2">
                                    {order.items.map((item: ProductInOrderInterface) => (
                                        <div
                                            key={item.productName}
                                            className="order-item flex justify-between items-center border-b py-2"
                                        >
                                            <div className="w-2/5 text-sm text-mainText font-semibold truncate">
                                                {item.productName}
                                            </div>
                                            <div className="w-1/5 text-sm text-mainText font-semibold text-center">
                                                {item.price}
                                            </div>
                                            <div className="w-1/5 text-sm text-mainText font-semibold text-center">
                                                {item.itemTotal}
                                            </div>
                                            <div className="w-1/5 text-sm text-gray-500 text-center">x{item.quantity}</div>
                                        </div>
                                    ))}
                                    <div className="text-lg font-semibold text-mainText mb-2 text-center">
                                        Total Price: {order.totalOrderPrice}
                                    </div>
                                </div>
                            ) : (
                                <div className="order-items-list space-y-2 text-gray-500 text-center">
                                    No items in this order
                                </div>
                            )}
                        </div>

                        <div className="order-action-button flex justify-center items-center gap-4 mt-6">
                            <button onClick={() => handleGetOrderPdf(order.id)}
                                    className="bg-blue-600 p-3 rounded-lg text-white font-semibold hover:bg-blue-700 transition-all duration-300 ease-in-out">
                                Get Order's Pdf
                            </button>
                        </div>

                        <div className="bottom-4 right-4">
                            <Trash
                                onClick={() => handleDeleteProduct(order.id)}
                                className="cursor-pointer text-gray-700 hover:text-red-500 duration-300 ease-in-out hover:scale-110"
                            />
                        </div>
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