import { Suspense } from "react";
import Categoryactive from "./Categoryactive";

interface CategoryType {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Categories = async () => {
  const getdata = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
    {
      next: {
        revalidate: 60,
      },
    }
  );

  const data = await getdata.json();

  return (
    <div className="border-t-2 border-b-2 border-[#E1E8E1] bg-[#FAFCFA]">
      <div className="container mx-auto px-4 py-3">
        
        
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none py-1 whitespace-nowrap">
          {data.map((category: CategoryType) => (
            <div key={category.id} className="shrink-0">
              <Suspense fallback={<div className="text-xs text-gray-400">লোডিং...</div>}>
                <Categoryactive category={category} />
              </Suspense>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;