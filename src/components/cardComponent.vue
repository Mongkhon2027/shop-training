<template>
  <v-container>
    <v-row>
      <v-col v-for="(product, products) in products || []" :key="product.id" cols="12" sm="4">
        <v-card>
          <v-img :src="product?.image" class="mx-auto fixed-img" width="120" height="120" contain aspect-ratio="1"></v-img>
          <v-card-title>
            {{ product.title }}
          </v-card-title>
          <v-card-item>
            <p class="description-fixed">Description: {{ product.description }}</p>
          </v-card-item>
          <v-card-item>
            <p>Category: {{ product.category }}</p>
            <p>Price: {{ product.rating.rate }}</p>
            <p>Count: {{ product.rating.count }}</p>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { type Product } from '@/models/product'

const props = defineProps<{
  products: Product[] | null
}>()
</script>

<style scoped>
.description-fixed {
  height: 60px;
  overflow-y: auto;
  overflow-x: hidden;
  display: block;
}
</style>
