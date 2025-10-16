<script setup>
/// <reference path="../../types/menu.js" />
import { useRouter } from 'vue-router';
import {
  Switch as ASwitch,
  Form as AForm,
  FormItem as AFormItem,
  Input as AInput,
  InputPassword as AInputPassword,
  Button as AButton,
} from 'ant-design-vue';
import { useLayoutStore } from '@src/store/modules/layout';
import { useUserStore } from '@src/store/modules/user';
import { getMenu } from '@src/api/menu';
import { mergeNewConfigToMenuConfig } from '@src/utils/config';
import { addRoutes } from '@src/router/dynamic-routes';
import projectConfig from '@src/config';
import { toggleDarkMode } from '@src/utils/theme';

const layoutStore = useLayoutStore();
const userStore = useUserStore();
const router = useRouter();

function onDarkModeChange(e) {
  toggleDarkMode(e);
}

async function onLogin() {
  const res = await getMenu();
  const config = mergeNewConfigToMenuConfig(res);
  layoutStore.generateMenuList(config);
  addRoutes(config);

  userStore.setToken('ok');

  await router.push(projectConfig.homeRoutePath);
}
</script>

<template>
  <div class="h-screen w-screen overflow-auto flex text-[var(--easy-color-text)]">
    <div
      class="xl:flex-1 xl:overflow-hidden xl:relative"
      :style="{
        background: layoutStore.darkMode
          ? '#141414'
          : 'linear-gradient(to right, #458cfb, #f2f6fe)',
      }"
    >
      <div class="w-full h-full bg-[#f0f2f5] dark:bg-[#141414]">
        <div
          class="w-full h-full"
          :style="{
            background: 'linear-gradient(154deg, #07070915 30%, color-mix(in srgb, var(--easy-primary-color) 30%, transparent) 48%, #07070915 64%)',
            filter: 'blur(100px)'
          }"
        ></div>
        <div
          class="absolute w-full h-full left-0 top-0 bg-[url('@src/assets/imgs/login-bg.svg')] bg-[50%] bg-no-repeat"
          style="background-size: 50%;"
        ></div>
      </div>
    </div>
    <div
      class="w-full xl:w-[34%] flex flex-col bg-[var(--easy-color-bg-container)] xl:border-l"
      :class="{'dark:bg-[#141414]': layoutStore.darkMode}"
      :style="{borderLeft: 'var(--easy-border)'}"
    >
      <div class="p-6 flex-none flex items-center justify-between">
        <span class="text-[var(--easy-color-text)] text-2xl font-bold"> {{ projectConfig.projectName }} </span>
        <a-switch
          checked-children="深色"
          un-checked-children="浅色"
          :checked="layoutStore.darkMode"
          @change="(_, e) => onDarkModeChange(e)"
        />
      </div>
      <div class="flex-grow flex items-center justify-center p-6">
        <div
          class="w-full max-w-[360px] rounded-lg p-6"
          :class="{'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] bg-[#ffffffaa]': !layoutStore.darkMode}"
        >
          <div class="text-2xl leading-8">登录</div>
          <div class="pt-4">
            <a-form ref="formRef">
              <a-form-item name="username">
                <a-input placeholder="账号"></a-input>
              </a-form-item>
              <a-form-item name="password">
                <a-input-password placeholder="密码"></a-input-password>
              </a-form-item>
              <a-form-item>
                <a-button
                  class="w-full"
                  type="primary"
                  html-type="submit"
                  @click="onLogin"
                >
                  <span>登录</span>
                </a-button>
              </a-form-item>
            </a-form>
          </div>
        </div>
      </div>
      <div class="flex-none p-6 text-center text-sm text-[#66748b]">MIT Licensed | Copyright © 2024</div>
    </div>
  </div>
</template>
