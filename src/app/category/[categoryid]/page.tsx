import ProductList from "@/components/ProductList";
import { notFound } from "next/navigation";

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

const Category = async ({
  params,
}: {
  params: Promise<{ categoryid: string }>;
}) => {
  const { categoryid } = await params;

  const getdata = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${categoryid}`,
    {
      cache: "no-store",
    }
  );

  if (!getdata.ok) {
    notFound();
  }

  const data: CategoryType[] = await getdata.json();

  // ডেটা না থাকলে 404 দেখাবে
  if (!data || data.length === 0) {
    notFound();
  }

  // প্রথম ক্যাটাগরির ব্যানার হেডার
  const sdata = data[0];

  return (
    <div className="my-6 px-4 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="bg-[#FAFCFA] border border-[#E1E8E1] rounded-2xl p-4 sm:p-5 mb-6 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="shrink-0 flex items-center justify-center w-12 h-12 bg-[#F0F5F0] rounded-xl text-3xl sm:text-4xl">
            {sdata?.categoryIcon || "📦"}
          </div>

          {/* Category Info */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1D271F]">
              {sdata?.categoryNameBn || "ক্যাটাগরি"}
            </h2>

            <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
              মোট <span className="font-semibold text-gray-800">{data.length}</span>টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </div>

      {/* Sort + Product List */}
      <ProductList data={data} />
    </div>
  );
};

export default Category;