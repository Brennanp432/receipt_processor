import { Item } from "./Item";

export type Receipt = {
  id: string;
  retailer: string;
  purchaseDate: string;
  purchaseTime: string;
  items: Item[];
  total: string;
  points: number;
};
