"use client";

import Container from "./Container";
import { useCartStore } from "@/app/store/useStoreCart";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useState } from "react";

const Header = () => {
  const { cart } = useCartStore();
  const totalItems = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > previous && latest > 70) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-white/80 backdrop-blur-md shadow-sm fixed z-50 left-0 top-0 right-0"
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20 px-2 md:px-0">
          <Link
            href="/"
            className="transition-transform hover:scale-105 active:scale-95 shrink-0"
          >
            <Image
              src="/logo.png"
              alt="Coffee Delivery Logo"
              width={85}
              height={40}
              priority
              className="w-auto h-8 md:h-10"
            />
          </Link>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex items-center gap-1.5 bg-[#EBE5F9] text-[#4B2995] px-2 md:px-3 h-9 md:h-10 rounded-md text-xs md:text-sm">
              <Image
                src="/location.png"
                alt="Location"
                width={16}
                height={20}
                className="w-3.5 md:w-4"
              />
              <span className="hidden sm:inline font-medium">
                Porto Alegre, RS
              </span>
              <span className="sm:hidden font-medium">RS</span>
            </div>

            <Link
              href="/cart"
              aria-label="View shopping cart"
              className="relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10 bg-[#F1E9C9] rounded-md hover:bg-[#ebdca2] transition-all group"
            >
              <Image
                src="/korzinka.png"
                alt="Cart"
                width={22}
                height={22}
                className="w-5 h-5 md:w-5.5 md:h-5.5 transition-transform group-hover:rotate-[-10deg]"
              />
              <AnimatePresence mode="popLayout">
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    key={totalItems}
                    className="absolute -top-1.5 -right-1.5 bg-[#C47F17] rounded-full min-w-[20px] h-5 flex items-center justify-center text-[10px] md:text-[12px] text-white font-bold shadow-md px-1 border-2 border-white"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </div>
      </Container>
    </motion.header>
  );
};

export default Header;
