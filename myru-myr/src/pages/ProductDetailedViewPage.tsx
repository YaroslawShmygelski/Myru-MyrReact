import {ProductDetailedView} from "@components/organisms/ProductDetailedView/ProductDetailedView";
import {useParams} from "react-router";

export const ProductDetailedViewPage = () => {
    const {id} = useParams<{ id: string }>();
    const productId = parseInt(id!, 10);
    return (
        <div>
            <ProductDetailedView productId={productId}/>
        </div>
    );
};
