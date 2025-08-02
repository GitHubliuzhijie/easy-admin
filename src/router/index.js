import {createWebHashHistory, createRouter} from 'vue-router';

import BasicRoutes from '@/router/modules/basic';
import {useUserStore} from "@/store/modules/user.js";


const router = createRouter({
    history: createWebHashHistory(),
    routes: BasicRoutes
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const token = userStore.getToken;
    if (!token) {
        if (to.path === '/login') {
            next();
        } else {
            next('/login');
        }
    } else {
        next()
    }
})


export default router;
