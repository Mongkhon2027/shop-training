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
        if(!authStore.userId) return

        try {
            const response = await cartApi.getByUserId<Cart[]>(authStore.userId)
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
    
    async function addToCart(productId: number) {
        const authStore = useAuthStore()
        if(!authStore.userId) return

        if(!cart.value){
            cart.value = emptyCart()
        }

        const existing = cart.value!.products.find(p => p.productId === productId)
        if (existing) {
            existing.quantity++
        } else {
            cart.value.products.push({ productId, quantity: 1 })
        }
        // ส่งข้อมูลไปยัง API
        try {
            const cartData = {
                userId: Number(authStore.userId),
                date: new Date().toISOString(),
                products: cart.value.products
            }

            if (cart.value.id && cart.value.id > 0) {
                // อัพเดท cart ที่มีอยู่
                await cartApi.updateCart(cart.value.id, cartData)
            } else {
                // สร้าง cart ใหม่
                const newCart = await cartApi.addOrUpdateCart<typeof cartData, Cart>(cartData)
                cart.value.id = newCart.id
            }

            console.log('Cart updated successfully')
        } catch (error) {
            console.error('Error updating cart:', error)
        }
    }

    function clearCart() {
        cart.value!.products = []
    }

    return {cart, 
            fetchCart, 
            fetchCartFromAuthUser, 
            addToCart, 
            clearCart}
}, {
  persist: {
    key: 'cart',
    storage: localStorage,
    pick: ['cart']
  }
}
)