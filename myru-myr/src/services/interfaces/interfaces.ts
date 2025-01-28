export interface ProductInterface {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

export interface BackendProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  imagePath: string;
}

export interface OrderInterface {
  id: number;
  "orderDate": string,
  "items": [],
  "userName": string,
  "userEmail": string,
  "userPhone": string,
  "userAddress": string
  "totalOrderPrice": number,
}

export interface ProductInOrderInterface {
  id: number;
  productName: string;
  quantity: number;
  "price": number;
  "itemTotal": number;
}

