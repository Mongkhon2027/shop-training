<template>
  <div v-if="!cart ||cart.products.length ===0">
    <p>No products in cart.</p>
  </div>
  <v-table v-else>
    <tbody>
      <tr v-for="item in enrichedProducts" :key="item.productId">
         <td><v-img :src="item.product?.image" width="40" height="40"></v-img></td>
         <td>{{ item.product?.title }}</td>
         <td>{{ item.product?.price }}</td>
         <td>{{ item.quantity }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
  import { useEnrichedCart } from '@/composables/useEnrichedCart';

  const { cart, enrichedProducts } = useEnrichedCart()
</script>

<style scoped>

</style>