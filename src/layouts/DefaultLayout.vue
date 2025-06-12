
<template>
    <v-app>
        <v-app-bar>
            <v-row>
                <v-col cols="4">
                    <v-app-bar-title>Application Bar</v-app-bar-title>
                </v-col>
                <v-col cols="6">

                </v-col>
                <v-col cols="2">
                    <v-btn append-icon="mdi-cart"></v-btn>
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