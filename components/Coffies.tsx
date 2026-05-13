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
      className="bg-[#F3F2F2] rounded-tl-[6px] rounded-br-[36px] cursor-pointer p-5 flex flex-col items-center text-center relative mt-10"
    >
      <motion.div
        className="mt-[-45px] mb-3"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <Image
          src={el.image}
          alt={el.names}
          width={120}
          height={120}
          className="w-[120px] h-[120px] object-contain cursor-pointer"
        />
      </motion.div>

      <div className="flex flex-wrap justify-center gap-1 mb-4">
        {el.tags?.map((t, index) => (
          <span
            key={index}
            className="bg-[#F1E9C9] text-[#C47F17] text-[10px] font-bold px-2 py-1 rounded-full uppercase"
          >
            {t}
          </span>
        ))}
      </div>

      <h1 className="text-[#403937] text-xl font-bold mb-2 font-title">
        {el.names}
      </h1>

      <p className="text-[#8D8686] text-sm mb-8 leading-[130%]">{el.desc}</p>

      <div className="w-full flex items-center justify-between mt-auto">
        <div className="flex flex-col items-start">
          <div className="flex items-baseline gap-1 text-[#574F4D]">
            <span className="text-xs font-normal"></span>
            <div className="text-2xl text-[#8047F8] font-extrabold mt-1">
              ${itemTotal.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isAdded && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              className="bg-[#4B2995] p-2 rounded-md hover:bg-[#8047F8] transition-colors cursor-pointer"
            >
              <Image
                src={korzinka}
                alt="Cart"
                width={25}
                height={25}
                className="invert brightness-0"
              />
            </motion.button>
          )}

          {isAdded && (
            <div className="bg-[#E6E5E5] flex items-center gap-2 p-2 rounded-md">
              <button
                onClick={handleDecrease}
                className="text-[#8047F8] hover:text-[#4B2995] font-bold px-1 cursor-pointer"
              >
                -
              </button>
              <span className="text-[#272221] font-bold min-w-[20px] text-center">
                {itemQuantity}
              </span>
              <button
                onClick={handleIncrease}
                className="text-[#8047F8] hover:text-[#4B2995] font-bold px-1 cursor-pointer"
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
    {
      id: 1,
      tags: ["TRADITIONAL"],
      names: "Traditional Espresso",
      desc: "The traditional coffee made with hot water and ground beans",
      price: 9.9,
      image: "/cooffe1.png",
    },
    {
      id: 2,
      tags: ["TRADITIONAL"],
      names: "American Espresso",
      desc: "Diluted espresso, less intense than the traditional one",
      price: 9.9,
      image: "/coffee2.png",
    },
    {
      id: 3,
      tags: ["TRADITIONAL"],
      names: "Creamy Espresso",
      desc: "Traditional espresso coffee with creamy foam",
      price: 9.9,
      image: "/coffee3.png",
    },
    {
      id: 4,
      tags: ["TRADITIONAL", "ICED"],
      names: "Iced Espresso",
      desc: "Drink prepared with espresso coffee and ice cubes",
      price: 9.9,
      image: "/coffee4.png",
    },
    {
      id: 5,
      tags: ["TRADITIONAL", "WITH MILK"],
      names: "Coffee with Milk",
      desc: "Half and half of traditional espresso with steamed milk",
      price: 9.9,
      image: "/coffee5.png",
    },
    {
      id: 6,
      tags: ["TRADITIONAL", "WITH MILK"],
      names: "Latte",
      desc: "A shot of espresso with double the milk and creamy foam",
      price: 9.9,
      image: "/coffee6.png",
    },
    {
      id: 7,
      tags: ["TRADITIONAL", "WITH MILK"],
      names: "Capuccino",
      desc: "Drink with cinnamon made from equal parts of coffee, milk and foam",
      price: 9.9,
      image: "/coffee7.png",
    },
    {
      id: 8,
      tags: ["TRADITIONAL", "WITH MILK"],
      names: "Macchiato",
      desc: "Espresso coffee mixed with a little hot milk and foam",
      price: 9.9,
      image: "/coffee8.png",
    },
    {
      id: 9,
      tags: ["TRADITIONAL", "WITH MILK"],
      names: "Mocaccino",
      desc: "Espresso coffee with chocolate sauce, a little milk and foam",
      price: 9.9,
      image: "/coffee9.png",
    },
    {
      id: 10,
      tags: ["SPECIAL", "WITH MILK"],
      names: "Hot Chocolate",
      desc: "Drink made with chocolate dissolved in hot milk and coffee",
      price: 9.9,
      image: "/coffee10.png",
    },
    {
      id: 11,
      tags: ["SPECIAL", "ALCOHOLIC", "ICED"],
      names: "Cubano",
      desc: "Iced drink of espresso coffee with rum, cream and mint",
      price: 9.9,
      image: "/coffee11.png",
    },
    {
      id: 12,
      tags: ["SPECIAL"],
      names: "Hawaiian",
      desc: "Sweetened drink prepared with coffee and coconut milk",
      price: 9.9,
      image: "/coffee12.png",
    },
    {
      id: 13,
      tags: ["SPECIAL"],
      names: "Arabic",
      desc: "Drink prepared with Arabic coffee beans and spices",
      price: 9.9,
      image: "/coffee13.png",
    },
    {
      id: 14,
      tags: ["SPECIAL", "ALCOHOLIC"],
      names: "Irish",
      desc: "Drink based on coffee, Irish whiskey, sugar and whipped cream",
      price: 9.9,
      image: "/coffee14.png",
    },
  ];

  return (
    <section className="py-20">
      <Container>
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-3xl max-[600px]:text-center font-bold text-[#403937] mb-12 font-title"
        >
          Our coffees
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8  max-[600px]:px-2">
          {coffees.map((coffee, index) => (
            <CoffeeCard key={coffee.id} el={coffee} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Coffies;
