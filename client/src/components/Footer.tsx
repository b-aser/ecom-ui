import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-16 flex flex-col gap-6 md:gap-0 items-center md:flex-row md:items-start md:justify-between bg-gray-800 p-8 rounded-lg">
      <div className="flex flex-col items-center md:items-start gap-2">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="TrendLama"
            width={36}
            height={36}
            className="w-6 h-6 md:w-9 md:h-9"
          />
          <p className="hidden md:block text-md font-medium tracking-wider text-white">TRENDLAMA</p>
        </Link>
        <p className="text-sm text-gray-400 mt-4">
          &copy; {new Date().getFullYear()} TrendLama.
        </p>
        <p className="text-sm text-gray-400">
          All rights reserved
        </p>
      </div>

        {/* ---------------- */}
      <div className="flex flex-col gap-2 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href="/" className="hover:text-gray-200">
          Home
        </Link>
        <Link href="/" className="hover:text-gray-200">
          Contact
        </Link>
        <Link href="/" className="hover:text-gray-200">
          Privacy Policy
        </Link>
        <Link href="/" className="hover:text-gray-200">
          Terms & Conditions
        </Link>
      </div>


        {/* ---------------- */}
      <div className="flex flex-col gap-2 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href="/" className="hover:text-gray-200">
          All Products
        </Link>
        <Link href="/" className="hover:text-gray-200">
          New Arrivals
        </Link>
        <Link href="/" className="hover:text-gray-200">
          Best Sellers
        </Link>
        <Link href="/" className="hover:text-gray-200">
          Sales
        </Link>
      </div>


      {/* -------------- */}
      <div className="flex flex-col gap-2 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href="/" className="hover:text-gray-200">
          About
        </Link>
        <Link href="/" className="hover:text-gray-200">
          Contact
        </Link>
        <Link href="/" className="hover:text-gray-200">
          Blog
        </Link>
        <Link href="/" className="hover:text-gray-200">
          Affiliate Link
        </Link>
      </div>
    </div>
  );
};

export default Footer;
