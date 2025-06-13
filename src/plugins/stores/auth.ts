import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || ''
  }),
  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },
  }
})
