import { ProductDetailedViewPage } from "@/pages/ProductDetailedViewPage";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { MainPage } from "@/pages/MainPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <div>home</div>,
        errorElement: <div>404 not found</div>,
      },
      {
        path: "/product/:id",
        element: <ProductDetailedViewPage />,
      },
      {
        path: "/products",
        element: <MainPage />,
      },
    ],
  },
]);
