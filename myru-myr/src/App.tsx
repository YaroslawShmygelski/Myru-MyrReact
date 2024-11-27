import GlobalStyle from "./style";
import { ProductCardsGrid } from "@/components/organisms/ProductCardsGrid/ProductCardsGrid";
import { Header } from "@components/organisms/Header/Header";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <ProductCardsGrid />
    </>
  );
}
