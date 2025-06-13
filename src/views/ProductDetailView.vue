<template>
  <v-container>
    <v-row>
      <v-col cols="6" class="mt-6" >
          <v-img :src="product?.image" alt="Product Image" width="75%" height="75%">
          </v-img>
      </v-col>
      <v-col cols="6">
          <div class="text-h6 mt-6">
            {{ product?.title }}
          </div>
          <div class="text-h6">
            ราคา : {{ product?.price }} บาท
          </div>
          <v-btn class="mt-5 mb-5" prepend-icon="mdi-cart">เพิ่มเข้าตะกร้า</v-btn>
          <div class="mt-4">
            รายละเอียด :
            <p>
              {{ product?.description }}
            </p>
          </div>
      </v-col>
    </v-row>
  </v-container>
    
</template>

<script setup lang="ts">
    import productApi from '@/Services/api/features/product'
    import { onMounted , ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { type Product } from '@/models/product'
    
    const product = ref<Product | null>(null)
    const route = useRoute()

    async function getProductById(id: number) {
    try {
      const response = await productApi.getById<Product>(id)
      product.value = response
    } catch (error) {
      console.log('error', error)
    }
  }
  onMounted(() => {
    const id = Number(route.params.id)
    if (!isNaN(id)) getProductById(id)
  })
</script>
    
<style scoped>

</style>