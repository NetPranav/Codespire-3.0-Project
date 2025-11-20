"use client";
import React from "react";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/login', redirect: true });
  };

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center w-full px-3 py-2 text-gray-100 hover:text-red-500 hover:bg-gray-700 rounded-md transition-colors duration-200 text-left"
    >
      Sign Out
    </button>
  );
}