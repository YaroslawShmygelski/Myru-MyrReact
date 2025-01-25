import {ProductDetailedViewPage} from "@/pages/ProductDetailedViewPage";
import {MainPage} from "@/pages/MainPage";
import {ShopPage} from "@/pages/ShopPage";
import {CreateProductPage} from "@/pages/CreateProductPage";
import {EditProductPage} from "@/pages/EditProductPage";
import {OrdersListPage} from "@/pages/OrdersListPage";

import {createBrowserRouter} from "react-router-dom";
import {Layout} from "./Layout";




export const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <MainPage/>,
                errorElement: <div>404 not found</div>,
            },
            {
                path: "/product/:id",
                element: <ProductDetailedViewPage/>,
            },
            {
                path: "/products",
                element: <ShopPage/>,
            },
            {
                path: "create-product",
                element: <CreateProductPage/>
            },
            {
                path: "edit-product/:productId",
                element: <EditProductPage/>

            },
            {
                path: "orders",
                element: <OrdersListPage/>

            }
        ],
    },
]);
