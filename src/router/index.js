import {createWebHashHistory, createRouter} from 'vue-router';

import BasicRoutes from '@/router/modules/basic';


const router = createRouter({
    history: createWebHashHistory(),
    routes: BasicRoutes
});

router.beforeEach((to, from, next) => {
    next()
})


export default router;
