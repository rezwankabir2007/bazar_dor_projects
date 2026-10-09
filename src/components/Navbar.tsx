"use client";

import Link from "next/link";
import Image from "next/image";
import { useSyncExternalStore } from "react";
import UserInfo from "./UserInfo";

const getSnapshot = () => {
  return new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
};

const getServerSnapshot = () => "";

const subscribe = () => () => {}; 

const Navbar = () => {
  const today = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return (
    <div className="bg-[#FAFCFA] border-b border-gray-100 sticky top-0 z-40">
    
    
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between py-2.5 sm:py-3">
        
        {/* Brand Link */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="shrink-0">
            <Image
              src="/StackLogo.png"
              alt="বাজার দর লোগো"
              width={36}
              height={36}
              className="object-contain sm:w-[40px] sm:h-[40px]"
            />
          </div>

          <div>
            <h2 className="text-[#1D271F] font-bold text-lg sm:text-2xl leading-tight">
              বাজার দর
            </h2>
           
           
            <p className="text-[11px] sm:text-sm text-gray-500 min-h-[16px] sm:min-h-[20px] leading-tight">
              {today}
            </p>
          </div>
        </Link>

        {/* Action Buttons */}


        
       <UserInfo/>

      </div>
    </div>
  );
};

export default Navbar;