export interface ProductInterface {
  id: number;
  title: string;
  price: number;
  description: string;
}

export interface BackendProduct {
  id: number;
  name: string; // 'name' from backend
  price: number;
  description: string;
}
