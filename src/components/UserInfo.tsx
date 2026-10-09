"use client"

import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div>
      {user ? (
        /* DaisyUI Dropdown Container */
        <div className="dropdown dropdown-end">
          {/* প্রোফাইল বাটন (যা ক্লিক বা হোভার করলে ড্রপডাউন খুলবে) */}
          <div
            tabIndex={0}
            role="button"
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden relative bg-gray-200 border border-gray-300">
              {user.image ? (
                <Image
                  alt={user?.name || "User Avatar"}
                  src={user.image}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-gray-600">
                  {user?.name?.charAt(0) || "U"}
                </div>
              )}
            </div>
            <span className="font-semibold text-gray-800 text-sm hidden sm:block">
              {user?.name?.split(" ")[0]}
            </span>
            {/* ছোট অ্যারো আইকন */}
            <svg
              className="w-3.5 h-3.5 text-gray-600 hidden sm:block"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* ড্রপডাউন মেনু কার্ড */}
          <div
            tabIndex={0}
            className="dropdown-content menu z-[1] p-4 shadow-xl bg-white rounded-2xl w-64 border border-gray-100 mt-2 space-y-3"
          >
            {/* নাম ও ইমেইল সেকশন */}
            <div className="border-b border-gray-100 pb-2">
              <h3 className="font-bold text-gray-900 text-base">
                {user?.name}
              </h3>
              <p className="text-xs text-gray-500 truncate mt-0.5">
                {user?.email}
              </p>
            </div>

            {/* মেনু অপশনসমূহ */}
            <ul className="space-y-1 text-sm font-medium text-gray-700">
              <li>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-2 hover:bg-emerald-50 hover:text-[#05893E] rounded-lg transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  আমার প্রোফাইল
                </Link>
              </li>

              <li>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  সাইন আউট
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        /* লগইন না থাকলে সাইন ইন/সাইন আপ বাটন */
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Link href={"/signin"}>
            <button className="text-xs sm:text-sm font-semibold text-[#1D271F] px-2 py-1.5 hover:text-[#05893E] transition-colors">
              সাইন ইন
            </button>
          </Link>

          <Link href={"/signup"}>
            <button className="bg-[#05893E] hover:bg-[#047936] text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-white shadow-sm transition-all active:scale-95">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;