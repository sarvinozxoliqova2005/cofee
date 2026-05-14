"use client";
import Image from "next/image";
import Coffies from "@/components/Coffies";
import Container from "../components/Container";
import { motion } from "framer-motion";

const HomePage = () => {
  const benefits = [
    { icon: "/korzinka.png", bg: "#C47F17", text: "Simple and secure purchase" },
    { icon: "/cubik.png", bg: "#574F4D", text: "Packaging keeps the coffee intact" },
    { icon: "/soat.png", bg: "#DBAC2C", text: "Fast and tracked delivery" },
    { icon: "/cofe.png", bg: "#8047F8", text: "Fresh coffee delivered to your door" },
  ];

  return (
    <>
      <section className="pt-[100px] md:pt-[150px] pb-10 bg-white bg-[url('/intro-bg.png')] bg-cover bg-center max-[600px]:px-2">
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <motion.div 
              className="max-w-[588px] text-center lg:text-left order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
            >
              <h1 className="text-[32px] max-[900px]:text-[28px] max-[750px]:text-[26px] max-[600px]:text-[24px] max-[500px]:text-[22px] font-extrabold text-[#272221] font-title leading-tight">
                Find the perfect coffee for any time of day
              </h1>
              <p className="text-lg max-[600px]:text-sm text-[#403937] mt-4 font-roboto">
                With Coffee Delivery, you receive your coffee wherever you are, at any time.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 mt-8 md:mt-[66px] gap-y-5 text-left">
                {benefits.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center p-2 shrink-0" style={{ background: item.bg }}>
                      <Image src={item.icon} alt="" width={16} height={16} className="invert brightness-0" />
                    </div>
                    <span className="text-[#574F4D] text-sm md:text-base">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="order-1 lg:order-2 w-full max-w-[300px] md:max-w-[476px]"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
            >
              <Image src="/hero.png" alt="Hero" width={476} height={360} priority className="w-full h-auto" />
            </motion.div>
          </div>
        </Container>
      </section>
      <Coffies />
    </>
  );
};
export default HomePage;