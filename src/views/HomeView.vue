<template>
  <div v-if="loading" class="d-flex justify-center align-center" style="height: 300px;">
    <v-progress-circular indeterminate color="primary" />
  </div>
  <div v-else>
    <card-component :items="products">
      <template #default="{ item }">
        <v-card @click="router.push({ name: 'ProductPage'})">
          <v-img :src="item.image" width="120" height="120" contain aspect-ratio="1" class="mx-auto" />
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-text>
            <div class="description-scroll">Description: {{ item.description }}</div>
            <div>Category: {{ item.category }}</div>
            <div>Price: {{ item.price }}</div>
            <div>Count: {{ item.rating.count }}</div>
          </v-card-text>
        </v-card>
      </template>
    </card-component>
  </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { type Product } from '@/models/product';
import productApi from '@/Services/api/features/product'
import cardComponent from '@/components/cardComponent.vue'
import router from '@/plugins/router';

const product = ref<Product | null>(null)
const products = ref<Product[] | null>(null)
const loading = ref(true)

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

onMounted(async () => {
  loading.value = true
  getAllProduct()
  getProductById(2)
  loading.value = false
})
</script>

<style scoped>
.description-scroll {
  max-height: 40px;
  overflow-y: auto;
  overflow-x: hidden;
  white-space: pre-line;
}
</style>
