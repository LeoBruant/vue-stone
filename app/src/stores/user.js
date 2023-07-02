import { defineStore } from 'pinia'

export const useUserStore = defineStore('main', {
  state: () => ({
    id: null,
    name: null
  })
})
