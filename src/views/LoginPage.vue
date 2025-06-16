<template>
  <!-- login -->
  <v-row justify="center" class="align-center" style="height: 100vh;">
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
            <v-btn text="Login" @click="login"></v-btn>
          </p>
          <p v-if="error" style="color: red;">{{ error }}</p>
        </div>
      </v-card>
    </v-cols>

  </v-row>
</template>

<script setup lang="ts">

import auth from '@/Services/api/features/auth'
import { useAuthStore } from '@/plugins/stores/auth'
import router from '@/plugins/router'
import { ref } from 'vue'
import {jwtDecode} from 'jwt-decode'

const username = ref('')
const password = ref('')
const error = ref('')
const authStore = useAuthStore()

const login = async () => {
  try {
    const data = await auth.login<{ username: string; password: string }, { token: string, id: number }>({
      username: username.value,
      password: password.value      
    })

    if (!data?.token) throw new Error('Invalid credentials')
    
    const sub = jwtDecode(data.token).sub

    authStore.setToken(data.token)
    authStore.setUserId(sub)
    authStore.setUserName(username.value)
    
    
    router.push({ name: 'Home' })
  } catch (err) {
    error.value = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
  }
}
</script>
 
<style scoped></style>
