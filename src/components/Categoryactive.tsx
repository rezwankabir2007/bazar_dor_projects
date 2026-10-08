"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryType {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Categoryactive = ({ category }: { category: CategoryType }) => {
  const pathname = usePathname();

  const isActive = pathname === `/category/${category.id}`;

  return (
    <Link href={`/category/${category.id}`} className="shrink-0">
      <div
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 ${
          isActive
            ? "text-[#05893E] bg-[#E4F3EA] shadow-sm"
            : "text-gray-700 hover:text-[#05893E] hover:bg-gray-100"
        }`}
      >
        <span className="text-base">{category.icon}</span>
        <span>{category.nameBn}</span>
      </div>
    </Link>
  );
};

export default Categoryactive;