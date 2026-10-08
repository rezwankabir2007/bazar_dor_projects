"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaHome,
  FaSearch,
  FaShoppingBasket,
} from "react-icons/fa";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4FAF6] via-white to-[#ECF8F0] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[720px]">
        {/* Main Card */}
        <div className="relative overflow-hidden rounded-[32px] border border-[#DDEBE1] bg-white/90 p-7 text-center shadow-[0_20px_60px_rgba(0,90,40,0.08)] backdrop-blur-sm sm:p-10 md:p-12">
          {/* Decorative circles */}
          <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#009B4D]/5" />
          <div className="absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-[#009B4D]/5" />

          {/* 404 Section */}
          <div className="relative mb-7 flex items-center justify-center">
            {/* Big 404 */}
            <h1 className="select-none text-[115px] font-black leading-none tracking-[-8px] text-[#E7F4EB] sm:text-[145px] md:text-[170px]">
              404
            </h1>

            {/* Search Icon */}
            <div className="absolute flex h-[72px] w-[72px] rotate-[-3deg] items-center justify-center rounded-[22px] bg-gradient-to-br from-[#00B85A] to-[#008B45] shadow-[0_12px_30px_rgba(0,155,77,0.28)] sm:h-[82px] sm:w-[82px]">
              <FaSearch className="text-2xl text-white sm:text-3xl" />
            </div>
          </div>

          {/* Small Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#CFE9D8] bg-[#F1FAF4] px-4 py-2 text-xs font-bold text-[#008B45]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#00A950]" />
            PAGE NOT FOUND
          </div>

          {/* Title */}
          <h2 className="text-2xl font-extrabold tracking-tight text-[#18221B] sm:text-3xl md:text-[34px]">
            পেজটি খুঁজে পাওয়া যায়নি
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-[500px] text-sm leading-7 text-[#707970] sm:text-base">
            দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি আর পাওয়া যাচ্ছে না। লিংকটি ভুল হতে পারে অথবা পেজটি সরিয়ে ফেলা হয়েছে।
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="group flex w-full items-center justify-center gap-2 rounded-xl border border-[#D8E4DA] bg-white px-7 py-3.5 text-sm font-bold text-[#354037] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#BFD6C5] hover:bg-[#F4FAF5] hover:shadow-md sm:w-auto"
            >
              <FaArrowLeft className="text-xs transition-transform duration-300 group-hover:-translate-x-1" />
              পিছনে যান
            </button>

            {/* Home Button */}
            <Link
              href="/"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#009B4D] to-[#00AD58] px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(0,155,77,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,155,77,0.30)] sm:w-auto"
            >
              <FaHome className="text-xs transition-transform duration-300 group-hover:scale-110" />
              হোমে যান
            </Link>
          </div>
        </div>

        {/* Brand */}
        <div className="mt-7 text-center">
          <div className="inline-flex items-center gap-2.5">
            {/* Logo */}
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#00B85A] to-[#008B45] shadow-md">
              <FaShoppingBasket className="text-sm text-white" />
            </div>

            {/* Brand Name */}
            <span className="text-base font-extrabold tracking-tight text-[#202820]">
              বাজার দর
            </span>
          </div>

          <p className="mt-2 text-[11px] font-medium text-[#8A948C]">
            প্রতিদিনের বাজারদর এক নজরে
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;