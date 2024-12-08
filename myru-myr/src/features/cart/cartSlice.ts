import { productType } from "@/types/reduxTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface cartState {
  items: productType[];
  totalItems: number;
}

const initialState: cartState = {
  items: [],
  totalItems: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<productType>) => {
      const newItem = action.payload;
      console.log(action);
      const existingItem = state.items.find((item) => item.id == newItem.id);

      if (existingItem) {
        existingItem.quantity++;
        state.totalItems++;
      } else {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          description: newItem.description,
          price: newItem.price,
          quantity: newItem.quantity,
        });
      }
    },
  },
});

export const { addItemToCart } = cartSlice.actions;

export default cartSlice.reducer;
