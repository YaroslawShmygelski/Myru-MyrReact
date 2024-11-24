// import { ProductCart } from "@components/molecules/ProductCart/ProductCart";
import GlobalStyle from "./style";
import { ProductCardsGrid } from "@/components/organisms/ProductCardsGrid/ProductCardsGrid";

export default function App() {
  return (
    <>
      <GlobalStyle />
      {/* <ProductCart
        productImage="/product1.jpg"
        productTitle="Best-Product"
        productDescription="Lorem Ipsum is simply dummy text of 
        the printing and typesetting industry. Lorem Ipsum has 
        been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make 
        a type specimen book. It has survived not only five centuries,"
        productPrice={200.0}
      /> */}
      <ProductCardsGrid />
    </>
  );
}
