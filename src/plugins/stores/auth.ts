import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth',()=> {
    const token = ref('');
    const userId = ref<number | null>(null);
    function setToken(payload: string) {
      token.value = payload
      localStorage.setItem('token', payload)
    }
    function setUserId(id:number) {
      console.log('setup', id);
      
      userId.value = id
      
      localStorage.setItem('userId', String(id))
    }
    return { token, setToken, setUserId}
})
