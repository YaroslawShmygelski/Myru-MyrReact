import {useParams} from "react-router"
import {EditProductElement} from "@components/organisms/EditProductElement/EditProductElement";
import {isNumber} from "@mui/base/unstable_useNumberInput/utils";

export const EditProductPage = () => {
    const { productId } = useParams();
    console.log(productId);

    if (!productId) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-500 text-xl">
                No product Id found
            </div>
        )
    }

    if (isNumber(productId)) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-500 text-xl">
                Incorrect product ID
            </div>
        )
    }

    return (
        <>
            <EditProductElement productId={parseInt(productId)}/>
        </>
    )
}