"use client";

import React from "react";
import { useCartStore } from "../store/useStoreCart";
import {
  MapPin,
  CurrencyDollar,
  CreditCard,
  Bank,
  Money,
  Trash,
  ShoppingCartSimple,
} from "phosphor-react";
import Container from "@/components/Container";
import Link from "next/link";
import Image from "next/image";

const CartPage = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCartStore();

  const deliveryPrice = 3.5;
  const totalItemsPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const totalPrice = totalItemsPrice + deliveryPrice;

  if (cart.length === 0) {
    return (
      <main className="pt-[130px] pb-20">
        <Container>
          <div className="flex flex-col items-center justify-center py-20 h-[60vh] rounded-tl-[6px] rounded-br-[44px]">
            <div className="bg-[#E6E5E5] p-6 rounded-full mb-5">
              <ShoppingCartSimple
                size={64}
                weight="thin"
                className="text-[#C47F17]"
              />
            </div>
            <h2 className="text-2xl font-bold text-[#403937] mb-2">
              Your cart is empty
            </h2>
            <p className="text-[#574F4D] mb-8 text-center max-w-[320px]">
              It looks like you haven't added any coffee to your order yet.
            </p>
            <Link href="/">
              <button className="bg-[#DBAC2C] hover:bg-[#C47F17] text-white px-10 py-3 rounded-md font-bold uppercase text-sm transition-all shadow-md active:scale-95 cursor-pointer">
                Go back to home
              </button>
            </Link>
          </div>
        </Container>
      </main>
    );
  }
  return (
    <main className="pt-[130px] pb-20">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8 items-start max-[600px]:px-2">
          <div className="flex-1 flex flex-col gap-3 w-full">
            <h2 className="text-xl font-bold md:text-3xl text-[#403937]">
              Complete your order
            </h2>
            <div className="bg-[#F3F2F2] p-10 rounded-md flex flex-col gap-8 ">
              <div className="flex gap-2 ">
                <MapPin size={22} className="text-[#C47F17]" />
                <div>
                  <p className="text-[#403937]">Delivery Address</p>
                  <p className="text-sm text-[#574F4D]">
                    Enter the address where you would like to receive your order
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_60px] gap-4">
                <input
                  type="text"
                  placeholder="ZIP Code"
                  className="p-3 bg-[#EEEDED] border border-[#E6E5E5] rounded focus:outline-[#C47F17] md:col-span-3 w-[200px]"
                />
                <input
                  type="text"
                  placeholder="Street"
                  className="p-3 bg-[#EEEDED] border border-[#E6E5E5] rounded md:col-span-3"
                />
                <input
                  type="text"
                  placeholder="Number"
                  className="p-3 bg-[#EEEDED] border border-[#E6E5E5] rounded"
                />
                <div className="relative md:col-span-2">
                  <input
                    type="text"
                    placeholder="Complement"
                    className="w-full p-3 bg-[#EEEDED] border border-[#E6E5E5] rounded italic text-sm"
                  />
                  <span className="absolute right-3 top-4 text-xs text-[#8D8686] italic">
                    Optional
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Neighborhood"
                  className="p-3 bg-[#EEEDED] border border-[#E6E5E5] rounded"
                />
                <input
                  type="text"
                  placeholder="City"
                  className="p-3 bg-[#EEEDED] border border-[#E6E5E5] rounded"
                />
                <input
                  type="text"
                  placeholder="State"
                  className="p-3 bg-[#EEEDED] border border-[#E6E5E5] rounded"
                />
              </div>
            </div>

            <div className="bg-[#F3F2F2] p-10 rounded-md mt-3">
              <div className="flex gap-2 mb-8">
                <CurrencyDollar size={22} className="text-[#8047F8]" />
                <div>
                  <p className="text-[#403937]">Payment</p>
                  <p className="text-sm text-[#574F4D]">
                    Payment is made on delivery. Choose how you want to pay
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button className="flex items-center gap-3 p-4 bg-[#E6E5E5] hover:bg-[#D7D5D5] border border-transparent hover:border-[#8047F8] rounded-md text-xs uppercase focus:bg-[#EBE5F9] focus:border-[#8047F8] cursor-pointer">
                  <CreditCard size={16} className="text-[#8047F8]" /> Credit
                  Card
                </button>
                <button className="flex items-center gap-3 p-4 bg-[#E6E5E5] hover:bg-[#D7D5D5] border border-transparent hover:border-[#8047F8] rounded-md text-xs uppercase focus:bg-[#EBE5F9] focus:border-[#8047F8] cursor-pointer">
                  <Bank size={16} className="text-[#8047F8]" /> Debit Card
                </button>
                <button className="flex items-center gap-3 p-4 bg-[#E6E5E5] hover:bg-[#D7D5D5] border border-transparent hover:border-[#8047F8] rounded-md text-xs uppercase focus:bg-[#EBE5F9] focus:border-[#8047F8] cursor-pointer">
                  <Money size={16} className="text-[#8047F8]" /> Cash
                </button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[448px] flex flex-col gap-3">
            <h2 className="text-xl font-bold text-[#403937]">
              Selected Coffees
            </h2>
            <div className="bg-[#F3F2F2] p-6 rounded-tr-[6px] rounded-bl-[50px]">
              <div className="flex flex-col gap-6 mb-6 max-h-[400px] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start pb-6 border-b border-[#E6E5E5]"
                  >
                    <div className="flex gap-5">
                      <Image
                        src={item.image}
                        alt={item.names}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-contain"
                      />
                      <div className="flex flex-col gap-2">
                        <p className="text-[#403937]">{item.names}</p>
                        <div className="flex gap-2">
                          <div className="bg-[#E6E5E5] flex items-center gap-2 p-2 rounded-md h-8">
                            <button
                              onClick={() => decreaseQuantity(item.id)}
                              className="text-[#8047F8] font-bold text-lg cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-[#272221] w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => increaseQuantity(item.id)}
                              className="text-[#8047F8] font-bold text-lg cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="bg-[#E6E5E5] flex items-center gap-2 px-2 rounded-md h-8 text-[10px] uppercase text-[red] font-bold cursor-pointer"
                          >
                            <Trash size={16} /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="font-bold text-[#574F4D]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-sm text-[#574F4D]">
                  <span>Total items</span>
                  <span>$ {totalItemsPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#574F4D]">
                  <span>Delivery fee</span>
                  <span>$ {deliveryPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-[#403937]">
                  <span>Total</span>
                  <span>$ {totalPrice.toFixed(2)}</span>
                </div>
                <Link
                  href={`/SuccessPage`}
                  className="w-full bg-[#DBAC2C] hover:bg-[#C47F17] text-white py-3 rounded-md flex items-center justify-center font-bold uppercase text-sm mt-3 transition-colors cursor-pointer"
                >
                  Confirm Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default CartPage;
