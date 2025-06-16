import { useCartStore } from "@/plugins/stores/cart";
import { useAuthStore } from "@/plugins/stores/auth";
import productApi from "@/Services/api/features/product";
import type { Product } from "@/models/product";    

export function useEnrichedCart(){
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    const cart = cartStore.cart
    const products = ref<Product[]>([])

    async function fetchData() {
        if(authStore.userId === null) return
        await cartStore.fetchCart(Number(authStore.userId))
        products.value = await productApi.getAll<Product[]>()
    }

    const enrichedProducts = computed(() =>{
        if(!cart) return []
        return cart.products.map(item => ({
            ...item,
            product: products.value.find(p => p.id === item.productId)
        }))

    })
    onMounted(fetchData)

    return {
        cart,
        enrichedProducts
    }
}