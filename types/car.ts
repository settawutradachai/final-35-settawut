export type Car = {
  brand: string;
  model: string;
  year: string;
  description: string;
  imageUrl?: string;
};

export const ASYNC_STORAGE_CARS_KEY = "cars";
