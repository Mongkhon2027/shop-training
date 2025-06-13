import { defineStore } from 'pinia'
import { type Cart, type Product } from '@/models/cart'
import cartApi from '@/Services/api/features/cart'

function emptyCart(): Cart {
    return {
      id: 1,
      userId: 1,
      date: new Date(),
      products: [] as Product[],
      __v: 0
    }
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: emptyCart()
  }),

  actions: {
    async fetchCart(userId: number) {
        try {
            const response = await cartApi.getByUserId<Cart[]>(userId)
            const latestCart = response.length > 0 ? response[response.length -1] : null
            if (latestCart) {
                this.cart = {
                    ...latestCart,
                    date: new Date(latestCart.date)
                }
            }
            else {
                this.cart = emptyCart()
            }
        } catch (error) {
            console.error('Fetch cart error', error);
            this.cart =  emptyCart()
        }
    },

    addToCart(productId: number) {
      const existing = this.cart.products.find(p => p.productId === productId)
      if (existing) {
        existing.quantity++
      } else {
        this.cart.products.push({ productId, quantity: 1 })
      }
    },

    clearCart() {
      this.cart.products = []
    }
  }
})