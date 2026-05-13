import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Product {
  id: number;
  names: string;
  image: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
  totalPrice: number;
}

interface CartStore {
  cart: CartItem[];
  increase: (product: Product, quantity: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getItemTotalPrice: (id: number) => number;
  getSubtotal: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      increase: (product, quantity) =>
        set((state) => {
          const existing = state.cart.find(
            (item) => item.id === product.id,
          );

          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + quantity,
                      totalPrice:
                        (item.quantity + quantity) * item.price,
                    }
                  : item,
              ),
            };
          }

          return {
            cart: [
              ...state.cart,
              {
                ...product,
                quantity,
                totalPrice: product.price * quantity,
              },
            ],
          };
        }),

      increaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  totalPrice: (item.quantity + 1) * item.price,
                }
              : item,
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => {
          const item = state.cart.find((i) => i.id === id);

          if (item && item.quantity === 1) {
            return {
              cart: state.cart.filter((i) => i.id !== id),
            };
          }

          return {
            cart: state.cart.map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                    totalPrice: (item.quantity - 1) * item.price,
                  }
                : item,
            ),
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ cart: [] }),

      getItemTotalPrice: (id) => {
        const item = get().cart.find((item) => item.id === id);
        return item ? item.price * item.quantity : 0;
      },

      getSubtotal: () =>
        get().cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        ),

      getTotalItems: () =>
        get().cart.reduce(
          (sum, item) => sum + item.quantity,
          0,
        ),
    }),
    {
      name: "cart-storage",
      version: 1,
    },
  ),
);