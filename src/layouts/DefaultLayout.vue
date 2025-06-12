
<template>
    <v-app>
        <v-app-bar>
            <v-row class="align-center">
                <v-col cols="11">
                    <div class="d-flex align-center ml-4">
                        <img src="../assets/monkey-shop.png" 
                            width="32" 
                            height="32">
                        <v-app-bar-title class="ml-1">Monkey Shop</v-app-bar-title>
                    </div>
                </v-col>
                <v-col cols="1">
                    <v-btn icon>
                        <v-icon>mdi-cart</v-icon>
                    </v-btn>
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
</script>

<style lang="scss" scoped>

</style>