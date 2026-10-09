'use client';

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

const SignInPage = () => {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get('email') || '');
    const password = String(formData.get('password') || '');

    const toastId = toast.loading('সাইন ইন হচ্ছে...');

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: '/',
      });

      if (data) {
        toast.update(toastId, {
          render: 'সফলভাবে সাইন ইন হয়েছে! 🎉',
          type: 'success',
          isLoading: false,
          autoClose: 2000,
        });

        router.push('/');
      }

      if (error) {
        toast.update(toastId, {
          render: error.message || 'ইমেইল বা পাসওয়ার্ড ভুল হয়েছে!',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (err) {
      toast.update(toastId, {
        render: 'কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'github') => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: '/',
      });
    } catch (err) {
      toast.error('সোশ্যাল সাইন ইন করতে ব্যর্থ হয়েছে!');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-100px)] flex-col items-center justify-center my-10 px-4">
      {/* Header Info */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">সাইন ইন</h2>
        <p className="text-gray-500 text-sm md:text-base">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              ইমেইল
            </label>
            <input
              type="email"
              name="email"
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
              name="password"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
              placeholder="কমপক্ষে ৮ অক্ষর"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#008744] hover:bg-[#00733a] text-white font-medium py-3 rounded-lg shadow-sm transition-colors text-base"
          >
            সাইন ইন
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="border-t border-gray-200 w-full" />
          <span className="bg-white px-3 text-xs text-gray-400 absolute">
            অথবা
          </span>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleSocialSignIn('google')}
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 px-3 bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Google দিয়ে চালিয়ে যান
          </button>

          <button
            onClick={() => handleSocialSignIn('github')}
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 px-3 bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        {/* Sign up Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          অ্যাকাউন্ট নেই?{' '}
          <Link
            href="/sign-up"
            className="text-emerald-600 font-semibold hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      {/* Back to Home Link */}
      <div className="mt-6">
        <Link
          href="/"
          className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;