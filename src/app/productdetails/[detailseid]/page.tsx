import { DataType } from "@/app/type";
import { notFound } from "next/navigation";

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ detailseid: string }>;
}) => {
  const { detailseid } = await params;

  // ১. সকল প্রোডাক্টের ডেটা ফেচ করা
  const getdata = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      cache: "no-store",
    }
  );

  if (!getdata.ok) {
    notFound();
  }

  const allProducts: DataType[] = await getdata.json();

  // ২. URL-এর detailseid দিয়ে প্রোডাক্টটি খুঁজে বের করা
  const data = allProducts.find(
    (item) => String(item.id) === String(detailseid)
  );

  // ৩. প্রোডাক্ট না পাওয়া গেলে not-found পেজ দেখাবে
  if (!data) {
    notFound();
  }

  // বাজারের দামের হিসাব ও সেফটি চেক
  const markets = data.markets || [];

  const minimumPrice = markets.length
    ? Math.min(...markets.map((item) => item.min))
    : 0;

  const maximumPrice = markets.length
    ? Math.max(...markets.map((item) => item.max))
    : 0;

  const averagePrice = markets.length
    ? Math.round(
        markets.reduce(
          (total, item) => total + (item.min + item.max) / 2,
          0
        ) / markets.length
      )
    : 0;

  return (
    <div className="min-h-screen bg-[#F4FAF6]/50 p-4 sm:p-6">
      {/* Product Header Card */}
      <div className="max-w-5xl mx-auto bg-white border border-[#E1E8E1] shadow-sm rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-4 items-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-[#F1FAF4] border border-[#CFE9D8] rounded-2xl flex items-center justify-center text-3xl shadow-sm">
            {data.categoryIcon}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#18221B]">
              {data.nameBn}
            </h1>

            <p className="text-sm font-medium text-gray-500">
              প্রতি {data.unit} দাম
            </p>

            <p className="text-xs mt-1 font-medium text-gray-500">
              গতকালকের তুলনায় দাম{" "}
              <span
                className={
                  data.change?.dir === "up" ? "text-red-500" : "text-emerald-600"
                }
              >
                {data.change?.dir === "up" ? "বেড়েছে" : "কমেছে"} -{" "}
                {Math.abs(data.change?.pct || 0)}%
              </span>
            </p>
          </div>
        </div>

        {/* Today Price */}
        <div className="w-full sm:w-auto bg-[#F1FAF4] border border-[#CFE9D8] rounded-xl px-6 py-3 text-left sm:text-right">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            আজকের দাম
          </p>

          <h2 className="text-3xl font-black text-[#008B45]">
            {data.today} <span className="text-lg font-normal">টাকা</span>
          </h2>

          <p className="text-xs font-medium text-gray-500">
            প্রতি {data.unit}
          </p>

          <p
            className={`text-xs font-bold mt-1 ${
              data.change?.dir === "up" ? "text-red-500" : "text-emerald-600"
            }`}
          >
            {data.change?.dir === "up" ? "▲" : "▼"}{" "}
            {Math.abs(data.change?.pct || 0)}%
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto bg-white border border-[#E1E8E1] shadow-sm rounded-2xl p-5 sm:p-6 mt-6">
        {/* Summary */}
        <h2 className="text-lg font-bold text-[#18221B] mb-4">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Minimum */}
          <div className="border border-[#E1E8E1] bg-[#FDFDFD] shadow-sm rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-500">
              সর্বনিম্ন দাম
            </p>
            <h2 className="text-2xl font-black text-emerald-600 my-1">
              {minimumPrice} <span className="text-sm font-normal">টাকা</span>
            </h2>
            <p className="text-xs text-gray-400">সবচেয়ে কম দামের বাজার</p>
          </div>

          {/* Maximum */}
          <div className="border border-[#E1E8E1] bg-[#FDFDFD] shadow-sm rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-500">
              সর্বাধিক দাম
            </p>
            <h2 className="text-2xl font-black text-red-500 my-1">
              {maximumPrice} <span className="text-sm font-normal">টাকা</span>
            </h2>
            <p className="text-xs text-gray-400">সবচেয়ে বেশি দামের বাজার</p>
          </div>

          {/* Average */}
          <div className="border border-[#E1E8E1] bg-[#FDFDFD] shadow-sm rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-500">গড় দাম</p>
            <h2 className="text-2xl font-black text-[#008B45] my-1">
              {averagePrice} <span className="text-sm font-normal">টাকা</span>
            </h2>
            <p className="text-xs text-gray-400">
              প্রতি {data.unit}-এর হিসাবে
            </p>
          </div>
        </div>

        {/* Market Price Table */}
        <h2 className="text-lg font-bold text-[#18221B] mt-8 mb-4">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="border border-[#E1E8E1] rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F8FAF8] border-b border-[#E1E8E1] text-xs font-bold text-gray-600 uppercase">
                <tr>
                  <th className="p-3.5">বাজার</th>
                  <th className="p-3.5">বিভাগ</th>
                  <th className="p-3.5 text-right">সর্বনিম্ন</th>
                  <th className="p-3.5 text-right">সর্বাধিক</th>
                  <th className="p-3.5 text-right">গড়</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E1E8E1]">
                {markets.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#F4FAF6]/60 transition-colors duration-150"
                  >
                    <td className="p-3.5 font-semibold text-gray-800 whitespace-nowrap">
                      {item.market}
                    </td>

                    <td className="p-3.5 text-gray-500 whitespace-nowrap">
                      {item.division}
                    </td>

                    <td className="p-3.5 text-right text-gray-700 whitespace-nowrap">
                      {item.min} টাকা
                    </td>

                    <td className="p-3.5 text-right text-gray-700 whitespace-nowrap">
                      {item.max} টাকা
                    </td>

                    <td className="p-3.5 text-right font-bold text-[#008B45] whitespace-nowrap">
                      {Math.round((item.min + item.max) / 2)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;