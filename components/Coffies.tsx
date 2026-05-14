"use client";

import { useCartStore } from "@/app/store/useStoreCart";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import korzinka from "../public/korzinka.png";
import Container from "./Container";

interface CoffeeProps {
  el: {
    id: number;
    names: string;
    desc: string;
    price: number;
    image: string;
    tags: string[];
  };
  index: number;
}

const CoffeeCard = ({ el, index }: CoffeeProps) => {
  const [amount, setAmount] = useState(1);

  const cart = useCartStore((state) => state.cart);
  const increase = useCartStore((state) => state.increase);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const cartItem = useMemo(
    () => cart.find((item) => item.id === el.id),
    [cart, el.id],
  );

  const isAdded = !!cartItem;

  useEffect(() => {
    if (cartItem) {
      setAmount(cartItem.quantity);
    } else {
      setAmount(1);
    }
  }, [cartItem]);

  const handleAddToCart = () => {
    increase(el, amount);
  };

  const handleIncrease = () => {
    if (isAdded) {
      increaseQuantity(el.id);
    } else {
      setAmount((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (isAdded) {
      decreaseQuantity(el.id);
    } else {
      setAmount((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  const itemQuantity = cartItem ? cartItem.quantity : amount;
  const itemTotal = el.price * itemQuantity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      // Padding va margin mobil uchun biroz kamaytirildi (p-3 md:p-5)
      className="bg-[#F3F2F2] rounded-tl-[6px] rounded-br-[36px] cursor-pointer p-3 md:p-5 flex flex-col items-center text-center relative mt-10"
    >
      <motion.div
        className="mt-[-35px] md:mt-[-45px] mb-3"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <Image
          src={el.image}
          alt={el.names}
          width={120}
          height={120}
          // Rasmlar kichik ekranda moslashuvchan bo'ldi
          className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] object-contain cursor-pointer"
        />
      </motion.div>

      <div className="flex flex-wrap justify-center gap-1 mb-2 md:mb-4">
        {el.tags?.map((t, index) => (
          <span
            key={index}
            className="bg-[#F1E9C9] text-[#C47F17] text-[8px] md:text-[10px] font-bold px-2 py-0.5 md:py-1 rounded-full uppercase"
          >
            {t}
          </span>
        ))}
      </div>

      <h1 className="text-[#403937] text-sm md:text-xl font-bold mb-1 md:mb-2 font-title line-clamp-1">
        {el.names}
      </h1>

      <p className="text-[#8D8686] text-[10px] md:text-sm mb-4 md:mb-8 leading-[130%] line-clamp-2">
        {el.desc}
      </p>

      <div className="w-full flex  sm:flex-row items-center justify-between mt-auto gap-2">
        <div className="flex items-baseline gap-1 text-[#574F4D]">
          <div className="text-lg md:text-2xl text-[#8047F8] font-extrabold">
            ${itemTotal.toFixed(2)}
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          {!isAdded && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              className="bg-[#4B2995] p-1.5 md:p-2 rounded-md hover:bg-[#8047F8] transition-colors cursor-pointer"
            >
              <Image
                src={korzinka}
                alt="Cart"
                width={20}
                height={20}
                className="invert brightness-0 md:w-[25px] md:h-[25px]"
              />
            </motion.button>
          )}

          {isAdded && (
            <div className="bg-[#E6E5E5] flex items-center gap-1 md:gap-2 p-1.5 md:p-2 rounded-md">
              <button
                onClick={handleDecrease}
                className="text-[#8047F8] hover:text-[#4B2995] font-bold px-1 cursor-pointer text-xs md:text-base"
              >
                -
              </button>
              <span className="text-[#272221] font-bold min-w-[15px] md:min-w-[20px] text-center text-xs md:text-base">
                {itemQuantity}
              </span>
              <button
                onClick={handleIncrease}
                className="text-[#8047F8] hover:text-[#4B2995] font-bold px-1 cursor-pointer text-xs md:text-base"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Coffies = () => {
  const coffees = [
    // ... (kofelar ro'yxati o'zgarishsiz qoladi)
    { id: 1, tags: ["TRADITIONAL"], names: "Traditional Espresso", desc: "The traditional coffee made with hot water and ground beans", price: 9.9, image: "/cooffe1.png" },
    { id: 2, tags: ["TRADITIONAL"], names: "American Espresso", desc: "Diluted espresso, less intense than the traditional one", price: 9.9, image: "/coffee2.png" },
    { id: 3, tags: ["TRADITIONAL"], names: "Creamy Espresso", desc: "Traditional espresso coffee with creamy foam", price: 9.9, image: "/coffee3.png" },
    { id: 4, tags: ["TRADITIONAL", "ICED"], names: "Iced Espresso", desc: "Drink prepared with espresso coffee and ice cubes", price: 9.9, image: "/coffee4.png" },
    { id: 5, tags: ["TRADITIONAL", "WITH MILK"], names: "Coffee with Milk", desc: "Half and half of traditional espresso with steamed milk", price: 9.9, image: "/coffee5.png" },
    { id: 6, tags: ["TRADITIONAL", "WITH MILK"], names: "Latte", desc: "A shot of espresso with double the milk and creamy foam", price: 9.9, image: "/coffee6.png" },
    { id: 7, tags: ["TRADITIONAL", "WITH MILK"], names: "Capuccino", desc: "Drink with cinnamon made from equal parts of coffee, milk and foam", price: 9.9, image: "/coffee7.png" },
    { id: 8, tags: ["TRADITIONAL", "WITH MILK"], names: "Macchiato", desc: "Espresso coffee mixed with a little hot milk and foam", price: 9.9, image: "/coffee8.png" },
    { id: 9, tags: ["TRADITIONAL", "WITH MILK"], names: "Mocaccino", desc: "Espresso coffee with chocolate sauce, a little milk and foam", price: 9.9, image: "/coffee9.png" },
    { id: 10, tags: ["SPECIAL", "WITH MILK"], names: "Hot Chocolate", desc: "Drink made with chocolate dissolved in hot milk and coffee", price: 9.9, image: "/coffee10.png" },
    { id: 11, tags: ["SPECIAL", "ALCOHOLIC", "ICED"], names: "Cubano", desc: "Iced drink of espresso coffee with rum, cream and mint", price: 9.9, image: "/coffee11.png" },
    { id: 12, tags: ["SPECIAL"], names: "Hawaiian", desc: "Sweetened drink prepared with coffee and coconut milk", price: 9.9, image: "/coffee12.png" },
    { id: 13, tags: ["SPECIAL"], names: "Arabic", desc: "Drink prepared with Arabic coffee beans and spices", price: 9.9, image: "/coffee13.png" },
    { id: 14, tags: ["SPECIAL", "ALCOHOLIC"], names: "Irish", desc: "Drink based on coffee, Irish whiskey, sugar and whipped cream", price: 9.9, image: "/coffee14.png" },
  ];

  return (
    <section className="py-10 md:py-20">
      <Container>
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl max-[600px]:text-center font-bold text-[#403937] mb-8 md:mb-12 font-title"
        >
          Our coffees
        </motion.h2>

        {/* ASOSIY O'ZGARISH: grid-cols-2 har doim saqlanib qoladi */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 max-[600px]:px-1.5">
          {coffees.map((coffee, index) => (
            <CoffeeCard key={coffee.id} el={coffee} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Coffies;