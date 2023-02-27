import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import SettingsView from '../views/Settings.vue';

function setTitle(name: string) {
    window.document.title = `${name} | Relewise`;
}

const routes: Array<RouteRecordRaw> = [
    {
        path: '/search',
        name: 'search',
        component: () => import(/* webpackChunkName: "ProductSearch" */ '../views/ProductSearch.vue'),
        meta: {
            title: 'Product Search',
            navigationGroup: 'Search',
        },
    },
    {
        path: '/category',
        name: 'products-in-category',
        component: () => import(/* webpackChunkName: "ProductsInCategorySearch" */ '../views/ProductsInCategorySearch.vue'),
        meta: {
            title: 'Products In Category',
            navigationGroup: 'Search',
        },
    },
    {
        path: '/product',
        name: 'product',
        component: () => import(/* webpackChunkName: "ProductDetails" */ '../views/ProductDetails.vue'),
        meta: {
            title: 'Purchased With & Viewed After (PDP)',
            navigationGroup: 'Product Recommendations',
        },
    },
    {
        path: '/popular-brands',
        name: 'popular-brands',
        component: () => import(/* webpackChunkName: "PopularBrands" */ '../views/PopularBrands.vue'),
        meta: {
            title: 'Popular Brands',
            navigationGroup: 'Brand Recommendations',
        },
    },
    {
        path: '/popular-products',
        name: 'popular-products',
        component: () => import(/* webpackChunkName: "PopularProducts" */ '../views/PopularProducts.vue'),
        meta: {
            title: 'Popular Products',
            navigationGroup: 'Product Recommendations',
        },
    },
    {
        path: '/personal-products',
        name: 'personal-products',
        component: () => import(/* webpackChunkName: "PersonalProducts" */ '../views/PersonalProducts.vue'),
        meta: {
            title: 'Personal Products',
            navigationGroup: 'Product Recommendations',
        },
    },
    {
        path: '/popular-categories',
        name: 'popular-categories',
        component: () => import(/* webpackChunkName: "PopularProducts" */ '../views/PopularCategories.vue'),
        meta: {
            title: 'Popular Categories',
            navigationGroup: 'Category Recommendations',
        },
    },
    {
        path: '/search-term-based',
        name: 'search-term-based',
        component: () => import(/* webpackChunkName: "SearchTermBased" */ '../views/SearchTermBased.vue'),
        meta: {
            title: 'Search Term Based',
            navigationGroup: 'Product Recommendations',
        },
    },
    {
        path: '/popular-search-terms',
        name: 'popular-search-terms',
        component: () => import(/* webpackChunkName: "PopularSearchTerms" */ '../views/PopularSearchTerms.vue'),
        meta: {
            title: 'Popular Search Terms',
            navigationGroup: 'Search',
        },
    },
    {
        path: '/',
        name: 'settings',
        component: SettingsView,
        meta: {
            title: 'Settings',
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
