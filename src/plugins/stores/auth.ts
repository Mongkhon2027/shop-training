import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth',()=> {
    const token = ref('');
    const userId = ref<number | string | null>(null);
    const username = ref('')
    function setToken(payload: string) {
      token.value = payload
      localStorage.setItem('token', payload)
    }

    function setUserId(id:number) {
      console.log('setup', id);
      
      userId.value = id
      
      localStorage.setItem('userId', String(id))
    }

    function setUserName(name: string){
      username.value = name
      localStorage.setItem('username',name)
    }

    function clearAuth() {
      token.value = ''
      userId.value = null
      username.value = ''
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('username')
    }

    function initializeFromStorage(){
      const storedToken = localStorage.getItem('token')
      const storedUserId = localStorage.getItem('userId')
      const storedUsername = localStorage.getItem('username')

      if (storedToken) token.value = storedToken
      if (storedUserId) userId.value = storedUserId
      if (storedUsername) username.value = storedUsername 
    }

    initializeFromStorage()

    return { token,
             userId,
             username,
             setToken,
             setUserId, 
             setUserName, 
             clearAuth,
             }
})
