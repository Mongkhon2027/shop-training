<template>
  <v-container>
    <div v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else-if="!cart || !cart.products || cart.products.length === 0">
      <v-btn to="/default/home" color="primary">
        เลือกซื้อสินค้า
      </v-btn>
    </div>
    <div v-else>
      <h2>ตะกร้าสินค้า {{ cart.products.length }} รายการ</h2>
    </div>
    <v-table>
      <thead>
        <tr>
            <th>รูปภาพ</th>
            <th>ชื่อสินค้า</th>
            <th>ราคา</th>
            <th>จำนวน</th>
            <th>รวม</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in enrichedProducts" :key="item.productId">
          <td>
            <v-img
              :src="item.product?.image"
              width="50"
              height="50"
              class="rounded"
            ></v-img>
          </td>
          <td>
            <div>
              {{ item.product?.title || 'ไม่พบข้อมูลสินค้า' }}
            </div>
            <div>
              หมวดหมู่: {{ item.product?.category }}
            </div>
          </td>
          <td>฿{{ item.product?.price.toFixed(2) || 0.00 }}</td>
          <td>{{ item.quantity }}</td>
          <td>฿{{ ((item.product?.price || 0) * item.quantity).toFixed(2) }}</td>
        </tr>
      </tbody>
    </v-table>
    <v-divider></v-divider>

    <div class="d-flex justify-end">
      <div class="text-h6">
        ยอดรวมทั้งหมด ฿{{ totalPrice.toFixed(2) }}
      </div>
    </div>
    <div class="d-flex justify-end mt-4 ga-2">
      <v-btn variant="outlined" @click="clearCartHandler">
        ล้างตะกร้า
      </v-btn>
      <v-btn color="primary">
        สั่งซือ
      </v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  import { useEnrichedCart } from '@/composables/useEnrichedCart';
  import { useCartStore } from '@/plugins/stores/cart';

  const { cart, enrichedProducts , loading } = useEnrichedCart()
  const cartStore = useCartStore()

  const totalPrice = computed(() => {
    return enrichedProducts.value.reduce((total, item) =>{
      return total + ((item.product?.price || 0) * item.quantity)
    },0)
  })

  function clearCartHandler() {
    cartStore.clearCart()
  }
</script>

<style scoped>
  .v-table th{
    font-weight: 600;
  }
</style>