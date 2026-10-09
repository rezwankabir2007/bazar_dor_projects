
import React from 'react';

const SignUpPage = () => {
    return (
        <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center my-10 px-4">
         
         
            <div className="text-center mb-6">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                    অ্যাকাউন্ট তৈরি করুন
                </h2>
                <p className="text-gray-500 text-sm md:text-base">
                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                </p>
            </div>


            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <form className="space-y-4">
                    
                   
                   
                    <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                            নাম
                        </label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm" 
                            placeholder="যেমন: রহিম উদ্দিন" 
                            required
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                            ইমেইল
                        </label>
                        <input 
                            type="email" 
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm" 
                            placeholder="you@example.com" 
                            required
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                            পাসওয়ার্ড
                        </label>
                        <input 
                            type="password" 
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm" 
                            placeholder="কমপক্ষে ৮ অক্ষর" 
                            required
                        />
                    </div>

                   
                   
                    <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                            পাসওয়ার্ড নিশ্চিত করুন
                        </label>
                        <input 
                            type="password" 
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm" 
                            placeholder="আবার লিখুন" 
                            required
                        />
                    </div>

                   
                   
                    <button 
                        type="submit" 
                        className="w-full bg-[#008744] hover:bg-[#00733a] text-white font-medium py-3 rounded-lg shadow-sm transition-colors text-base mt-2"
                    >
                        অ্যাকাউন্ট তৈরি করুন
                    </button>

                </form>
            </div>

        </div>
    );
};

export default SignUpPage;