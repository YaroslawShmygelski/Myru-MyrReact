import axios from 'axios';

interface createOrderRequestProps {
    productId: number;
    quantity: number;
}

export const createOrder = async (
    userName: string,
    userEmail: string,
    userPhone: string,
    userAddress: string,
    items: createOrderRequestProps[]
) => {
    const payload = {
        userName,
        userEmail,
        userPhone,
        userAddress,
        items,
    };

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL3}/Orders/`,
            payload, // Sending JSON payload
            {
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            console.error("Error Creating Order", error.code);
        } else {
            console.error("An unexpected error occurred:", error);
        }
        throw new Error("Failed to create order");
    }
};

export const getOrders = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL3}/Orders/`);
        return response.data;
    }
    catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            console.error("Error fetching Orders", error.code);
        } else {
            console.error("An unexpected error occurred:", error);
        }
        throw new Error("Failed to get orders");
    }
}
