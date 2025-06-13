import { useCartStore } from "@/plugins/stores/cart";
import { useAuthStore } from "@/plugins/stores/auth";
import productApi from "@/Services/api/features/product";
import type { Product } from "@/models/product";

export function useEnrichedCart(userId: number){
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    const cart = cartStore.fetchCart
    const products = ref<Product[]>([])

    async function fetchData() {
        await cartStore.fetchCart(userId)
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