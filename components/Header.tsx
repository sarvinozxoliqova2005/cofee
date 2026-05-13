"use client";
import Container from "./Container";
import { useCartStore } from "@/app/store/useStoreCart";
import Link from "next/link";

const Header = () => {
  const { cart } = useCartStore();
  console.log("Cart ma'lumotlari:", cart);

  const totalItems = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  console.log("Total items:", totalItems);

  return (
    <header className="bg-white shadow-sm fixed z-10 left-0 top-0 right-0">
      <Container>
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          </Link>

          <ul className="flex items-center gap-3">
            <li>
              <div className="flex items-center gap-2 bg-[#EBE5F9] text-[#4B2995] px-3 h-[38px] rounded-[6px] text-sm">
                <img src="/location.png" alt="" className="w-4 h-5" />
                <span>Porto Alegre, RS</span>
              </div>
            </li>

            <li>
              <Link
                href="/cart"
                className="relative flex items-center justify-center w-[38px] h-[38px] bg-[#F1E9C9] rounded-[6px] hover:bg-[#ebdca2] transition-colors"
              >
                <img src="/korzinka.png" alt="Cart" className="w-[22px]" />
                <span className="absolute bg-[#C47F17] rounded-full w-[20px] h-[20px] flex items-center justify-center text-[12px] bottom-6 left-7 text-white font-bold">
                  {cart.length}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </header>
  );
};

export default Header;
