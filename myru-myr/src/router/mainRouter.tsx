import App from "@/App";
import { Header } from "@components/organisms/Header/Header";
// import { ProductCardsGrid } from "@components/organisms/ProductCardsGrid/ProductCardsGrid";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/nav",
    element: <Header />,
  },
]);
