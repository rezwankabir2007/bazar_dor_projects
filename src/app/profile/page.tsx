"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error("নাম ও ইমেইল লিখুন!");
      return;
    }

    setSaving(true);

    try {
      // নাম পরিবর্তন
      const { error: nameError } = await authClient.updateUser({
        name: name.trim(),
      });

      if (nameError) {
        toast.error(nameError.message || "নাম পরিবর্তন করা যায়নি!");
        return;
      }

      // ইমেইল পরিবর্তন
      if (email.trim().toLowerCase() !== user?.email.toLowerCase()) {
        const { error: emailError } = await authClient.changeEmail({
          newEmail: email.trim(),
          callbackURL: "/profile",
        });

        if (emailError) {
          toast.error(
            emailError.message || "ইমেইল পরিবর্তন করা যায়নি!"
          );
          return;
        }

        toast.success(
          "নাম আপডেট হয়েছে। ইমেইল পরিবর্তনে ভেরিফিকেশন লাগতে পারে।"
        );
      } else {
        toast.success("নাম সফলভাবে পরিবর্তন হয়েছে!");
      }

      setEdit(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("তথ্য পরিবর্তন করতে সমস্যা হয়েছে!");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সাইন আউট সফল হয়েছে!");
            // সাইন আউট করার পর সরাসরি সাইন ইন পেজে রিডাইরেক্ট করবে
            window.location.href = "/signin";
          },
        },
      });
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে!");
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-emerald-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <p className="text-center text-lg text-gray-600">
          প্রোফাইল দেখতে আপনাকে প্রথমে সাইন ইন করতে হবে।
        </p>

        <Link
          href="/signin"
          className="rounded-lg bg-[#008744] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#00733a]"
        >
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto my-10 max-w-4xl px-4">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-500" />

        <div className="relative px-6 pb-6 pt-0">
          {/* Profile Header */}
          <div className="mb-4 -mt-16 flex flex-col items-center gap-4 sm:-mt-12 sm:flex-row sm:items-end">
            {/* Avatar */}
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-white bg-white shadow-md">
              {user.image ? (
                <Image
                  alt={user.name || "User Avatar"}
                  src={user.image}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-emerald-100 text-3xl font-bold text-emerald-800">
                  {user.name?.charAt(0) || "U"}
                </div>
              )}
            </div>

            {/* Name and Email */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900">
                {user.name}
              </h1>
              <p className="break-all text-sm text-gray-500">
                {user.email}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setName(user.name || "");
                  setEmail(user.email || "");
                  setEdit(!edit);
                }}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
              >
                ✏️ তথ্য পরিবর্তন
              </button>

              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-lg border border-rose-100 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-100"
              >
                সাইন আউট
              </button>
            </div>
          </div>

          {/* Edit Form */}
          {edit && (
            <form
              onSubmit={handleUpdate}
              className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50/50 p-4"
            >
              {/* Name */}
              <label
                htmlFor="profile-name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                পূর্ণ নাম
              </label>

              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={100}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-black outline-none focus:border-emerald-500"
                placeholder="তোমার নাম লিখো"
              />

              {/* Email */}
              <label
                htmlFor="profile-email"
                className="mb-2 mt-4 block text-sm font-medium text-gray-700"
              >
                ইমেইল ঠিকানা
              </label>

              <input
                id="profile-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-black outline-none focus:border-emerald-500"
                placeholder="তোমার ইমেইল লিখো"
              />

              <p className="mt-2 text-xs text-gray-500">
                নতুন ইমেইল ভেরিফাই করতে হতে পারে।
              </p>

              {/* Save and Cancel */}
              <div className="mt-4 flex gap-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                  {saving ? "সংরক্ষণ হচ্ছে..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={() => setEdit(false)}
                  disabled={saving}
                  className="rounded-lg bg-gray-200 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Personal Details */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              ব্যক্তিগত তথ্য
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Name */}
              <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                <span className="mb-1 block text-xs font-medium text-gray-400">
                  পূর্ণ নাম
                </span>
                <p className="break-words text-sm font-semibold text-gray-800">
                  {user.name || "N/A"}
                </p>
              </div>

              {/* Email */}
              <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                <span className="mb-1 block text-xs font-medium text-gray-400">
                  ইমেইল ঠিকানা
                </span>
                <p className="break-all text-sm font-semibold text-gray-800">
                  {user.email}
                </p>
              </div>

              {/* Email Verification */}
              <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                <span className="mb-1 block text-xs font-medium text-gray-400">
                  ইমেইল ভেরিফিকেশন
                </span>

                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    user.emailVerified
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {user.emailVerified ? "ভেরিফাইড" : "আনভেরিফাইড"}
                </span>
              </div>

              {/* Created Date */}
              <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                <span className="mb-1 block text-xs font-medium text-gray-400">
                  অ্যাকাউন্ট তৈরির তারিখ
                </span>

                <p className="text-sm font-semibold text-gray-800">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("bn-BD", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;