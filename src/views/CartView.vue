<template>
  <div v-if="cart.products.length ===0">
    <p>No products in cart.</p>
  </div>
  <v-table v-else>
    <tbody>
      <tr v-for="product in cart.products" :key="product.productId">
         <td>{{ product.productId }}</td>
         <td>{{ product.quantity }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
    import { useCartStore } from '@/plugins/stores/cart'
    import { storeToRefs } from 'pinia';
    
    const cartStore = useCartStore()
    const { cart } = storeToRefs(cartStore)
    const userId = 2;
    onMounted(() =>{
      cartStore.fetchCart(userId)
    })

</script>

<style scoped>

</style>