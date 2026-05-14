"use client";

import useCartStore from "@/stores/cartStore";
import { ProductType } from "@/types";
import { Minus, Plus, ShoppingCartIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ProductInteraction = ({
  product,
  selectedSize,
  selectedColor,
}: {
  product: ProductType;
  selectedSize: string;
  selectedColor: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);

  const {addToCart} = useCartStore();


  const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = () => {
    addToCart({
        ...product,
        quantity,
        selectedSize,
        selectedColor
    }),
    toast.success("Product added to cart!");
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* Size */}
      <div className="flex flex-col gap-1 text-sm">
        <span className="text-gray-500">Size</span>
        <div className="flex items-center gap-2">
          {product.sizes.map((size) => (
            <div
              className={`cursor-pointer border 
                ${selectedSize === size ? "border-gray-600 p-[1.2px]" : "border-gray-300"}
            `}
              key={size}
              onClick={() => handleTypeChange("size", size)}
            >
              <div
                className={`w-9 h-6 flex items-center justify-center
                ${selectedSize === size ? "bg-black text-white" : "bg-white text-black"}`}
              >
                {size.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Color */}
      <div className="flex flex-col gap-1 text-sm">
        <span className="text-gray-500">Colors</span>
        <div className="flex items-center gap-2">
          {product.colors.map((color) => (
            <div
              className={`cursor-pointer border rounded-full
                ${selectedColor === color ? "border-black border-2 " : "border-white"}
            `}
              key={color}
              onClick={() => handleTypeChange("color", color)}
            >
              <div className={`w-6 h-6 rounded-full border border-gray-300`} style={{ backgroundColor: color }} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Quantity */}
      <div className="flex flex-col gap-1 text-sm ">
        <span className="text-gray-500">Quantity</span>
        <div className="flex items-center gap-2">
          <button
            className="cursor-pointer border border-gray-300 p-1"
            onClick={() => handleQuantityChange("decrement")}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span>{quantity}</span>
          <button
            className="cursor-pointer border border-gray-300 p-1"
            onClick={() => handleQuantityChange("increment")}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* Buttons */}

      <button
      onClick={()=>handleAddToCart()}
      className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm font-medium 
      hover:bg-gray-900 transition-all duration-300">
        <Plus className="w-4 h-4" />
        Add to Cart
      </button>
      <button className="ring ring-gray-400 shadow-lg text-gray-800 px-4 py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer text-sm font-medium hover:text-white hover:bg-gray-800 transition-all duration-300">
        <ShoppingCartIcon className="w-4 h-4"/> Buy This Item
      </button>
    </div>
  );
};

export default ProductInteraction;
