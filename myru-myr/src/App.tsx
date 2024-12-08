import GlobalStyle from "./style";
import { ProductCardsGrid } from "@/components/organisms/ProductCardsGrid/ProductCardsGrid";
import { Header } from "@components/organisms/Header/Header";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <GlobalStyle />
        <Header />
        <ProductCardsGrid />
      </Provider>
    </>
  );
}
