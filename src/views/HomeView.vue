<template>
  <!-- <div class="test-variable text-h4">test-variable</div> -->
  <div>{{ product?.category }}</div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import { type Product } from '@/models/product';
import productApi from '@/Services/api/features/product'

  const product = ref<Product | null>(null)
  const products = ref<Product[] | null>(null)

  async function getAllProduct() {
    try{
      const response = await productApi.getAll<Product[]>()
      products.value = response
    } catch (error) {
      console.log('error', error)
    }
  }

  async function getProductById(id:number) {
    try{
      const response = await productApi.getById<Product>(id)
      product.value = response
    } catch (error) {
      console.log('error', error)
    }
  }

onMounted(() => {
  getAllProduct()
  getProductById(2)
})
</script>

<style lang="scss">
  .test-variable {
    background-color: $error;
  }
  .test-mixin {
    @include gradient($primary, $error)
  }

</style>
