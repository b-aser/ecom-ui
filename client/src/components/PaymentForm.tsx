import { PaymentFormSchema, PaymentFormInputs } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(PaymentFormSchema),
  });

  const router = useRouter();

  const handlePaymentForm: SubmitHandler<PaymentFormInputs> = (data) => {
  };
  return (
    <form
      className="flex flex-col gap-4"
      
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="cardHolderName" className="text-xs text-gray-500 font-medium">
          Name on Card
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="cardHolderName"
          placeholder="John Doe"
          {...register("cardHolderName")}
        />
        {errors.cardHolderName && (
          <p className="text-xs text-red-500">(errors.cardHolderName.message)</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="cardNumber" className="text-xs text-gray-500 font-medium">
          Card Number
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="cardNumber"
          placeholder="1234 5678 9012 3456"
          {...register("cardNumber")}
        />
        {errors.cardNumber && (
          <p className="text-xs text-red-500">(errors.cardNumber.message)</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="expiryDate" className="text-xs text-gray-500 font-medium">
          Expire Date
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="expiryDate"
          placeholder="02/29"
          {...register("expiryDate")}
        />
        {errors.expiryDate && (
          <p className="text-xs text-red-500">(errors.expiryDate.message)</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="cvv" className="text-xs text-gray-500 font-medium">
          CVV
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="cvv"
          placeholder="123"
          {...register("cvv")}
        />
        {errors.cvv && (
          <p className="text-xs text-red-500">(errors.cvv.message)</p>
        )}
      </div>
        <div className="flex items-center gap-2 mt-4">
          <Image src='/klarna.png' alt="klarna" width={50} height={25}
          className="rounded-md"
          />
          <Image src='/cards.png' alt="cards" width={50} height={25}
          className="rounded-md"
          />
          <Image src='/stripe.png' alt="strip" width={50} height={25}
          className="rounded-md"
          />
        </div>
      
      <button
        className="w-full bg-gray-800 cursor-pointer text-white p-2 rounded-lg flex flex-row items-center justify-center gap-2 hover:bg-gray-900"
        type="submit"
      >
        Checkout
        <ShoppingCartIcon className="w-4 h-4" />
      </button>
    </form>
  );
};

export default PaymentForm;
