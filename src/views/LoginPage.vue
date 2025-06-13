<template>
  <!-- login -->
  <v-row justify="center" align="center" style="height: 100vh;">
    <v-cols cols="12" md="4" offset-md="4" cols-sm="6" offset-sm="3" class="text-center centered">
      <v-card width="400px" padding="300px" height="250px">
        <div class="login-page">
          <h1>Login Page</h1>
          <p style="padding: 10px;">
            <input class="username" type="text" placeholder="Username" v-model="username"
              style="width: 300px; padding: 15px; height: 40px; border: 2px solid black;" />
          </p>
          <p style="padding: 10px;">
            <input class="password" type="password" placeholder="Password" v-model="password"
              style="width: 300px; padding: 15px; height: 40px; border: 2px solid black;" />
          </p>
          <p style="padding: 20px; ">
            <!-- <button class="login-button"
          style="padding: 10px; font-size: 20px;
          background-color: aqua;"
          @click="Auth"
          >Login</button> -->
            <v-btn text="Login" @click="router.push({ name: 'Home' })"></v-btn>
            <!-- <v-btn text="Login" @click="login"></v-btn> -->
          </p>
        </div>
      </v-card>
    </v-cols>

  </v-row>
</template>

<script setup lang="ts">

import router from '@/plugins/router';
import { ref } from 'vue';
// import login from '@/Services/api/features/auth'

const username = ref('')
const password = ref('')
// Login Authen
// async function login () {
//   try{

//   }
// }

</script>

<style scoped></style>
