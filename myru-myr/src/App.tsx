import GlobalStyle from "./style";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { RouterProvider } from "react-router";
import { router } from "./router/mainRouter";

export default function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </Provider>
  );
}
