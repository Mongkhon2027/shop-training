import { defineStore } from 'pinia'
import { type Cart, type Product } from '@/models/cart'
import cartApi from '@/Services/api/features/cart'
import { useAuthStore } from './auth'


function emptyCart(): Cart {
    return {
      id: 1,
      userId: 1,
      date: new Date(),
      products: [] as Product[],
      __v: 0
    }
}

export const useCartStore = defineStore('cart',()=> {
    const cart = ref<Cart | null>(null)
   
    async function fetchCart(userId: number) {
        try {
            const response = await cartApi.getByUserId<Cart[]>(userId)
            const latestCart = response.length > 0 ? response[response.length -1] : null
            if (latestCart) {
                cart.value= {
                    ...latestCart,
                    date: new Date(latestCart.date)
                }
            }
            else {
                cart.value = emptyCart()
            }
        } catch (error) {
            console.error('Fetch cart error', error);
            cart.value =  emptyCart()
        }
    }
    async function fetchCartFromAuthUser() {
        const authStore = useAuthStore()
        if(!authStore.setUserId) return

        try {
            const response = await cartApi.getByUserId<Cart[]>(authStore.setUserId)
            const latestCart = response.length > 0 ? response[response.length -1 ] : null

            if(latestCart) {
                cart.value = {
                    ...latestCart,
                    date: new Date(latestCart.date)
                } 
            } else {
                cart.value = emptyCart()
            }
        } catch (error) {
            console.error('Fetch cart error', error);
            cart.value = emptyCart()
        
        }
    }
    function addToCart(productId: number) {
    const existing = cart.value!.products.find(p => p.productId === productId)
    if (existing) {
        existing.quantity++
    } else {
        cart.value!.products.push({ productId, quantity: 1 })
    }
    }

    function clearCart() {
    cart.value!.products = []
    }
    return {fetchCart, fetchCartFromAuthUser, addToCart, clearCart}
}, {
  persist: {
    key: 'cart',
    storage: localStorage,
    pick: ['carts']
  }
}
)