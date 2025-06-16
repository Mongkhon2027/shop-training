import { useCartStore } from "@/plugins/stores/cart";
import { useAuthStore } from "@/plugins/stores/auth";
import productApi from "@/Services/api/features/product";
import type { Product } from "@/models/product";    

export function useEnrichedCart(){
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    const cart = cartStore.cart
    const products = ref<Product[]>([])
    const loading = ref(true)

    async function fetchData() {
        if(authStore.userId === null) return

        loading.value = true

        try {
            await Promise.all([
                cartStore.fetchCart(Number(authStore.userId)),
                loadingProducts()
            ])
        } catch (error) {
            console.error('Error fetching cart data:', error)
        } finally {
            loading.value = false
        }
    }

    async function loadingProducts() {
        try {
            products.value = await productApi.getAll<Product[]>()
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }

    const enrichedProducts = computed(() =>{
        if(!cart || !cart?.products || cart?.products.length === 0) return []
        return cart.products.map(item => ({
            ...item,
            product: products.value.find(p => p.id === item.productId)
        })).filter(item => item.product)

    })

    onMounted(fetchData)

    watch(()=> authStore.userId, (newUserId)=>{
        if(newUserId) {
            fetchData()
        }
    })

    return {
        cart,
        enrichedProducts,
        loading,
        refetch: fetchData
    }
}