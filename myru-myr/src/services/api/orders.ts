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
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            console.error("Error fetching Orders", error.code);
        } else {
            console.error("An unexpected error occurred:", error);
        }
        throw new Error("Failed to get orders");
    }
}

export const deleteOrder = async (id: number) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL3}/Orders/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            console.error("Error deleting Order", error.code);
        } else {
            console.error("An unexpected error occurred:", error);
        }
        throw new Error("Failed to delete order");
    }
}


export const getOrderPdf = async (orderId: number) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL3}/Orders/get-pdf/${orderId}`, {
            responseType: 'blob'  // Ensure response is treated as a binary blob
        });

        // Create a URL for the PDF Blob and trigger the download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Order_${orderId}.pdf`);  // Set filename for the download
        document.body.appendChild(link);
        link.click();

        // Clean up the object URL
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error generating or downloading PDF:", error);
    }
}

