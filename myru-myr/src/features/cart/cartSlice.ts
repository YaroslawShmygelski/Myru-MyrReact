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
            console.log(newItem);
            const product = state.items.find((item) => item.id === newItem.id);
            if (product) {
                product.quantity += newItem.quantity;
                state.totalItems += newItem.quantity;
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
        deleteProductFromCart: (state, action: PayloadAction<number>) => {
            const newItemId = action.payload;
            const product = state.items.find((item) => item.id == newItemId);
            if (product) {
                state.items = state.items.filter((item) => item.id !== product.id);
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
    updateProductQuantity,
    clearCart,
    deleteProductFromCart
} = cartSlice.actions;

export default cartSlice.reducer;
