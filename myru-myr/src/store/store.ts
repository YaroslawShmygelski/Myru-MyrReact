import { isAction, configureStore, Middleware } from "@reduxjs/toolkit";
import cartSlice from "@/features/cart/cartSlice";

const localStorageMiddleware: Middleware = (api) => (next) => (action) => {
  const response = next(action);
  if (isAction(action)) {
    if (action.type.startsWith("cart/")) {
      const state = api.getState();
      const cart = state.cart.items;
      if (cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("totalItems", state.totalItems);
      }
    }
  }

  return response;
};

export const store = configureStore({
  reducer: { cart: cartSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
