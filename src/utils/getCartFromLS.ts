import { CartItem } from "../redux/slices/cartSlice";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLs = () => {
  const data = localStorage.getItem("cart");

  if (!data) {
    return {
      items: [],
      totalPrice: 0,
    };
  }

  const parsed = JSON.parse(data);
  const items = parsed.items || [];

  return {
    items: items as CartItem[],
    totalPrice: parsed.totalPrice || calcTotalPrice(items),
  };
};


