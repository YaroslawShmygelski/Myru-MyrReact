import { ShoppingCart } from "lucide-react";
import { useState } from "react";

interface AnimatedButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    text: string;
    isCartButton: boolean;
    isAble?: boolean;
}

interface AnimatedButtonPropsNoEvent {
    onClick: () => void;
    text: string;
    isCartButton: boolean;
    isAble?: boolean;
}


type AnimatedButtonPropsUnion = AnimatedButtonProps | AnimatedButtonPropsNoEvent;

export const AnimatedButton = ({
                                   onClick,
                                   text,
                                   isCartButton,
                                   isAble = true,
                               }: AnimatedButtonPropsUnion) => {
    const [effect, setEffect] = useState<boolean>(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setEffect(true);
        if ("stopPropagation" in event) {

            event.stopPropagation();
        }
        onClick(event);
    };

    return (
        <div className="product-cart flex justify-center items-center">
            <button
                className={`flex items-center gap-1 px-3 py-3 text-white rounded-[7px] bg-customBlue hover:bg-customBlue700 hover:shadow-xl ${
                    effect ? "animate-press" : ""
                }`}
                onClick={(event) => handleClick(event)} // Pass event to handleClick
                onAnimationEnd={() => setEffect(false)}
                disabled={!isAble}
            >
                {isCartButton && <ShoppingCart size={18} />}
                <p className="text-xs">{text}</p>
            </button>
        </div>
    );
};
