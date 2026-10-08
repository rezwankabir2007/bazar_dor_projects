import Link from "next/link";

interface DatType {
  id: number;
  categoryIcon: string;
  nameBn: string;
  today: number;
  unit: string;
  change: {
    dir: string;
    pct: number;
  };
}

const PriceUp = async () => {
  const getdata = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
    next: {
      revalidate: 60,
    },
  });

  const data: DatType[] = await getdata.json();
  const Updatda = data
    .filter((up) => up.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const downdatda = data
    .filter((down) => down.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="px-4 sm:px-6 max-w-7xl mx-auto">
      {/* UP data */}
      <div className="my-6 sm:my-8">
        <h2 className="mb-4 text-lg sm:text-xl font-bold text-[#1D271F] flex items-center gap-1.5">
          <span className="text-red-500">▲</span> আজ দাম বেড়েছে
        </h2>

      
      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {Updatda.map((updata) => (
            <Link href={`/productdetilse/${updata.id}`} key={updata.id} className="block group">
              <div className="rounded-xl border border-gray-200 bg-[#FAFCFA] p-3.5 transition-all duration-200 active:scale-[0.98] hover:shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-2xl">
                    {updata.categoryIcon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-semibold text-[#1D271F] truncate">
                      {updata.nameBn}
                    </h3>
                    <p className="text-xs text-gray-500">
                      প্রতি {updata.unit}
                    </p>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 flex items-end justify-between border-t border-gray-100 pt-2.5">
                  <div>
                    <p className="text-[11px] text-gray-500">আজকের দাম</p>
                    <p className="text-lg sm:text-xl font-bold text-[#1D271F]">
                      {updata.today} টাকা
                    </p>
                  </div>

                  <span className="rounded-full bg-red-50 px-2 py-1 text-xs text-red-500 font-semibold whitespace-nowrap">
                    ▲ {updata.change.pct}%
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Down data */}
      <div className="my-6 sm:my-8">
        <h2 className="mb-4 text-lg sm:text-xl font-bold text-[#1D271F] flex items-center gap-1.5">
          <span className="text-[#1A9951]">▼</span> আজ দাম কমেছে
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {downdatda.map((data) => (
            <Link href={`/productdetilse/${data.id}`} key={data.id} className="block group">
              <div className="rounded-xl border border-gray-200 bg-[#FAFCFA] p-3.5 transition-all duration-200 active:scale-[0.98] hover:shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-2xl">
                    {data.categoryIcon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-semibold text-[#1D271F] truncate">
                      {data.nameBn}
                    </h3>
                    <p className="text-xs text-gray-500">
                      প্রতি {data.unit}
                    </p>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 flex items-end justify-between border-t border-gray-100 pt-2.5">
                  <div>
                    <p className="text-[11px] text-gray-500">আজকের দাম</p>
                    <p className="text-lg sm:text-xl font-bold text-[#1D271F]">
                      {data.today} টাকা
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs text-[#1A9951] font-semibold whitespace-nowrap">
                    ▼ {data.change.pct}%
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* সব পণ্য */}
      <div className="mb-12 sm:mb-16">
        <div className="my-6 sm:my-8">
          <h2 className="text-lg sm:text-xl font-bold text-[#1D271F] mb-1">
            সব পণ্য
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm">
            মোট <span className="font-semibold text-gray-800">{data.length}</span>টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {data.map((item) => (
            <Link href={`/productdetilse/${item.id}`} key={item.id} className="block group">
              <div className="rounded-xl border border-gray-200 bg-[#FAFCFA] p-3.5 transition-all duration-200 active:scale-[0.98] hover:shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-2xl">
                    {item.categoryIcon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-semibold text-[#1D271F] truncate">
                      {item.nameBn}
                    </h3>
                    <p className="text-xs text-gray-500">
                      প্রতি {item.unit}
                    </p>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 flex items-end justify-between border-t border-gray-100 pt-2.5">
                  <div>
                    <p className="text-[11px] text-gray-500">আজকের দাম</p>
                    <p className="text-lg sm:text-xl font-bold text-[#1D271F]">
                      {item.today} টাকা
                    </p>
                  </div>

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
    </div>
  );
};

export default PriceUp;