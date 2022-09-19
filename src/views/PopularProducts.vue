<template>
    <div class="search">
        <h1 class="text-2xl font-semibold mb-5">Popular products</h1>
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
    const dataKeys = contextStore.context.value.imageUrlDataKey 
        ? [ contextStore.context.value.imageUrlDataKey ] 
        : [];

    const request = new PopularProductsBuilder(contextStore.defaultSettings)
        .setProductProperties({ displayName: true, dataKeys })
        .sinceMinutesAgo(1440)
        .build();

    const response: ProductRecommendationResponse|undefined = await recommender.recommendPopularProducts(request);

    result.value = response;
}

</script>
