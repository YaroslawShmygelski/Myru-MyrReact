import { ProductCardsGrid } from "@components/organisms/ProductCardsGrid/ProductCardsGrid";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductCardsGrid />,
  },
]);
