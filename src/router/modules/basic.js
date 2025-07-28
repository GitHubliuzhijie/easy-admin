export default [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
    },
    {
        name: '404',
        path: '/404',
        component: () => import('@/views/not-found/index.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
    },
];
