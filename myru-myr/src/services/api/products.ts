import axios from "axios";
import { ProductInterface } from "../interfaces/interfaces";

export const getProducts = async () => {
  const response = await axios.get<ProductInterface[]>(
    `${import.meta.env.VITE_BACKEND_URL}`
  );
  return response.data;
};
