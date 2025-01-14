import {ReduxProductType} from "@/types/reduxTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface cartState {
    items: ReduxProductType[];
    totalItems: number;
}

const initialState: cartState = {
    items: (() => {
        const cart = localStorage.getItem("cart");
        try {
            const parsedCart = cart ? JSON.parse(cart) : [];
            return Array.isArray(parsedCart) ? parsedCart : [];
        } catch (error) {
            console.log(error);
            return [];
        }
    })(),
    totalItems: localStorage.getItem("totalItems")
        ? parseInt(localStorage.getItem("totalItems")!)
        : 0,
};
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<ReduxProductType>) => {
            const newItem = action.payload;
            const product = state.items.find((item) => item.id === newItem.id);
            if (product) {
                product.quantity++;
                state.totalItems++;
            } else {
                state.items.push({
                    id: newItem.id,
                    title: newItem.title,
                    description: newItem.description,
                    price: newItem.price,
                    quantity: newItem.quantity,
                });
                state.totalItems += newItem.quantity;
            }
        },
        removeItemFromCart: (state, action: PayloadAction<ReduxProductType>) => {
            const newItem = action.payload;
            const product = state.items.find((item) => item.id == newItem.id);
            if (product) {
                if (product.quantity == 1) {
                    console.log("delete");
                    state.items = state.items.filter((item) => item.id !== product.id);
                } else {
                    product.quantity -= newItem.quantity;
                    state.totalItems -= newItem.quantity;
                }
            }
        },
        updateProductQuantity: (
            state,
            action: PayloadAction<{ id: number; quantity: number }>
        ) => {
            const {id, quantity} = action.payload;
            const product = state.items.find((item) => item.id === id);
            if (product) {
                const quantityChange = quantity - product.quantity;
                product.quantity = quantity;
                state.totalItems += quantityChange;
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalItems = 0;
        },
    },
});

export const {
    addItemToCart,
    removeItemFromCart,
    updateProductQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
