<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { Menu as AMenu, Space as ASpace } from 'ant-design-vue';
import { isEqual, head } from 'lodash-es';
import { useLayoutStore } from '@src/store/modules/layout';
import MainMenuItem from '@src/layout/main/main-menu-item.vue';
import { findTreePathBFS } from '@src/utils/tree';
import VIcon from '@src/components/icon/icon.vue';
import projectConfig from '@src/config';
import TabsController from './tabs.vue';
import HeaderAvatar from './avatar.vue';
import HeaderBreadcrumb from './breadcrumb.vue';
import HeaderSetting from './setting.vue';
import ContentFullscreenBtn from './content-fullscreen-btn.vue';

const layoutStore = useLayoutStore();
const router = useRouter();

const menuStyle = computed(() => {
  let menuWidth = 0;
  if (layoutStore.secondaryMenuList.length > 0) {
    menuWidth += layoutStore.menuCollapsed ? 51 : 241;
  }
  if (layoutStore.hasMainMenu) {
    menuWidth += 60;
  }
  if (layoutStore.isContentFullscreen) {
    menuWidth = 0;
  }
  return {
    width: `${menuWidth}px`,
    opacity: layoutStore.isContentFullscreen ? 0 : 1,
  };
});

const contentHeaderStyle = computed(() => {
  return {
    height: layoutStore.isContentFullscreen ? '0px' : '60px',
    borderBottom: layoutStore.isContentFullscreen ? 'none' : 'var(--easy-border)',
    opacity: layoutStore.isContentFullscreen ? 0 : 1,
  };
});

function mainMenuClickHandler(menu) {
  if (menu.key === layoutStore.menuActiveKey) {
    return;
  }
  if (menu.path) {
    router.push(menu.path);
  }
  if (menu?.meta?.outlink) {
    window.open(menu?.meta?.outlink, '_blank');
    return;
  }
  layoutStore.setMenuActiveKey(menu.key);
}

function tabsChangeHandler(val) {
  if (val === layoutStore.activeTabKey) {
    return;
  }
  layoutStore.setActiveTabKey(val);
}

function tabsSelectHandler(tab) {
  const { menu } = tab;
  if (!menu) return;
  router.push(menu.path);
}

function updateOpenKeys() {
  const activeKey = layoutStore.activeTabKey;
  const result = findTreePathBFS(layoutStore.menuList, (node) => {
    return node.key === activeKey;
  });
  if (!result) return;
  const path = result.path;
  if (path.length === 0) return;
  const node = result.node;
  const root = head(path);
  let openkeys = path.map((node) => node.key);
  openkeys = new Set([...openkeys]);
  if (layoutStore.menuCollapsed) {
    layoutStore.setSecondaryMenuOpenKeys([]);
  } else {
    layoutStore.setSecondaryMenuOpenKeys(Array.from(openkeys));
  }
  layoutStore.setMenuActiveKey(root.key);
  layoutStore.setSecondaryMenuActiveKey([node.key]);
}

async function secondaryMenuSelectHandler({ item, keyPath }) {
  if (item?.meta?.outlink) {
    window.open(item?.meta?.outlink, '_blank');
    return;
  }
  if (isEqual(keyPath, layoutStore.secondaryMenuActiveKey)) {
    return;
  }
  router.push(item.path);
}

function toggleMenuCollapsedHandler() {
  layoutStore.toggleMenuCollapsed();
  updateOpenKeys();
}

function onTransitionStart(event) {
  const classList = event.target.classList;
  if (
    (event.propertyName === 'width' || event.propertyName === 'height') &&
    (classList.contains('main-menu') ||
      classList.contains('secondary-menu') ||
      classList.contains('content-header'))
  ) {
    event.target.style.overflow = 'hidden';
  }
}

function onTransitionEnd(event) {
  const classList = event.target.classList;
  if (
    (event.propertyName === 'width' || event.propertyName === 'height') &&
    (classList.contains('main-menu') ||
      classList.contains('secondary-menu') ||
      classList.contains('content-header'))
  ) {
    event.target.style.overflow = 'auto';
  }
}

window.addEventListener('resize', () => {
  // 如果窗口宽度小于 1200px, 则收起菜单
  if (window.innerWidth < 1200) {
    layoutStore.menuCollapsed = true;
  }
});
</script>

<template>
  <div class="layout" @transitionstart="onTransitionStart" @transitionend="onTransitionEnd">
    <div class="menu" :style="menuStyle">
      <transition name="main-menu">
        <div v-if="layoutStore.hasMainMenu" class="main-menu">
          <div class="main-menu-logo">
            <!--    log        -->
            <svg
              t="1760167656323"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4740"
              width="48"
              height="48"
            >
              <path
                d="M512 1013.76c-17.408 0-34.816-4.096-50.176-12.8l-358.4-200.704C71.168 781.824 51.2 747.52 51.2 710.656V313.344c0-36.864 19.968-71.168 52.224-89.088l358.4-200.704c30.72-17.408 69.12-17.408 99.84 0l358.4 200.704C952.832 242.176 972.8 276.48 972.8 313.344v397.824c0 36.864-19.968 71.168-52.224 89.088l-358.4 200.704c-15.36 8.704-32.768 12.8-50.176 12.8z m0-956.416c-9.216 0-18.432 2.56-27.136 7.168l-358.4 200.704c-17.408 9.728-28.16 28.16-28.16 48.128v397.824c0 19.968 10.752 38.4 28.16 48.128l358.4 200.704c16.384 9.216 37.376 9.216 53.76 0l358.4-200.704c17.408-9.728 28.16-28.16 28.16-48.128V313.344c0-19.968-10.752-38.4-28.16-48.128l-358.4-200.704c-8.192-4.608-17.408-7.168-26.624-7.168z"
                fill="#333333"
                p-id="4741"
              ></path>
              <path
                d="M824.832 700.416l-301.568 168.96c-7.168 4.096-15.872 4.096-22.528 0l-301.568-168.96c-7.168-4.096-11.776-11.776-11.776-19.968V343.552c0-8.192 4.608-15.872 11.776-19.968l301.568-168.96c7.168-4.096 15.872-4.096 22.528 0l301.568 168.96c7.168 4.096 11.776 11.776 11.776 19.968v336.896c0 8.192-4.608 15.872-11.776 19.968z"
                fill="#D7D7FF"
                p-id="4742"
              ></path>
              <path
                d="M723.968 644.096l-200.704 112.128c-7.168 4.096-15.872 4.096-22.528 0l-200.704-112.128c-7.168-4.096-11.776-11.776-11.776-19.968V400.384c0-8.192 4.608-15.872 11.776-19.968l200.704-112.128c7.168-4.096 15.872-4.096 22.528 0l200.704 112.128c7.168 4.096 11.776 11.776 11.776 19.968v223.744c0 8.192-4.608 15.872-11.776 19.968z"
                fill="#9C9CFF"
                p-id="4743"
              ></path>
              <path
                d="M620.032 580.096l-101.888 56.832c-4.096 2.048-8.704 2.048-12.8 0l-101.888-56.832c-4.096-2.56-6.656-6.656-6.656-11.776V455.168c0-4.608 2.56-9.216 6.656-11.776l101.888-56.832c4.096-2.048 8.704-2.048 12.8 0l101.888 56.832c4.096 2.56 6.656 6.656 6.656 11.776V568.32c0 5.12-2.56 9.728-6.656 11.776z"
                fill="#6462F3"
                p-id="4744"
              ></path>
              <path
                d="M512 386.048c-8.704 0-15.36-6.656-15.872-15.36L492.544 215.04c0-8.704 6.656-15.872 15.36-15.872 8.704-1.024 15.872 6.656 15.872 15.36l3.584 155.648c1.024 8.704-6.144 15.872-15.36 15.872 0.512 0 0.512 0 0 0z"
                fill="#333333"
                p-id="4745"
              ></path>
              <path
                d="M471.552 269.824c-4.608 0-9.216-1.536-13.824-4.096-10.752-7.68-13.312-22.016-5.632-32.768L489.984 179.2c7.68-10.752 22.016-13.312 32.768-5.632 10.752 7.68 13.312 22.016 5.632 32.768l-37.888 53.76c-4.096 6.144-11.264 9.728-18.944 9.728z"
                fill="#333333"
                p-id="4746"
              ></path>
              <path
                d="M546.304 271.36c-7.68 0-15.36-3.584-19.456-10.752l-36.864-55.296c-7.168-10.752-4.096-25.6 6.656-32.768 10.752-7.168 25.6-4.096 32.768 6.656l36.864 55.296c7.168 10.752 4.096 25.6-6.656 32.768-4.096 2.56-8.704 4.096-13.312 4.096z"
                fill="#333333"
                p-id="4747"
              ></path>
              <path
                d="M785.408 667.136c-2.56 0-5.12-0.512-7.68-2.048l-135.168-76.8c-7.68-4.096-10.24-13.824-6.144-21.504s13.824-10.24 21.504-6.144l135.168 76.8c7.68 4.096 10.24 13.824 6.144 21.504-2.56 5.632-8.192 8.192-13.824 8.192z"
                fill="#333333"
                p-id="4748"
              ></path>
              <path
                d="M804.352 687.616c-9.216 0-17.92-5.12-21.504-13.824l-26.624-59.904c-5.12-11.776 0-26.112 12.288-31.232 11.776-5.12 26.112 0 31.232 12.288l26.624 59.904c5.12 11.776 0 26.112-12.288 31.232-3.072 1.024-6.144 1.536-9.728 1.536z"
                fill="#333333"
                p-id="4749"
              ></path>
              <path
                d="M738.304 690.688c-12.288 0-23.04-9.728-23.552-22.528-0.512-12.8 9.216-24.064 22.528-24.576l66.048-3.072c13.312-0.512 24.064 9.216 24.576 22.528 0.512 12.8-9.216 24.064-22.528 24.576l-66.048 3.072h-1.024z"
                fill="#333333"
                p-id="4750"
              ></path>
              <path
                d="M239.616 675.328c-5.632 0-11.264-3.072-13.824-8.192-4.096-7.68-1.024-17.408 6.144-21.504L368.64 571.904c7.68-4.096 17.408-1.024 21.504 6.144 4.096 7.68 1.024 17.408-6.144 21.504l-136.704 73.728c-2.56 1.536-5.12 2.048-7.68 2.048z"
                fill="#333333"
                p-id="4751"
              ></path>
              <path
                d="M284.16 701.952h-3.584l-65.024-9.216c-12.8-2.048-22.016-13.824-19.968-26.624 2.048-12.8 13.824-22.016 26.624-19.968l65.024 9.216c12.8 2.048 22.016 13.824 19.968 26.624-1.536 11.776-11.776 19.968-23.04 19.968z"
                fill="#333333"
                p-id="4752"
              ></path>
              <path
                d="M219.136 692.736c-4.096 0-7.68-1.024-11.776-3.072-11.264-6.144-15.36-20.992-9.216-32.256l32.256-57.856c6.144-11.264 20.992-15.36 32.256-9.216s15.36 20.992 9.216 32.256l-32.256 57.856c-4.608 7.68-12.288 12.288-20.48 12.288z"
                fill="#333333"
                p-id="4753"
              ></path>
            </svg>
          </div>
          <div class="main-menu-content mini-scroll-white">
            <main-menu-item
              v-for="menu in layoutStore.menuList"
              :key="menu.key"
              :menu="menu"
              :menu-active-key="layoutStore.menuActiveKey"
              @click="mainMenuClickHandler(menu)"
            ></main-menu-item>
          </div>
        </div>
      </transition>
      <div
        v-if="layoutStore.secondaryMenuList.length > 0"
        class="secondary-menu"
        :style="{
          width: layoutStore.menuCollapsed ? '51px' : '240px',
        }"
      >
        <div class="secondary-menu-title">
          <transition name="slide-up">
            <div v-if="!layoutStore.menuCollapsed" class="secondary-menu-title-text">
              {{ projectConfig.projectName }}
            </div>
            <div v-else class="collapsed-btn-container" @click="toggleMenuCollapsedHandler">
              <v-icon name="ant-design-icon-menu-unfold-outlined" size="20px"></v-icon>
            </div>
          </transition>
        </div>
        <div class="secondary-menu-content mini-scroll">
          <a-menu
            mode="inline"
            v-model:open-keys="layoutStore.secondaryMenuOpenKeys"
            :items="layoutStore.secondaryMenuList"
            :inline-collapsed="layoutStore.menuCollapsed"
            :selected-keys="layoutStore.secondaryMenuActiveKey"
            :theme="layoutStore.darkMode ? 'dark' : 'light'"
            @select="secondaryMenuSelectHandler"
          ></a-menu>
        </div>
        <div class="secondary-menu-footer">
          <div class="collapsed-btn-container" @click="toggleMenuCollapsedHandler">
            <v-icon
              :name="
                layoutStore.menuCollapsed
                  ? 'ant-design-icon-menu-unfold-outlined'
                  : 'ant-design-icon-menu-fold-outlined'
              "
              size="20px"
            ></v-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-header" :style="contentHeaderStyle">
        <header-breadcrumb></header-breadcrumb>
        <a-space>
          <header-setting></header-setting>
          <header-avatar></header-avatar>
        </a-space>
      </div>
      <div class="content-tabs">
        <div class="content-tabs-container">
          <tabs-controller
            :active-tab-key="layoutStore.activeTabKey"
            @update:active-tab-key="tabsChangeHandler"
            @select="tabsSelectHandler"
          >
            <template #after-extend>
              <div class="tabs-after-extend">
                <content-fullscreen-btn></content-fullscreen-btn>
              </div>
            </template>
          </tabs-controller>
        </div>
      </div>
      <div class="content-body">
        <router-view v-slot="{ Component }">
          <transition name="scale" mode="out-in">
            <component v-if="layoutStore.renderRouteView" :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  --header-height: 60px;
  display: flex;
  height: 100vh;
  overflow: auto;
  color: var(--easy-color-text);
  background: var(--easy-color-bg-container);
}

.menu {
  display: flex;
  flex: none;
  overflow: hidden;
  border-right: var(--easy-border);
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.main-menu {
  display: flex;
  flex-direction: column;
  flex: none;
  background: #141414;
  border-right: var(--easy-border);
}

.main-menu-logo {
  flex: none;
  display: flex;
  width: 100%;
  height: var(--header-height);
  align-items: center;
  justify-content: center;
}

.main-menu-content {
  flex: 1;
  padding-top: 8px;
}

.secondary-menu {
  flex: none;
  display: flex;
  flex-direction: column;
  width: 240px;
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.secondary-menu-title {
  flex: none;
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  border-bottom: var(--easy-border);
  overflow: hidden;
}

.secondary-menu-title-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.collapsed-btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.collapsed-btn-container:hover {
  background: var(--easy-border-color);
  cursor: pointer;
}

.secondary-menu-content {
  flex: 1;
  overflow: auto;
}

.secondary-menu-content :deep(.ant-menu-inline-collapsed) {
  width: 50px;
}

.secondary-menu-content .ant-menu-light.ant-menu-root.ant-menu-inline,
.secondary-menu-content :deep(.ant-menu-light.ant-menu-root.ant-menu-vertical) {
  border-inline-end: none;
}

.secondary-menu-footer {
  height: var(--header-height);
  border-top: var(--easy-border);
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: var(--header-height);
  border-bottom: var(--easy-border);
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.content-tabs {
  flex: none;
  overflow: auto;
  width: 100%;
  border-bottom: var(--easy-border);
}

.content-tabs-container {
  width: 100%;
  height: 100%;
}

.tabs-after-extend {
  flex: none;
  height: 100%;
  border-left: var(--easy-border);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

.content-body {
  flex: 1;
  overflow: auto;
  background: var(--easy-color-bg-layout);
}

/* 动画 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
  overflow: hidden;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  font-size: 0;
}

/* main-menu 过渡动画 */
.main-menu-enter-from,
.main-menu-leave-to {
  width: 0;
  opacity: 0;
}

.main-menu-enter-active,
.main-menu-leave-active {
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  overflow: hidden;
}

.main-menu-enter-to,
.main-menu-leave-from {
  width: 60px;
  opacity: 1;
}

/* 路由过渡动画 */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>

<style>
.ant-menu-submenu.ant-menu-submenu-popup .ant-menu-item {
  display: flex;
}

.ant-menu-submenu.ant-menu-submenu-popup .ant-menu-title-content {
  flex: 1;
  max-width: 200px;
}
</style>
