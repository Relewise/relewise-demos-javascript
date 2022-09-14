<template>
    <div class="home">

        <h1 class="text-2xl font-semibold mb-5">Popular Categories</h1>
        
        <div v-for="category in categories?.recommendations" :key="category.id" style="margin-bottom: 8px;">
            {{category.categoryId}}
        </div>

    </div>
</template>

<script lang="ts" setup>
import contextStore from '@/stores/context.store';
import { ProductCategoriesRecommendationResponse, PopularProductCategoriesRecommendationBuilder } from '@relewise/client';
import { Ref, ref } from 'vue';


const recommender = contextStore.getRecommender();

const categories: Ref<ProductCategoriesRecommendationResponse | undefined> = ref<ProductCategoriesRecommendationResponse | undefined>({});

async function setup() {
    categories.value = await recommender.recommendPopularProductCategories(new PopularProductCategoriesRecommendationBuilder(contextStore.defaultSettings)
        .setNumberOfRecommendations(10)
        .sinceMinutesAgo(1440)
        .build());
}

setup();

</script>
