"use client";

import { CartItemType, ShippingFormInputs } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Trash2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import ShippingForm from "@/components/ShippingForm";
import PaymentForm from "@/components/PaymentForm";
import useCartStore from "@/stores/cartStore";

const steps = [
  {
    id: 1,
    title: "Shopping Cart",
  },
  {
    id: 2,
    title: "Shipping Address",
  },
  {
    id: 3,
    title: "Payment Method",
  },
];

// const cartItems: CartItemType[] = [
//   {
//     id: 1,
//     name: "Adidas CoreFit T-Shirt",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 39.9,
//     sizes: ["s", "m", "l", "xl", "xxl"],
//     colors: ["gray", "purple", "green"],
//     images: {
//       gray: "/products/1g.png",
//       purple: "/products/1p.png",
//       green: "/products/1gr.png",
//     },
//     quantity: 1,
//     selectedSize: "m",
//     selectedColor: "green",
//   },
//   {
//     id: 2,
//     name: "Puma Ultra Warm Zip",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 59.9,
//     sizes: ["s", "m", "l", "xl"],
//     colors: ["gray", "green"],
//     images: { gray: "/products/2g.png", green: "/products/2gr.png" },
//     quantity: 1,
//     selectedSize: "l",
//     selectedColor: "gray",
//   },
//   {
//     id: 3,
//     name: "Nike Air Essentials Pullover",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 69.9,
//     sizes: ["s", "m", "l"],
//     colors: ["green", "blue", "black"],
//     images: {
//       green: "/products/3gr.png",
//       blue: "/products/3b.png",
//       black: "/products/3bl.png",
//     },
//     quantity: 1,
//     selectedSize: "m",
//     selectedColor: "black",
//   },
// ];

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();

  const { cart, removeFromCart } = useCartStore();

  const activeStep = parseInt(searchParams.get("step") || "1");
  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-12">
      {/* Title */}
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>

      {/* Steps */}
      <div className="flex flex-col md:flex-row lg:flex-row items-center gap-8 lg:gap-16">
        {steps.map((step) => (
          <div
            className={`px-4 flex items-center gap-2 border-b-3 pb-2 ${
              step.id === activeStep ? "border-gray-800" : "border-gray-200"
            }`}
            key={step.id}
          >
            <div
              className={`w-4 h-4 rounded-full text-white p-4 flex items-center justify-center ${
                step.id === activeStep ? "bg-gray-800" : "bg-gray-300"
              }`}
            >
              {step.id}
            </div>
            <p
              className={`text-sm font-medium ${
                step.id === activeStep ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>

      {/* Steps & Details */}
      <div className="w-full flex flex-col lg:flex-row gap-16">
        {/* Steps */}
        <div className="w-full lg:w-7/12 shadow-lg border border-gray-100 p-8 rounded-lg flex flex-col gap-8">
          {activeStep === 1 ? (
            <div className="flex flex-col gap-6">
              {cart.map((item) => (
                <div
                  className="flex items-center justify-between"
                  key={item.id + item.selectedSize + item.selectedColor}
                >
                  {/* Image and Detail */}
                  <div className="flex gap-8">
                    {/* Image */}
                    <div className="relative w-30 h-30 bg-gray-50 overflow-hidden rounded-lg">
                      <Image
                        src={item.images[item.selectedColor]}
                        alt={item.name}
                        fill
                        className="object-contain"
                        loading="eager"
                        sizes="full"
                      />
                    </div>
                    {/* Detail  */}
                    <div className="flex flex-col justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium ">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-xs text-gray-500">
                          Size: {item.selectedSize.toUpperCase()}
                        </p>
                        <p className="text-xs text-gray-500">
                          Color: {item.selectedColor}
                        </p>
                      </div>
                      <p className="font-medium">{item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeFromCart(item)}
                    className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 text-red-500 flex items-center justify-center cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                // <div className="flex items-center justify-between gap-4" key={item.id}>
                //   <div className="flex gap-4">
                //     {/* Image */}
                //     <div className="relative w-20 h-24 bg-gray-100 rounded-md overflow-hidden">
                //       <Image
                //         src={item.images[item.selectedColor as keyof typeof item.images] || Object.values(item.images)[0]}
                //         alt={item.name}
                //         fill
                //         className="object-cover"
                //       />
                //     </div>

                //     <div className="flex flex-col justify-between py-1">
                //       <div>
                //         <h3 className="font-medium text-sm">{item.name}</h3>
                //         <p className="text-xs text-gray-500">
                //           {item.selectedSize.toUpperCase()} | {item.selectedColor}
                //         </p>
                //       </div>

                //       <div className="flex items-center gap-4">
                //         <span className="text-xs">Qty: {item.quantity}</span>
                //         <button className="text-red-500 hover:text-red-700">
                //           <Trash2 className="w-4 h-4" />
                //         </button>
                //       </div>

                //     </div>
                //   </div>
                //   <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                // </div>
              ))}
            </div>
          ) : activeStep === 2 ? (
            <ShippingForm setShippingForm={setShippingForm} />
          ) : activeStep === 3 && shippingForm ? (
            <PaymentForm />
          ) : (
            <p className="text-sm text-gray-500">
              Please fill the shipping form to continue.
            </p>
          )}
        </div>

        {/* Details */}
        <div className="w-full lg:w-5/12 border border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max shadow-lg">
          <h2>Cart Details</h2>
          <div className="flex flex-col gap-2">
            <div className="text-sm flex justify-between">
              <p className=" text-gray-500">Subtotal</p>
              <p className="font-medium">
                $
                {cart
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0,
                  )
                  .toFixed(2)}
              </p>
            </div>
            <div className="text-sm flex justify-between">
              <p className=" text-gray-500">Discount (10%)</p>
              <p className="font-medium">$10</p>
            </div>
            <div className="text-sm flex justify-between">
              <p className=" text-gray-500">Shipping Fee</p>
              <p className="font-medium">$10</p>
            </div>
            <hr className="border-gray-200" />
            <div className=" flex justify-between">
              <p className=" text-gray-800">Total</p>
              <p className="font-semibold">
                $
                {cart
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0,
                  )
                  .toFixed(2)}
              </p>
            </div>
          </div>
          {activeStep === 1 && (
            <button
              className="w-full bg-gray-800 cursor-pointer text-white p-2 rounded-lg flex flex-row items-center justify-center gap-2 hover:bg-gray-900"
              onClick={() => router.push("/cart?step=2", { scroll: false })}
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
