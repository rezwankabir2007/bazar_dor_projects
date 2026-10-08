"use client";

import Link from "next/link";
import Image from "next/image";
import { useSyncExternalStore } from "react";


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
    <div className="bg-[#FAFCFA]">
      <div className="container mx-auto flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="p-1">
            <Image
              src="/StackLogo.png"
              alt="বাজার দর লোগো"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>

          <div>
            <h2 className="text-[#1D271F] font-bold text-2xl">বাজার দর</h2>
            <p className="text-[16px] text-[#1D271F] min-h-[24px]">
              {today}
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <button className="text-sm font-semibold text-[#1D271F]">
            সাইন ইন
          </button>

          <button className="bg-[#05893E] text-sm font-semibold px-4 py-2 rounded-lg text-white shadow-md">
            সাইন আপ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;