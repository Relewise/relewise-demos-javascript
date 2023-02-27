<template>
    <div class="search">

        <div class="mb-5">
            <input type="text" v-model="searchTerm" @keydown="debouncedSearch" placeholder="Search for products">
        </div>

        <div v-if="predictions && predictions.predictions && predictions.predictions.length > 0" class="mb-5">
            <h4 class="text-md mb-1">Predictions</h4>

            <a v-for="(prediction, index) in predictions.predictions" :key="prediction.term ?? ''" @click.prevent="searchFor(prediction.term ?? '')" class="mb-1 block cursor-pointer" :class="{'font-semibold': index == selectedIndex}"> 
                {{ prediction.term }}
            </a>
        </div>

        <div v-if="result && result?.redirects && result.redirects.length > 0" class="mb-5">
        
            <h2 class="text-xl font-semibold mb-2">Showing redirect(s) for '{{usedSearchTerm}}'</h2>

            <div v-for="redirect in result.redirects" :key="redirect.id" class="mb-1 pb-1 flex border-b border-solid border-gray-300">
                {{ redirect.destination }}
            </div>
        
        </div>
        <div v-if="result && result?.results && result.results.length > 0">
            <h2 class="text-xl font-semibold mb-2">Showing results for '{{usedSearchTerm}}' ({{result.results.length}} of {{result.hits}})</h2>
            <Products :products="result?.results"></Products>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ProductSearchBuilder, ProductSearchResponse, SearchCollectionBuilder, SearchTermPredictionBuilder, SearchTermPredictionResponse, SearchTermPredictionResult } from '@relewise/client';
import { ref, Ref } from 'vue';
import Products from '@/components/Products.vue';
import contextStore from '@/stores/context.store';
import { useListNavigator } from '@/helpers/useListNavigator';
import { useDebounceFn } from '@vueuse/core';

const result = ref<ProductSearchResponse | null>(null);
const predictions: Ref<SearchTermPredictionResponse | null> = ref<SearchTermPredictionResponse | null>(null);
const searchTerm: Ref<string> = ref<string>('');
const usedSearchTerm: Ref<string> = ref<string>('');

const searcher = contextStore.getSearcher();

const predictionsList = ref(predictions.value?.predictions ?? []);

const { index: selectedIndex, reset } = useListNavigator(predictionsList, (item: SearchTermPredictionResult) => { searchFor(item.term ?? '');});

const debouncedSearch = useDebounceFn(() => {
    if (usedSearchTerm.value !== searchTerm.value) {
        search();
    }
}, 200);

async function search() {

    usedSearchTerm.value = searchTerm.value;

    const request = new SearchCollectionBuilder()
        .addRequest(new ProductSearchBuilder(contextStore.defaultSettings)
            .setSelectedProductProperties(contextStore.selectedProductProperties)
            .setSelectedVariantProperties({allData: true, displayName: true})
            .setTerm(searchTerm.value)
            .pagination(p => p.setPageSize(30))
            .build())
        .addRequest(new SearchTermPredictionBuilder(contextStore.defaultSettings)
            .addEntityType('Product')
            .setTerm(searchTerm.value)
            .take(5)
            .build())
        .build();

    const response = await searcher.batch(request);
    contextStore.assertApiCall(response);

    reset();
    if (response && response.responses) {
        result.value = response.responses[0];
        predictions.value = response.responses[1];
        predictionsList.value = response.responses[1]?.predictions ?? [];
    }
}

function searchFor(term: string) {
    searchTerm.value = term;
    search();
}
</script>
