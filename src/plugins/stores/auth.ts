import { defineStore } from 'pinia'
import { type User } from '@/models/user'

export const useAuthStore = defineStore('auth',()=> {
    const token = ref('');
    const userId = ref<number | string | null>(null);
    const username = ref('');
    const user = ref<User | null>(null);
    
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

    function setUser(userData: User){
      user.value = userData
      localStorage.setItem('user', JSON.stringify(userData))
    }

    function clearAuth() {
      token.value = ''
      userId.value = null
      username.value = ''
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('username')
      localStorage.removeItem('user')
    }

    function initializeFromStorage(){
      const storedToken = localStorage.getItem('token')
      const storedUserId = localStorage.getItem('userId')
      const storedUsername = localStorage.getItem('username')
      const storedUser = localStorage.getItem('user')

      if (storedToken) token.value = storedToken
      if (storedUserId) userId.value = storedUserId
      if (storedUsername) username.value = storedUsername 
      if (storedUser) user.value = JSON.parse(storedUser) 
    }
  
    const DisplayName = computed(() =>{
      if(user.value?.name?.firstname){
        return `${user.value.name.firstname} ${user.value.name.lastname}`
      }
      if(username.value) {
        return username.value
      }
      return `ผู้ใช้ #${userId.value}`
    })

    initializeFromStorage()

    return { token,
             userId,
             username,
             user,
             DisplayName,
             setToken,
             setUserId, 
             setUserName,
             setUser, 
             clearAuth,
             }
})
