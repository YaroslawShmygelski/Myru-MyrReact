import axios from "axios";
import {BackendProduct} from "../interfaces/interfaces";

export const getProducts = async () => {
    const response = await axios.get<BackendProduct[]>(
        `${import.meta.env.VITE_BACKEND_URL3}/Products`
    );
    return response.data;
};

export const getProduct = async (productID: number) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL3}/Products/${productID}`
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 404) {
                    throw new Error("Product not found. Please check the product ID.");
                }
                throw new Error(
                    `Error ${error.response.status}: ${error.response.statusText}`
                );
            } else if (error.request) {
                throw new Error("No response from server. Please try again later.");
            }
        }
        throw new Error("An unexpected error occurred. Please try again.");
    }
};

export const createProduct = async (
    name: string,
    description: string,
    price: number,
    image: File,
) => {
    try {
        const code = Math.floor(Math.random() * 1000) + 1;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("code", code.toString());
        formData.append("image", image);
        formData.append("description", description);
        formData.append("price", price.toString());

        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL3}/Products`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.status;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error creating product", error.code);
        } else {
            console.error("An unexpected error occurred:", error);
        }
        throw new Error("Failed to create product");
    }
};

export const removeProduct = async (productID: number) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL3}/Products/${productID}`)
        return response.status;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            console.error("Error deleting product", error.code);
        } else {
            console.error("An unexpected error occurred:", error);
        }
        throw new Error("Failed to delete product");
    }
}

export const updateProduct =
    async (productID: number, name: string, description: string, price: number, image: File) => {
        try {
            const code = Math.floor(Math.random() * 1000) + 1;
            const formData = new FormData();
            formData.append("name", name);
            formData.append("code", code.toString());
            formData.append("image", image);
            formData.append("description", description);
            formData.append("price", price.toString());

            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL3}/Products/${productID}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return response.status;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Error updating product", error.code);
            } else {
                console.error("An unexpected error occurred:", error);
            }
            throw new Error("Failed to update product");
        }

    }