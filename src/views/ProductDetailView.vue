<template>
  <v-container>
    <div v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <v-row v-else-if="product">
      <v-col cols="6" class="mt-6" >
        <div class="image-frame">
          <v-img :src="product?.image" alt="Product Image">
          </v-img>
        </div>
      </v-col>
      <v-col cols="6">
          <div class="text-h6 mt-6">
            {{ product?.title }}
          </div>
          <div class="text-h6">
            ราคา : {{ product?.price }} บาท
          </div>
          <v-btn class="mt-5 mb-5" prepend-icon="mdi-cart" @click="handleAddtoCart" :loading="addingToCart" color="primary">เพิ่มเข้าตะกร้า</v-btn>
          <v-alert v-if="showSuccessAlert" type="success" closable @click:close="showSuccessAlert = false">
            เพิ่มสินค้าเข้าตะกร้าเรียบร้อยแล้ว!
          </v-alert>
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
    import { useCartStore } from '@/plugins/stores/cart'
    import productApi from '@/Services/api/features/product'
    import { type Product } from '@/models/product'
    
    const cartStore = useCartStore()
    const product = ref<Product | null>(null)
    const loading = ref(true)
    const addingToCart = ref(false)
    const showSuccessAlert = ref(false)
    const route = useRoute()

    async function handleAddtoCart() {
      if(product.value) {
        addingToCart.value = true
        try {
          await cartStore.addToCart(product.value.id)
          showSuccessAlert.value = true

          setTimeout(() => {
            showSuccessAlert.value = false
          }, 3000)
        } catch (error) {
          console.error('Error adding to cart:', error);
        } finally {
          addingToCart.value = false
        }
      }
    }

    async function getProductById(id: number) {
      try {
        loading.value = true;
        const response = await productApi.getById<Product>(id)
        product.value = response
      } catch (error) {
        console.log('error', error)
        product.value = null
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      const id = Number(route.params.id)
      if (!isNaN(id)) {
        getProductById(id)
      } else {
        loading.value = false
      }
    })
</script>
    
<style scoped lang="scss">
  .image-frame {
    width: 400px;
    height: 400px;
    overflow: hidden;
    border-radius: 8px;
  }

  .image-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
</style>