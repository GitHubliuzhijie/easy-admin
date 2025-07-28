<script setup>
import {storeToRefs} from 'pinia'
import {useLayoutStore} from "@/store/modules/layout.js";

const title = import.meta.env.VITE_BASE_TITLE

const layoutStore = useLayoutStore()
const {darkMode} = storeToRefs(layoutStore)

const loginForm = reactive({
  username: 'admin',
  password: '123456'
})
const loginRules = {
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
  ]
}

</script>

<template>
  <main class="login-background">
    <aside class="login-img"></aside>
    <section class="login-content" role="main">
      <div class="login-content-header">
        <span class="login-content-header-title">{{ title }}</span>
        <el-switch v-model="darkMode">
          <template #active-action>
            <el-icon>
              <i-ep:sunny/>
            </el-icon>
          </template>
          <template #inactive-action>
            <el-icon>
              <i-ep:moon-night/>
            </el-icon>
          </template>
        </el-switch>
      </div>
      <div class="login-content-form">
        <el-card shadow="always">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="80px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.login-background {
  height: 100vh;
  width: 100vw;
  overflow: auto;
  display: flex;

  .login-img {
    display: none;
    background: url('@/assets/imgs/login-bg.svg') no-repeat center;
    flex-grow: 1;
  }

  .login-content {
    width: 100%;
    display: flex;
    flex-direction: column;

    .login-content-header {
      padding: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .login-content-header-title {
        //color: #ffffff;
        font-size: 1.5rem;
        font-weight: 700;
      }
    }

    .login-content-form {
      display: flex;
      flex-grow: 1;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
  }
}

@media (min-width: 1280px) {
  #app .login-img {
    display: block;
  }
  #app .login-content {
    width: 50%;
  }
}
</style>