"use client";

import React from "react";
import { MapPin, Timer, CurrencyDollar } from "phosphor-react";
import Container from "@/components/Container";

const SuccessPage = () => {

  return (
    <main className="pt-[140px] pb-20">
      <Container>
        <div className="flex flex-col gap-10">
          <div>
            <h1 className="text-3xl font-extrabold text-[#C47F17] mb-1 font-[title]">
              Uhu! Order confirmed
            </h1>
            <p className="text-xl text-[#403937]">
              Now just wait, and the coffee will soon reach you
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="relative p-[1px] rounded-tl-[6px] rounded-br-[36px] bg-gradient-to-br from-[#DBAC2C] to-[#8047F8] w-full max-w-[526px]">
              <div className="bg-white p-10 rounded-tl-[5px] rounded-br-[35px] flex flex-col gap-8 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#8047F8] flex items-center justify-center text-white shrink-0">
                    <MapPin size={16} weight="fill" />
                  </div>
                  <div>
                    <p className="text-[#574F4D]">
                      Delivery to{" "}
                      <span className="font-bold">
                        102 João Daniel Martinelli St
                      </span>
                    </p>
                    <p className="text-[#574F4D]">
                      Farrapos - Porto Alegre, RS
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#DBAC2C] flex items-center justify-center text-white shrink-0">
                    <Timer size={16} weight="fill" />
                  </div>
                  <div>
                    <p className="text-[#574F4D]">Estimated delivery time</p>
                    <p className="font-bold text-[#574F4D]">20 min - 30 min</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#C47F17] flex items-center justify-center text-white shrink-0">
                    <CurrencyDollar size={16} weight="fill" />
                  </div>
                  <div>
                    <p className="text-[#574F4D]">Payment on delivery</p>
                    <p className="font-bold text-[#574F4D]">Credit Card</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end">
              <img
                src="rasm1.png"
                alt="Delivery person on a scooter"
                className="w-full max-w-[492px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default SuccessPage;
