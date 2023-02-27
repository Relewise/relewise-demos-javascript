<template>
    <div class="search">
        <h1 class="text-2xl font-semibold mb-5">Search Term Based</h1>
        <div class="mb-5">
            <input type="text" v-model="searchTerm" @keydown.enter="search" placeholder="Search Term">
        </div>

        <div v-if="result">
            <Products :products="result?.recommendations ?? []"></Products>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Products from '@/components/Products.vue';
import { SearchTermBasedProductRecommendationBuilder, ProductRecommendationResponse } from '@relewise/client';
import { ref, Ref } from 'vue';
import contextStore from '@/stores/context.store';

const result: Ref<ProductRecommendationResponse | undefined> = ref<ProductRecommendationResponse | undefined>({} as ProductRecommendationResponse);
const searchTerm: Ref<string> = ref<string>('');
const usedSearchTerm: Ref<string> = ref<string>('');

const recommender = contextStore.getRecommender();

async function search() {

    usedSearchTerm.value = searchTerm.value;

    const request = new SearchTermBasedProductRecommendationBuilder(contextStore.defaultSettings)
        .setSelectedProductProperties(contextStore.selectedProductProperties)
        .setTerm(searchTerm.value)
        .setNumberOfRecommendations(30)
        .build();

    const response: ProductRecommendationResponse|undefined = await recommender.recommendSearchTermBasedProducts(request);
    contextStore.assertApiCall(response);

    result.value = response;
}
</script>
