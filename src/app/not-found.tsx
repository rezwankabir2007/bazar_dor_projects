'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-emerald-50/40 flex flex-col items-center justify-center p-4 selection:bg-emerald-100 selection:text-emerald-800 overflow-hidden">
      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        
        {/* ব্যাগ এবং ৪০৪ অ্যানিমেশন সেকশন */}
        <div className="relative flex flex-col items-center justify-center min-h-[220px]">
          
          {/* পিছনের স্মুথ গ্লো ব্যাকগ্রাউন্ড */}
          <div className="absolute w-60 h-60 bg-emerald-200/50 rounded-full blur-3xl -z-10 animate-pulse" />

          {/* ওপর থেকে ব্যাগ পড়ার অ্যানিমেশন */}
          <motion.div
            initial={{ y: -250, opacity: 0, rotate: -10 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 12,
              duration: 1,
            }}
            className="relative z-20 cursor-pointer"
            whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
          >
            {/* শপিং ব্যাগ SVG */}
            <div className="w-28 h-28 sm:w-32 sm:w-32 bg-white p-4 rounded-3xl shadow-xl shadow-emerald-900/10 border border-emerald-100 flex items-center justify-center text-[#05893E]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-20 h-20 text-[#05893E] drop-shadow-md"
              >
                <path d="M16 6V4a4 4 0 0 0-8 0v2H4a1 1 0 0 0-1 1v13a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7a1 1 0 0 0-1-1h-4ZM10 4a2 2 0 0 1 4 0v2h-4V4Zm8 16H6a1 1 0 0 1-1-1V8h2v2a1 1 0 1 0 2 0V8h6v2a1 1 0 1 0 2 0V8h2v11a1 1 0 0 1-1 1Z" />
              </svg>
            </div>

            {/* ব্যাগের স্যাডো (Shadow) যা ব্যাগ নামার সাথে সাথে বড় হবে */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-24 h-3 bg-gray-900 rounded-full mx-auto blur-xs mt-3"
            />
          </motion.div>

          {/* 404 টেক্সট */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-7xl sm:text-8xl font-black text-gray-900 tracking-tight mt-2"
          >
            4<span className="text-[#05893E]">0</span>4
          </motion.h1>
        </div>

        {/* বিবরণ ও মেসেজ */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="space-y-3"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            ঝুড়ি খালি! পেজটি পাওয়া যায়নি
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed px-4">
            আপনি যে পেজটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা লিংকটি ভুল ছিল। চলুন আবার মূল বাজারে ফিরে যাই!
          </p>
        </motion.div>

        {/* অ্যাকশন বাটনসমূহ */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
        >
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#05893E] hover:bg-[#047334] text-white font-semibold text-sm rounded-2xl shadow-lg shadow-emerald-700/20 hover:shadow-xl transition-all active:scale-95"
          >
            {/* হোম আইকন */}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 00-1 1m-6 0h6"
              />
            </svg>
            হোম পেজে ফিরে যান
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-gray-100 text-gray-700 font-semibold text-sm rounded-2xl border border-gray-200 shadow-sm transition-all active:scale-95"
          >
            {/* ব্যাক আইকন */}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            আগের পৃষ্ঠায় যান
          </button>
        </motion.div>

      </div>
    </div>
  );
}