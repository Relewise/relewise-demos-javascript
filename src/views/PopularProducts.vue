<template>
    <div class="search">
        <h1 class="mb-5">Popular products the last 7 days</h1>
        <div v-if="result">
            <Products :products="result?.recommendations ?? []"></Products>
        </div>
    </div>
</template>

<script lang="ts" setup>import { ref, Ref } from 'vue';
import Products from '@/components/Products.vue';
import { PopularProductsBuilder, ProductRecommendationResponse } from '@relewise/client';
import contextStore from '@/stores/context.store';

const result: Ref<ProductRecommendationResponse | undefined> = ref<ProductRecommendationResponse | undefined>({} as ProductRecommendationResponse);
const recommender = contextStore.getRecommender();

recommend();

async function recommend() {
    const request = new PopularProductsBuilder(contextStore.defaultSettings)
        .setSelectedProductProperties(contextStore.selectedProductProperties)
        .sinceMinutesAgo(7 * 24 * 60) // One Week
        .setNumberOfRecommendations(30)
        .build();

    const response: ProductRecommendationResponse|undefined = await recommender.recommendPopularProducts(request);
    contextStore.assertApiCall(response);

    result.value = response;
}
</script>
