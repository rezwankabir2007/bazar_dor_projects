import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";

// react-toastify এবং এর CSS ইম্পোর্ট করা হলো
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "@/components/Navbar";
import Categories from "@/components/Categories";
import SingleCategory from "@/components/SingleCategory";

const geistSans = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর - নিত্যপণ্যের সঠিক দাম",
  description: "প্রতিদিনের নিত্যপ্রয়োজনীয় পণ্যের সঠিক বাজার দর জানুন।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      className={`${geistSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F0F5F0]">
        <Navbar />
        <Categories />
        <SingleCategory />

        <main className="container mx-auto">{children}</main>

        {/* ToastContainer যোগ করা হলো */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}