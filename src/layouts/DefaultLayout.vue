
<template>
    <v-app>
        <v-app-bar>
            <v-row class="align-center">
                <v-col cols="10">
                    <div @click="goToHomePage" role="button" class="d-flex align-center ml-4">
                        <img src="../assets/monkey-shop.png" 
                            width="32" 
                            height="32">
                        <v-app-bar-title class="ml-1">Monkey Shop</v-app-bar-title>
                    </div>
                </v-col>
                <v-col cols="1"  class="d-flex justify-end">
                    <v-btn @click="goToCartPage" icon class="mr-2">
                        <v-badge :content="totalItems" color="red" overlap>
                            <v-icon>mdi-cart</v-icon>
                        </v-badge>
                    </v-btn>
                </v-col>
                <v-col cols="1">
                    <v-menu>
                        <template v-slot:activator="{ props }">
                            <v-btn icon v-bind="props">
                                <v-avatar size="32">
                                    {{ userDisplayName.charAt(0) }}
                                </v-avatar>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item>
                                    <v-list-item-title>
                                        {{ userDisplayName.charAt(0).toUpperCase() + userDisplayName.slice(1) }}
                                    </v-list-item-title>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item @click="logout">
                                <template v-slot:prepend>
                                    <v-icon>mdi-logout</v-icon>
                                </template>
                                <v-list-item-title>ออกจากระบบ</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
        </v-app-bar>
        <v-main>
            <router-view />
        </v-main>  
        <v-footer color="purple">Footer</v-footer>
    </v-app>
</template>

<script setup lang="ts">
import router from '@/plugins/router';
import { useCartStore } from '@/plugins/stores/cart'
import { useAuthStore } from '@/plugins/stores/auth';
import { storeToRefs } from 'pinia';


const cartStore = useCartStore()
const authStore = useAuthStore()
const { cart } = storeToRefs(cartStore)

const totalItems = computed(()=>
    cart.value? cart.value.products.reduce((sum, item) => sum + item.quantity,0 ) : 0
)

const userDisplayName = computed(() => authStore.DisplayName)

    function goToHomePage() {
        console.log("HomePage");
        router.push('/default/home')
    }

    function goToCartPage(){
        console.log("CartPage");
        router.push("/default/cart")
    }

    function logout() {
        //Clear user data
        authStore.clearAuth()
        // Redirect to login page
        router.push('/login')
    }

onMounted(() => {
    cartStore.fetchCartFromAuthUser()
})
</script>

<style lang="scss" scoped>

</style>