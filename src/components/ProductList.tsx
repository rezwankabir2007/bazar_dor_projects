"use client";

import Link from "next/link";
import { useState } from "react";

interface CategoryType {
  id: number;
  categoryIcon: string;
  nameBn: string;
  today: number;
  unit: string;
  categoryNameBn: string;
  change: {
    dir: string;
    pct: number;
  };
}

const ProductList = ({ data }: { data: CategoryType[] }) => {
  const [sort, setSort] = useState("default");

  const sortedData = [...data].sort((a, b) => {
    if (sort === "low-to-high") {
      return a.today - b.today;
    }

    if (sort === "high-to-low") {
      return b.today - a.today;
    }

    return 0;
  });

  return (
    <>
      {/* Sort Section */}
      <div className="bg-[#FAFCFA] border border-[#E1E8E1] rounded-2xl p-4 sm:p-5 mt-4 sm:mt-6 flex items-center justify-between sm:justify-end gap-2 shadow-sm">
        <span className="text-xs sm:text-sm font-medium text-gray-600">
          সাজান
        </span>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border text-gray-700 border-[#DDE4DD] rounded-lg px-3 py-1.5 sm:py-2 text-xs sm:text-sm outline-none bg-white cursor-pointer transition-all focus:border-[#05893E]"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low-to-high">কম থেকে বেশি দাম</option>
          <option value="high-to-low">বেশি থেকে কম দাম</option>
        </select>
      </div>

      {/* Product Grid Section */}
      <div className="mt-4 sm:mt-6 mb-12 sm:mb-16">
        <div className="my-4 sm:my-6">
          <h2 className="text-lg sm:text-xl font-bold text-[#1D271F] mb-1">
            সব পণ্য
          </h2>

          <p className="text-gray-500 text-xs sm:text-sm">
            মোট <span className="font-semibold text-gray-800">{sortedData.length}</span>টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {sortedData.map((item) => (
            <Link
              href={`/productdetails/${item.id}`}
              key={item.id}
              className="block group"
            >
              <div className="rounded-xl border border-gray-200 bg-[#FAFCFA] p-3.5 transition-all duration-200 active:scale-[0.98] hover:shadow-sm">
                {/* Header Info */}
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-2xl">
                    {item.categoryIcon}
                  </div>

                  {/* Name & Unit */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-semibold text-[#1D271F] truncate">
                      {item.nameBn}
                    </h3>
                    <p className="text-xs text-gray-500">
                      প্রতি {item.unit}
                    </p>
                  </div>
                </div>

                {/* Price & Change */}
                <div className="mt-3 sm:mt-4 flex items-end justify-between border-t border-gray-100 pt-2.5">
                  <div>
                    <p className="text-[11px] text-gray-500">
                      আজকের দাম
                    </p>

                    <p className="text-lg sm:text-xl font-bold text-[#1D271F]">
                      {item.today} টাকা
                    </p>
                  </div>

                  {/* Price Change Badge */}
                  {item.change.dir === "up" ? (
                    <span className="rounded-full bg-red-50 px-2 py-1 text-xs text-red-500 font-semibold whitespace-nowrap">
                      ▲ {item.change.pct}%
                    </span>
                  ) : item.change.dir === "down" ? (
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs text-[#1A9951] font-semibold whitespace-nowrap">
                      ▼ {item.change.pct}%
                    </span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 font-semibold whitespace-nowrap">
                      {item.change.pct}%
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;