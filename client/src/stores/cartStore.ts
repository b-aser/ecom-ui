import { CartStoreActionsType, CartStoreStateType } from '@/types'
import { de } from 'zod/locales'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'



const useCartStore = create<CartStoreStateType & CartStoreActionsType>()(
    persist(
        (set) => ({
            cart: [],
            hasHydrated: false,
            addToCart: (product) =>
                set((state) => {
                    const existingIndex = state.cart.findIndex((item) =>
                        item.id === product.id &&
                        item.selectedSize === product.selectedSize &&
                        item.selectedColor === product.selectedColor
                    )

                    if (existingIndex !== -1) {
                        const updatedCart = [...state.cart]
                        updatedCart[existingIndex].quantity += product.quantity || 1
                        return { cart: updatedCart }
                    }
                    return {
                        cart: [
                            ...state.cart,
                            {
                                ...product,
                                quantity: product.quantity,
                                selectedSize: product.selectedSize,
                                selectedColor: product.selectedColor
                            }]
                    }

                }),
            removeFromCart: (product) =>
                set((state) => ({
                    cart: state.cart.filter(
                    (item) =>
                    !(
                        item.id === product.id &&
                        item.selectedSize === product.selectedSize &&
                        item.selectedColor === product.selectedColor
                    )),
                })),
            clearCart: () => set({ cart: [] }),
        }),
        {
            name: 'cart',
            storage: createJSONStorage(() => sessionStorage),
            onRehydrateStorage: () => (state) => {
                if(state){
                    state.hasHydrated = true;
                }
            }
        }
    )
);

export default useCartStore;