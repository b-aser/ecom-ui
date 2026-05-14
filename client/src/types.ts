
import {z} from "zod"

export type ProductType = {
    id: string | number;
    name: string;
    shortDescription: string;
    description: string;
    price: number;
    sizes: string[];
    colors: string[];
    images: Record<string, string>;
}

export type ProductsType = ProductType[];

export type CartItemType = ProductType & {
    quantity: number;
    selectedSize: string;
    selectedColor: string;
}

export type CartType = CartItemType[];

export const ShippingFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required"),
    phone: z
        .string()
        .min(9, "Phone number must be atleast 9 digits!")
        .max(10, "Phone number can not ne more that 10 digits!")
        .regex(/^\d+$/, "Phone number can only contain digits!"),
    address: z.string().min(1, "Address is required)"),
    city: z.string().min(1, "City is required"),
})

export type ShippingFormInputs = z.infer<typeof ShippingFormSchema>; 


export const PaymentFormSchema = z.object({
    cardHolderName: z.string().min(1, "Card holder name is required"),
    cardNumber: z.string().min(16, "Card number must be 16 digits").max(16, "Card number must be 16 digits"),
    expiryDate: z
        .string()
        .regex(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, "Invalid date\d+$/ (MM/YY)"),
    cvv: z.string().min(3, "CVV must be 3 digits").max(3, "CVV must be 3 digits"),
})

export type PaymentFormInputs = z.infer<typeof PaymentFormSchema>; 


export type CartStoreStateType = {
    cart: CartItemType[];
    hasHydrated: boolean;
}

export type CartStoreActionsType = {
    addToCart: (product:CartItemType) => void;
    removeFromCart: (product:CartItemType) => void;
    clearCart: () => void;

}