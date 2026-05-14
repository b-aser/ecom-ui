"use client";
import useCartStore from "@/stores/cartStore";
import { ProductType } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [productType, setProductType] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  const { addToCart } = useCartStore();

  const handleProductType = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductType((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: productType.size,
      selectedColor: productType.color,
    });
    toast.success("Product added to cart!");
  };
  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      {/* Image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-2/3">
          <Image
            src={product.images[productType.color]}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-all duration-300"
            loading="eager"
            sizes="240px 240px"
          />
        </div>
      </Link>

      {/* Product Detail */}
      <div className="flex flex-col gap-2 p-4">
        <h1 className="font-medium">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.shortDescription}</p>
        {/* Product Types */}
        <div className="flex items-center gap-2 text-xs">
          {/* Size */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Size</span>
            <select
              name="size"
              id="size"
              className="ring ring-gray-300 rounded-md px-1 py-0.5"
              onChange={(e) =>
                handleProductType({ type: "size", value: e.target.value })
              }
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          {/* Color */}
          <div className="flex flex-col gap-0.5">
            <span className="text-gray-500">Color</span>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <div
                  className={`cursor-pointer border rounded-full ${
                    productType.color === color
                      ? "border-gray-500 p-[1.2px]"
                      : "border-gray-200"
                  } p-[1.2px]`}
                  key={color}
                  onClick={() =>
                    handleProductType({ type: "color", value: color })
                  }
                >
                  <div
                    className="w-4.5 h-4.5 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Price and Add-to-Cart */}
        <div className="flex items-center justify-between">
          <span className="font-medium">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="ring ring-gray-200 shadow-lg rounded-md px-2 py-1 text-sm cursor-pointer hover:text-white hover:bg-black transition-all duration-300 flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
