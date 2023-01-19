import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import SettingsView from '../views/Settings.vue';

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
        component: () => import(/* webpackChunkName: "ProductSearch" */ '../views/ProductSearch.vue'),
        meta: {
            title: 'Product Search',
        },
    },
    {
        path: '/product',
        name: 'product',
        component: () => import(/* webpackChunkName: "ProductDetails" */ '../views/ProductDetails.vue'),
        meta: {
            title: 'Product recommendations',
        },
    },
    {
        path: '/popular-brands',
        name: 'popular-brands',
        component: () => import(/* webpackChunkName: "PopularBrands" */ '../views/PopularBrands.vue'),
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
    {
        path: '/search-term-based',
        name: 'search-term-based',
        component: () => import(/* webpackChunkName: "SearchTermBased" */ '../views/SearchTermBased.vue'),
        meta: {
            title: 'Search Term Based',
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
