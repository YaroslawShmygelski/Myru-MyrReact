import {NavLink} from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-12">
            <div className="container mx-auto text-center">
                <ul className="flex flex-wrap justify-center space-x-10 text-lg md:text-xl mb-4">
                    <li>
                        <NavLink
                            to="/"
                            className={({isActive}) =>
                                `relative pb-1 before:content-[''] before:absolute before:w-full before:h-[2px] before:bottom-0 before:left-0 before:bg-white before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100 ${
                                    isActive ? "font-bold text-white" : "text-lightGray"
                                }`
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/products"
                            className={({isActive}) =>
                                `relative pb-1 before:content-[''] before:absolute before:w-full before:h-[2px] before:bottom-0 before:left-0 before:bg-white before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100 ${
                                    isActive ? "font-bold text-white" : "text-lightGray"
                                }`
                            }
                        >
                            Shop
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/create-product"
                            className={({isActive}) =>
                                `relative pb-1 before:content-[''] before:absolute before:w-full before:h-[2px] before:bottom-0 before:left-0 before:bg-white before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100 ${
                                    isActive ? "font-bold text-white" : "text-lightGray"
                                }`
                            }
                        >
                            Create Product
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/orders"
                            className={({isActive}) =>
                                `relative pb-1 before:content-[''] before:absolute before:w-full before:h-[2px] before:bottom-0 before:left-0 before:bg-white before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100 ${
                                    isActive ? "font-bold text-white" : "text-lightGray"
                                }`
                            }
                        >
                            Your Orders
                        </NavLink>
                    </li>
                </ul>

                <div className="mt-4">
                    <a href="/about" className="text-gray-400 hover:text-white mx-2">About Us</a>
                    <a href="/contact" className="text-gray-400 hover:text-white mx-2">Contact</a>
                    <a href="/privacy-policy" className="text-gray-400 hover:text-white mx-2">Privacy Policy</a>
                </div>
                <div className="mt-4">
                    <a href={import.meta.env.VITE_FACEBOOK_URL} target="_blank"
                       className="text-gray-400 hover:text-white mx-2">Facebook</a>
                    <a href={import.meta.env.VITE_X_URL} target="_blank"
                       className="text-gray-400 hover:text-white mx-2">X</a>
                    <a href={import.meta.env.VITE_INSTAGRAM_URL} target="_blank"
                       className="text-gray-400 hover:text-white mx-2">Instagram</a>
                </div>
                <p className="text-sm mt-4">Designed with
                    <span className="text-red-500"> ♥ </span>
                        by Yaroslav Shmyhelskyi
                </p>
                <p className="text-sm mt-4">&copy; 2025 My E-Commerce Store. All rights reserved.</p>
            </div>
        </footer>
    );
};
