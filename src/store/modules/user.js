import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      systemToken: '',
      userInfo: {
        username: '',
        password: '',
        remember: false
      }
    }
  },
  getters: {
    getToken() {
      return this.systemToken
    },
    getUserInfo() {
      return this.userInfo
    }
  },
  actions: {
    setToken(value) {
      this.systemToken = value
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    $resetToken() {
      this.systemToken = ''
    },
    $resetUserInfo() {
      this.userInfo = {
        username: '',
        password: '',
        remember: false
      }
    },
    $resetAll() {
      this.$resetToken()
      this.$resetUserInfo()
    }
  },
  persist: {
    storage: localStorage
  }
})
