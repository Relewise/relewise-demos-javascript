<template>
    <div class="search">

        <div class="mb-5">
            <select v-model="category" v-if="categories" @change="search">
                <option :value="null" disabled>Choose a category</option>
                <option v-for="category in categories.available" :value="category" :key="category.value?.id ?? ''">{{ category.value?.displayName }}</option>
            </select>
        </div>

        <div v-if="category && result && result?.results && result.results.length > 0">
            <h2 class="text-xl font-semibold mb-2">Showing results in '{{ category.value?.displayName }}' ({{result.results.length}} of {{result.hits}})</h2>
            <Products :products="result?.results"></Products>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { CategoryFacetResult, CategoryNameAndIdResultAvailableFacetValue, ProductSearchBuilder, ProductSearchResponse } from '@relewise/client';
import { ref, Ref } from 'vue';
import Products from '@/components/Products.vue';
import contextStore from '@/stores/context.store';

const result = ref<ProductSearchResponse | null>(null);
const categories: Ref<CategoryFacetResult|null> = ref<CategoryFacetResult|null>(null);
const category: Ref<CategoryNameAndIdResultAvailableFacetValue|null> = ref<CategoryNameAndIdResultAvailableFacetValue|null>(null);

const searcher = contextStore.getSearcher();

init();

async function search() {

    const categoryId = category.value?.value?.id;
    if (!categoryId) return;

    const request = new ProductSearchBuilder(contextStore.defaultSettings)
        .setSelectedProductProperties(contextStore.selectedProductProperties)
        .setSelectedVariantProperties({allData: true, displayName: true})
        .pagination(p => p.setPageSize(30))
        .filters(f => f.addProductCategoryIdFilter('ImmediateParent', [categoryId]))
        .build();

    const response = await searcher.searchProducts(request);
    contextStore.assertApiCall(response);

    if (response) {
        result.value = response;   
    }
}

async function init() {
    const request = new ProductSearchBuilder(contextStore.defaultSettings)
        .setSelectedProductProperties(contextStore.selectedProductProperties)
        .setSelectedVariantProperties({allData: true, displayName: true})
        .facets(f => f.addCategoryFacet('ImmediateParent'))
        .pagination(p => p.setPageSize(30))
        .build();

    const response = await searcher.searchProducts(request);
    contextStore.assertApiCall(response);

    if (response?.facets?.items && response?.facets?.items[0]) {
        categories.value =response?.facets?.items![0] as CategoryFacetResult;
    }
}
</script>
