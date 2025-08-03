import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => {
    return {
      darkMode: false
    }
  },
  getters: {
    getDarkMode: (state) => state.darkMode
  },
  actions: {
    setDarkMode(isDark) {
      this.darkMode = isDark
    }
  },
  persist: {
    omit: ['menuList', 'secondaryMenuList']
  }
})
