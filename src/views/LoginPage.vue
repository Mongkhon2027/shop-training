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
            <v-btn text="Login" @click="login" :loading="isLoading"></v-btn>
          </p>
          <p v-if="error" style="color: red;">{{ error }}</p>
        </div>
      </v-card>
    </v-cols>

  </v-row>
</template>

<script setup lang="ts">

import auth from '@/Services/api/features/auth'
import userApi from '@/Services/api/features/user'
import { useAuthStore } from '@/plugins/stores/auth'
import router from '@/plugins/router'
import { ref } from 'vue'
import {jwtDecode} from 'jwt-decode'
import { type User } from '@/models/user'

const username = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)
const authStore = useAuthStore()

const login = async () => {
  try {
    isLoading.value = true
    error.value = ''

    const data = await auth.login<{ username: string; password: string }, { token: string, id: number }>({
      username: username.value,
      password: password.value      
    })

    if (!data?.token) throw new Error('Invalid credentials')
    const decoded = jwtDecode(data.token)
    const userId = decoded.sub

    // เก็บ token และ userId
    authStore.setToken(data.token)
    authStore.setUserId(Number(userId))
    authStore.setUserName(username.value)
    
    try {
      const userData = await userApi.getById<User>(userId!)
      authStore.setUser(userData)
    } catch (userError) {
      console.warn('Could not fetch user data:',userError);
    }
    
    router.push({ name: 'Home' })
  } catch (err) {
    console.error('Login error:',err);
    error.value = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
  } finally {
    isLoading.value = false
  }
}
</script>
 
<style scoped></style>
