"use client";

import Link from "next/link";
import { Button } from "@repo/ui";

export default function Header() {
  return (
    <header className="border-b border-gray-800">
      <div className="flex h-14 items-center justify-between px-4">
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <Link href="/" className="text-cyan-400 hover:text-cyan-300">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </Link>

          {/* Navigation Items */}
          <nav className="flex items-center space-x-6">
            <Link
              href="/domains"
              className="text-lg text-cyan-400 hover:text-cyan-300"
            >
              Domain Marketplace
            </Link>
          </nav>
        </div>

        {/* Center - Search */}
        <div>
          <div className="flex gap-8 max-w-2xl mx-auto">
            <Link
              href="/domains"
              className="text-md font-medium text-gray-300 hover:text-gray-200"
            >
              Buy domain
            </Link>
            <Link
              href="/domains"
              className="text-md font-medium text-gray-300 hover:text-gray-200"
            >
              Sell domain
            </Link>
          </div>
        </div>

        {/* Right - Connect Wallet */}
        <div>
          <Button className="bg-cyan-400 text-lg font-medium text-black hover:bg-cyan-300">
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
