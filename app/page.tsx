"use client";

import Coffies from "@/components/Coffies";
import Container from "../components/Container";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <>
      <section className="pt-[130px] bg-white bg-[url('/intro-bg.png')] bg-cover">
        <Container>
          <div className="flex items-center justify-between gap-14">
            <motion.div
              className="max-w-[588px]"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-[48px] font-extrabold text-[#272221] font-[title] leading-[130%]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Find the perfect coffee for <br /> any time of day
              </motion.h1>

              <motion.p
                className="text-[20px] text-[#403937] mt-4 font-[roboto] leading-[130%]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                With Coffee Delivery, you receive your coffee wherever you are,
                at any time.
              </motion.p>

              <motion.div
                className="grid grid-cols-2 mt-[66px] gap-y-5"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                }}
              >
                {[
                  {
                    icon: "korzinka.png",
                    bg: "#C47F17",
                    text: "Simple and secure purchase",
                  },
                  {
                    icon: "cubik.png",
                    bg: "#574F4D",
                    text: "Packaging keeps the coffee intact",
                  },
                  {
                    icon: "soat.png",
                    bg: "#DBAC2C",
                    text: "Fast and tracked delivery",
                  },
                  {
                    icon: "cofe.png",
                    bg: "#8047F8",
                    text: "Fresh coffee delivered to your door",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 },
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center p-2"
                      style={{ background: item.bg }}
                    >
                      <img src={item.icon} alt="" />
                    </div>

                    <span className="text-[#574F4D] font-[roboto] text-base">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <div className="flex-shrink-0">
              <motion.img
                src="hero.png"
                alt="Coffee Delivery Hero"
                className="w-[476px] h-auto object-contain"
                initial={{ opacity: 0, x: 80, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
              />
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <Coffies />
        </Container>
      </section>
    </>
  );
};

export default HomePage;
