"use client";
import Container from "./Container";
import { useCartStore } from "@/app/store/useStoreCart";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const { cart } = useCartStore();
  const totalItems = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <header className="bg-white shadow-sm fixed z-50 left-0 top-0 right-0 max-[600px]:px-2">
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="transition-transform active:scale-95">
            <Image src="/logo.png" alt="Logo" width={85} height={40} className="w-auto h-8 md:h-10" />
          </Link>

          <ul className="flex items-center gap-2 md:gap-3">
            <li>
              <div className="flex items-center gap-1.5 bg-[#EBE5F9] text-[#4B2995] px-2 md:px-3 h-8 md:h-[38px] rounded-[6px] text-xs md:text-sm">
                <Image src="/location.png" alt="" width={16} height={20} className="w-3.5 md:w-4" />
                <span className="hidden sm:inline">Porto Alegre, RS</span>
                <span className="sm:hidden">RS</span>
              </div>
            </li>

            <li>
              <Link href="/cart" className="relative flex items-center justify-center w-8 h-8 md:w-[38px] md:h-[38px] bg-[#F1E9C9] rounded-[6px] hover:bg-[#ebdca2] transition-colors">
                <Image src="/korzinka.png" alt="Cart" width={25} height={25} className="w-5 h-5 md:w-6 md:h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#C47F17] rounded-full min-w-[18px] h-[18px] md:w-[20px] md:h-[20px] flex items-center justify-center text-[10px] md:text-[12px] text-white font-bold shadow-md">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </header>
  );
};
export default Header;