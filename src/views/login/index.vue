<script setup>
import {storeToRefs} from 'pinia'
import {useLayoutStore} from "@/store/modules/layout.js";
import {toggleTheme} from "@/utils/theme.js";

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

function onLogin() {
  console.log(loginForm)
}

function onSwitchContainerClick(event) {
  toggleTheme(event)
}
</script>

<template>
  <main class="login-background">
    <aside class="login-img"></aside>
    <section class="login-content" role="main">
      <div class="login-content-header" @click="onSwitchContainerClick">
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
        <el-card shadow="always" class="card-content">
          <div class="card-content-title">{{ title }}</div>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="auto">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="请输入用户名">
                <template #prefix>
                  <el-icon>
                    <i-ep:user/>
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" placeholder="请输入密码" show-password>
                <template #prefix>
                  <el-icon>
                    <i-ep:lock/>
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>

            </el-form-item>
          </el-form>
          <el-row justify="space-evenly">
            <el-col :span="6">
              <el-button type="primary" @click="onLogin">登录</el-button>
            </el-col>
          </el-row>
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
      justify-content: flex-end;
    }

    .login-content-form {
      display: flex;
      flex-grow: 1;
      align-items: center;
      justify-content: center;

      .card-content {
        width: 65%;

        .card-content-title {
          //color: #ffffff;
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          margin: 2rem;
        }
      }
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
  //.login-background {
  //  .login-img {
  //    display: block;
  //    min-width: 400px;
  //    max-width: 600px;
  //    height: 600px;
  //  }
  //  .login-content {
  //    width: 50%;
  //    max-width: 500px;
  //  }
  //}
}

</style>