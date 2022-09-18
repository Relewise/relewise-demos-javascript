import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import SettingsView from '../views/SettingsView.vue';

function setTitle(name: string) {
    window.document.title = `${name} | Relewise`;
}

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'settings',
        component: SettingsView,
        meta: {
            title: 'Settings',
        },
    },
    {
        path: '/search',
        name: 'search',
        component: () => import(/* webpackChunkName: "SearchView" */ '../views/SearchView.vue'),
        meta: {
            title: 'Product Search',
        },
    },
    {
        path: '/product',
        name: 'product',
        component: () => import(/* webpackChunkName: "ProductDetailsView" */ '../views/ProductDetailsView.vue'),
        meta: {
            title: 'Product recommendations',
        },
    },
    {
        path: '/popular-brands',
        name: 'popular-brands',
        component: () => import(/* webpackChunkName: "ProductDetailsView" */ '../views/PopularBrands.vue'),
        meta: {
            title: 'Popular Brands',
        },
    },
    {
        path: '/popular-products',
        name: 'popular-products',
        component: () => import(/* webpackChunkName: "PopularProducts" */ '../views/PopularProducts.vue'),
        meta: {
            title: 'Popular products',
        },
    },
    {
        path: '/popular-categories',
        name: 'popular-categories',
        component: () => import(/* webpackChunkName: "PopularProducts" */ '../views/PopularCategories.vue'),
        meta: {
            title: 'Popular categories',
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    
});

router.beforeEach((guard: any) => {
    setTitle(guard?.meta?.title ?? '');
});

export default router;
