import { ShoppingBag } from "lucide-react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <nav className="bg-customBlue px-4 py-8 font-sans text-white">
      <div className="container mx-auto flex items-center justify-between">
        <ul className="flex space-x-10">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative pb-1 before:content-[''] before:absolute before:w-full before:h-[2px] before:bottom-0 before:left-0 before:bg-white before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100 ${
                  isActive ? "font-bold text-mainText" : ""
                }`
              }
            >
              <span className="text-xl tracking-wide hover:text-lightGray">
                Home
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `relative pb-1 before:content-[''] before:absolute before:w-full before:h-[2px] before:bottom-0 before:left-0 before:bg-white before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100 ${
                  isActive ? "font-bold text-mainText" : ""
                }`
              }
            >
              <span className="text-xl tracking-wide hover:text-lightGray">
                Shop
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/info"
              className={({ isActive }) =>
                `relative pb-1 before:content-[''] before:absolute before:w-full before:h-[2px] before:bottom-0 before:left-0 before:bg-white before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100 ${
                  isActive ? "font-bold text-mainText" : ""
                }`
              }
            >
              <span className="text-xl tracking-wide hover:text-lightGray">
                Info
              </span>
            </NavLink>
          </li>
        </ul>
        <div>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative pb-1 before:content-[''] before:absolute before:w-full before:h-[2px] before:bottom-0 before:left-0 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100 ${
                isActive ? "font-bold text-mainText" : ""
              }`
            }
          >
            <ShoppingBag className="text-3xl hover:text-lightGray" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
