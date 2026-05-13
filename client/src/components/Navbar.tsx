import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchBar from "./SearchBar";
import Home from "@/app/page";
import { Bell, HomeIcon, ShoppingCart } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCartIcon";


const Navbar = () => {
  return (
    <div className="flex items-center justify-between border-b border-gray-400 py-4">
    {/* Left */}
    <Link href="/" className="flex items-center">
      <Image 
      src="/logo.png" 
      alt="TrendLama" 
      width={36} 
      height={36}
      className="w-6 h-6 md:w-9 md:h-9" />
      <p className="hidden md:block text-md font-medium tracking-wider">TRENDLAMA</p>
    </Link>

    {/* Right */}
    <div className="flex items-center gap-4">
        <SearchBar/>
        <Link href="/">
            <HomeIcon className="w-4 h-4 text-gray-600"/>
        </Link>
        <Bell className="w-4 h-4 text-gray-600"/>
        <ShoppingCartIcon />
        <Link href="/signin" className="text-sm font-medium text-gray-600 hover:text-gray-800">
          Sign In
        </Link>

    </div>

    </div>
  );
};

export default Navbar;
