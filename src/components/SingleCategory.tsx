
import Link from "next/link";

interface MarqueeType {
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

const SingleCategory = async () => {
  const getdata = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      next: {
        revalidate: 60,
      },
    }
  );

  const data: MarqueeType[] = await getdata.json();

  return (
    <>
      {/* Marquee Animation */}
      <style >{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .marquee {
          animation: marquee 60s linear infinite;
        }

        .marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="bg-[#FAFCFA] shadow-md p-2 overflow-hidden">
        <div className="flex w-max marquee">
          
          {/* First Data */}
          {data.map((marquee) => (
            <Link
              href={`/productdetilse/${marquee.id}`}
              key={`first-${marquee.id}`}
              className="hover:underline"
            >
              <div className="flex items-center gap-1.5 px-5 border-r border-[#E5E7EB] whitespace-nowrap">
                
                {/* Icon */}
                <span className="text-sm">
                  {marquee.categoryIcon}
                </span>

                {/* Name */}
                <span className="text-[15px] text-[#252B27]">
                  {marquee.nameBn}
                </span>

                {/* Price */}
                <span className="text-[15px] text-[#252B27]">
                  {marquee.today} টাকা/{marquee.unit}
                </span>

                {/* Change */}
                {marquee.change.dir === "up" ? (
                  <span className="text-[#D03739] font-semibold text-sm">
                    ▲ {marquee.change.pct}%
                  </span>
                ) : (
                  <span className="text-[#1A9951] font-semibold text-sm">
                    ▼ {marquee.change.pct}%
                  </span>
                )}
              </div>
            </Link>
          ))}

          {/* Duplicate Data - For Continuous Marquee */}
          {data.map((marquee) => (
            <Link
              href={`/productdetilse/${marquee.id}`}
              key={`second-${marquee.id}`}
            >
              <div className="flex items-center gap-1.5 px-5 border-r border-[#E5E7EB] whitespace-nowrap">
                
                {/* Icon */}
                <span className="text-sm">
                  {marquee.categoryIcon}
                </span>

                {/* Name */}
                <span className="text-[15px] text-[#252B27]">
                  {marquee.nameBn}
                </span>

                {/* Price */}
                <span className="text-[15px] text-[#252B27]">
                  {marquee.today} টাকা/{marquee.unit}
                </span>

                {/* Change */}
                {marquee.change.dir === "up" ? (
                  <span className="text-[#D03739] font-semibold text-sm">
                    ▲ {marquee.change.pct}%
                  </span>
                ) : (
                  <span className="text-[#1A9951] font-semibold text-sm">
                    ▼ {marquee.change.pct}%
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default SingleCategory;
