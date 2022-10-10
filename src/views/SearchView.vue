<template>
    <div class="search">

        <div class="mb-5">
            <input type="text" v-model="searchTerm" @keydown.enter="search" placeholder="Type in a search term and press 'Enter' to perform a search">
        </div>

        <div v-if="result?.results">
            <h2 class="text-xl font-semibold mb-2">Showing results for '{{usedSearchTerm}}' ({{result.results.length}} of {{result.hits}})</h2>
            <Products :products="result?.results"></Products>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ProductSearchBuilder, ProductSearchResponse } from '@relewise/client';
import { ref, Ref } from 'vue';
import Products from '@/components/Products.vue';
import contextStore from '@/stores/context.store';

const result: Ref<ProductSearchResponse | undefined> = ref<ProductSearchResponse | undefined>({} as ProductSearchResponse);
const searchTerm: Ref<string> = ref<string>('');
const usedSearchTerm: Ref<string> = ref<string>('');

const searcher = contextStore.getSearcher();

async function search() {
    usedSearchTerm.value = searchTerm.value;

    const response = await searcher.searchProducts(new ProductSearchBuilder(contextStore.defaultSettings)
        .setSelectedProductProperties(contextStore.selectedProductProperties)
        .setTerm(searchTerm.value)
        .pagination(p => p.setPageSize(30))
        .build());

    result.value = response;
}
</script>
