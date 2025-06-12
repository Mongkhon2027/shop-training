<template>
    <div>
        Product Detail Page
    </div>
    <v-img :src="product?.image" alt="Product Image" width="500" height="500">
    </v-img>
</template>

<script setup lang="ts">
    import productApi from '@/Services/api/features/product'
    import { onMounted, ref } from 'vue';
    import { type Product } from '@/models/product'
    
    const product = ref<Product | null>(null)
    async function getProductById(id: number) {
    try {
      const response = await productApi.getById<Product>(id)
      product.value = response
    } catch (error) {
      console.log('error', error)
    }
  }
    onMounted(() => {
    getProductById(1)
  })
</script>
    
<style scoped>

</style>