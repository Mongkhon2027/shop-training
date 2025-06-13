<template>
  <card-component :products="products" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { type Product } from '@/models/product';
import productApi from '@/Services/api/features/product'
import cardComponent from '@/components/cardComponent.vue'

const product = ref<Product | null>(null)
const products = ref<Product[] | null>(null)

async function getAllProduct() {
  try {
    const response = await productApi.getAll<Product[]>()
    products.value = response
  } catch (error) {
    console.log('error', error)
  }
}

async function getProductById(id: number) {
  try {
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
