<template>
  <v-container>
    <v-row>
      <v-col cols="6" >
          <v-img :src="product?.image" alt="Product Image" width="75%" height="75%">
          </v-img>
      </v-col>
      <v-col cols="6">
          <div class="text-h6">
            {{ product?.title }}
          </div>
          <div class="text-h6">
            ราคา : {{ product?.price }} บาท
          </div>
          <br>
          <v-btn prepend-icon="mdi-cart">เพิ่มเข้าตะกร้า</v-btn>
          <br>
          <br>
          <div>
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